import{addSphere,addTube}from "../core/geometry.js";
import{createResult,diagnostic}from "../core/diagnostics.js";

const EXPRESSIONS=new Set(["neutral","happy","serious","surprised"]);

function curveEye(T,g,side,cx,cy,z,mat,kind){
  const span=.098;
  const points=[];
  for(let i=0;i<=8;i++){
    const t=i/8,x=cx+(t-.5)*span*2;
    const arch=Math.sin(t*Math.PI);
    const y=kind==="closed"?cy-.012+arch*.042:cy-.025+arch*.047;
    points.push([x,y,z+.006]);
  }
  addTube(T,g,points,mat,kind==="closed"?.012:.014,16);
}

export function createFace(spec={},palette,T){
  if(!T?.Group)throw new TypeError("createFace requires the host THREE instance.");
  const g=new T.Group();g.name="CharacterFace";
  const f=spec.face??{};
  const w=Math.max(.34,Math.min(.62,Number(f.width)||.43));
  const h=Math.max(.42,Math.min(.72,Number(f.height)||.53));
  const expression=EXPRESSIONS.has(f.expression)?f.expression:"neutral";
  const eyeScale=Math.max(.78,Math.min(1.28,Number(f.eyeSize)||1));
  const spacing=Math.max(.82,Math.min(1.2,Number(f.eyeSpacing)||1));
  const ex=w*.43*spacing,ey=1.57;
  addSphere(T,g,palette.skin,[0,1.52,0],[w,h,.34],40);

  // A soft nose bridge and small tip help the face read from a three-quarter view.
  addSphere(T,g,palette.skinLight,[0,1.49,.329],[.028,.075,.025],16);
  addSphere(T,g,palette.skinShadow,[0,1.445,.345],[.027,.022,.018],12);

  for(const side of[-1,1]){
    const cx=side*ex;
    addSphere(T,g,palette.skin,[side*(w+.012),1.52,-.005],[.073,.112,.065],18);
    addSphere(T,g,palette.skinShadow,[side*(w+.018),1.52,.051],[.027,.061,.012],12);

    if(expression==="happy"){
      curveEye(T,g,side,cx,ey,.326,palette.eyeDark,"closed");
    }else{
      const eyeH=(expression==="surprised"?.105:.078)*eyeScale;
      const eyeW=.103*eyeScale;
      addSphere(T,g,palette.eyeWhite,[cx,ey,.315],[eyeW,eyeH,.044],24);
      addSphere(T,g,palette.eyes,[cx,ey-.002,.352],[.057*eyeScale,.068*eyeScale,.027],22);
      addSphere(T,g,palette.eyeDark,[cx,ey-.003,.374],[.029*eyeScale,.047*eyeScale,.018],18);
      addSphere(T,g,palette.eyeHighlight,[cx-.018*side,ey+.027,.389],[.017,.021,.009],12);
      addSphere(T,g,palette.eyeHighlight,[cx+.018*side,ey-.025,.389],[.008,.01,.006],10);
      curveEye(T,g,side,cx,ey,.349,palette.eyeDark,"open");
    }

    // Brows change angle with the requested expression.
    const innerX=cx-side*.082,outerX=cx+side*.082;
    let innerY=1.694,outerY=1.694;
    if(expression==="serious"){innerY=1.676;outerY=1.715}
    if(expression==="surprised"){innerY=1.735;outerY=1.735}
    const browPoints=[[outerX,outerY,.322],[cx,((innerY+outerY)/2)+.009,.333],[innerX,innerY,.322]];
    addTube(T,g,browPoints,palette.brow,.014,16);
  }

  if(expression==="surprised"){
    addSphere(T,g,palette.mouth,[0,1.335,.347],[.031,.044,.018],16);
  }else if(expression==="happy"){
    addTube(T,g,[[-.075,1.355,.333],[-.04,1.326,.352],[0,1.318,.356],[.04,1.326,.352],[.075,1.355,.333]],palette.mouth,.014,18);
  }else if(expression==="serious"){
    addTube(T,g,[[-.06,1.345,.34],[0,1.342,.35],[.06,1.345,.34]],palette.mouth,.009,12);
  }else{
    addTube(T,g,[[-.055,1.35,.34],[0,1.337,.352],[.055,1.35,.34]],palette.mouth,.011,12);
  }

  const ds=[];
  if(f.expression&&!EXPRESSIONS.has(f.expression))ds.push(diagnostic("warning","FACE_EXPRESSION_UNSUPPORTED","Expression is not implemented yet; a neutral face was generated.",{expression:f.expression}));
  return createResult("face",g,ds,{width:w,height:h,eyeSize:eyeScale,eyeSpacing:spacing,expression,style:"anime-inspired"});
}
