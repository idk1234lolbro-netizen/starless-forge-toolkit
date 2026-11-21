export function addSphere(T,parent,mat,pos,scale,segments=24){const m=new T.Mesh(new T.SphereGeometry(1,segments,Math.max(12,Math.floor(segments*.7))),mat);m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
export function addCylinderBetween(T,parent,mat,start,end,rt,rb=rt,radial=12){const a=new T.Vector3(...start),b=new T.Vector3(...end),d=new T.Vector3().subVectors(b,a),len=d.length(),m=new T.Mesh(new T.CylinderGeometry(rt,rb,len,radial),mat);m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
export function addTube(T,parent,points,mat,radius=.035,segments=24){const c=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),m=new T.Mesh(new T.TubeGeometry(c,segments,radius,8,false),mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}

/**
 * Builds a smooth, capped elliptical loft from bottom-to-top [y, radiusX, radiusZ] sections.
 * The resulting indexed mesh has shared vertices and computed smooth normals.
 */
export function addEllipticalLoft(T,parent,mat,sections,radialSegments=24){
  if(!T?.BufferGeometry||!T?.Float32BufferAttribute)throw new TypeError("addEllipticalLoft requires the host THREE geometry classes.");
  if(!Array.isArray(sections)||sections.length<2)throw new TypeError("addEllipticalLoft requires at least two sections.");
  const radial=Math.max(8,Math.floor(radialSegments)),positions=[],indices=[];
  for(const section of sections){
    const [y,rx,rz]=section;
    if(![y,rx,rz].every(Number.isFinite)||rx<=0||rz<=0)throw new TypeError("Loft sections must contain finite y and positive radii.");
    for(let j=0;j<radial;j++){
      const a=(j/radial)*Math.PI*2;
      positions.push(Math.cos(a)*rx,y,Math.sin(a)*rz);
    }
  }
  for(let i=0;i<sections.length-1;i++)for(let j=0;j<radial;j++){
    const a=i*radial+j,b=i*radial+(j+1)%radial,c=(i+1)*radial+j,d=(i+1)*radial+(j+1)%radial;
    indices.push(a,c,b,b,c,d);
  }
  const bottomCenter=positions.length/3;positions.push(0,sections[0][0],0);
  const topCenter=positions.length/3;positions.push(0,sections[sections.length-1][0],0);
  for(let j=0;j<radial;j++){
    const next=(j+1)%radial;
    indices.push(bottomCenter,next,j);
    const last=(sections.length-1)*radial;
    indices.push(topCenter,last+j,last+next);
  }
  const geometry=new T.BufferGeometry();
  geometry.setAttribute("position",new T.Float32BufferAttribute(positions,3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh=new T.Mesh(geometry,mat);
  mesh.name="EllipticalLoft";
  mesh.userData.geometryType="elliptical-loft";
  mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);
  return mesh;
}
export function setObjectName(o,n){o.name=n;return o}

/**
 * Creates a smooth lock with a thick root and a tapered tip.
 * Points are in host-scene coordinates; no Three.js copy is bundled.
 */
export function addTaperedTube(T,parent,points,mat,radius=.06,segments=20,radialSegments=10,tipRadius=.003){
  if(!T?.BufferGeometry||!T?.Float32BufferAttribute||!T?.CatmullRomCurve3)throw new TypeError("addTaperedTube requires the host THREE geometry classes.");
  if(!Array.isArray(points)||points.length<2)throw new TypeError("A tapered tube requires at least two path points.");
  if(!Number.isFinite(radius)||radius<=0)throw new TypeError("Tapered tube radius must be positive.");
  const steps=Math.max(6,Math.floor(segments)),radial=Math.max(6,Math.floor(radialSegments));
  const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));
  const frames=curve.computeFrenetFrames(steps,false),positions=[],indices=[];
  for(let i=0;i<=steps;i++){
    const t=i/steps,center=curve.getPointAt(t);
    const r=Math.max(.0005,radius*Math.pow(1-t,.78)+tipRadius*t);
    for(let j=0;j<radial;j++){
      const angle=j/radial*Math.PI*2;
      const normal=frames.normals[i].clone().multiplyScalar(Math.cos(angle));
      const binormal=frames.binormals[i].clone().multiplyScalar(Math.sin(angle));
      const vertex=center.clone().add(normal.multiplyScalar(r)).add(binormal.multiplyScalar(r));
      positions.push(vertex.x,vertex.y,vertex.z);
    }
  }
  for(let i=0;i<steps;i++)for(let j=0;j<radial;j++){
    const a=i*radial+j,b=(i+1)*radial+j,c=(i+1)*radial+(j+1)%radial,d=i*radial+(j+1)%radial;
    indices.push(a,b,d,b,c,d);
  }
  const startCenter=positions.length/3;positions.push(...points[0]);
  const endCenter=positions.length/3;positions.push(...points[points.length-1]);
  const endOffset=steps*radial;
  for(let j=0;j<radial;j++){
    const next=(j+1)%radial;
    indices.push(startCenter,next,j);
    indices.push(endCenter,endOffset+j,endOffset+next);
  }
  const geometry=new T.BufferGeometry();
  geometry.setAttribute("position",new T.Float32BufferAttribute(positions,3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh=new T.Mesh(geometry,mat);
  mesh.name="TaperedHairLock";
  mesh.userData.geometryType="tapered-hair-lock";
  mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);
  return mesh;
}
