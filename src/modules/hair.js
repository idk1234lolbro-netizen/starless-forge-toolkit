import{addSphere,addTaperedTube}from "../core/geometry.js";
import{createResult,diagnostic}from "../core/diagnostics.js";

export function createHair(spec={},palette,T){
  if(!T?.Group)throw new TypeError("createHair requires the host THREE instance.");
  const g=new T.Group();g.name="CharacterHair";
  const h=spec.hair??{},style=h.style??"long";
  const requestedLength=Number(h.length)||(style==="short"?.45:style==="medium"?.78:1.05);
  const len=Math.max(.35,Math.min(1.8,requestedLength));
  const strands=Math.max(6,Math.min(32,Math.floor(Number(h.strands)||16)));
  const known=["long","short","medium","twin_tails","ponytail"].includes(style);
  const actualStyle=known?style:"long";
  const sideEnd=actualStyle==="short"?1.48:actualStyle==="medium"?1.23:Math.max(.58,1.78-len*.70);
  const backEnd=actualStyle==="short"?1.55:actualStyle==="medium"?1.30:Math.max(.52,1.82-len*.72);
  const backHeight=Math.max(.24,1.91-backEnd+.13);

  // The cap and rear volume establish the overall hairstyle silhouette.
  addSphere(T,g,palette.hair,[0,1.91,-.015],[.445,.29,.37],36);
  addSphere(T,g,palette.hair,[0,1.88-backHeight*.38,-.18],[.36,backHeight*.62,.20],28);

  // Layered back locks create a readable hair curtain instead of thin wire strands.
  const backCount=Math.min(strands,18);
  for(let i=0;i<backCount;i++){
    const t=backCount===1?.5:i/(backCount-1),x=(t-.5)*.62;
    const z=-.30-Math.sin(t*Math.PI)*.035;
    addTaperedTube(T,g,[
      [x*.54,2.02,-.19],
      [x*.82,1.88,z],
      [x,1.55,z-.015],
      [x*.98,backEnd,z+.025]
    ],i%5===0?palette.hairAccent:palette.hair,.061,22,10,.004);
  }

  // Front framing locks follow the cheeks and shoulders.
  const sideCount=Math.max(3,Math.round(strands/5));
  for(const side of[-1,1]){
    for(let i=0;i<sideCount;i++){
      const t=sideCount===1?.5:i/(sideCount-1);
      const x=side*(.29+t*.09);
      addTaperedTube(T,g,[
        [side*.24,2.08,.02],
        [x,1.94,.16],
        [side*(.35+t*.035),1.67,.18],
        [side*(.37+t*.04),sideEnd,.08]
      ],i%3===0?palette.hairAccent:palette.hair,.067,20,10,.003);
    }
  }

  // Separate tapered fringe pieces make the forehead silhouette less uniform.
  const fringeCount=7;
  for(let i=0;i<fringeCount;i++){
    const t=i/(fringeCount-1),x=(t-.5)*.66;
    addTaperedTube(T,g,[
      [x*.72,2.13,.12],
      [x,2.02,.25],
      [x*.94,1.86,.33],
      [x*.84,1.70+(i%2)*.055,.31]
    ],i%3===0?palette.hairAccent:palette.hair,.058,18,10,.0025);
  }

  // Distinct tied styles add a gathered root and longer trailing locks.
  if(actualStyle==="ponytail"){
    addSphere(T,g,palette.hair,[0,1.96,-.29],[.15,.16,.13],18);
    for(let i=0;i<5;i++){
      const x=(i-2)*.045;
      addTaperedTube(T,g,[
        [x,1.97,-.30],
        [x*1.8,1.75,-.48],
        [x*2.2,1.42,-.68],
        [x*1.6,1.08-i*.035,-.78]
      ],palette.hair,.082,24,10,.003);
    }
  }else if(actualStyle==="twin_tails"){
    for(const side of[-1,1]){
      addSphere(T,g,palette.hair,[side*.33,1.91,-.17],[.13,.12,.13],16);
      for(let i=0;i<4;i++){
        const x=side*(.34+i*.025);
        addTaperedTube(T,g,[
          [side*.28,1.94,-.16],
          [side*.48,1.72,-.27],
          [side*.62,1.39,-.34],
          [side*(.59+i*.018),1.02-i*.045,-.40]
        ],i%2===0?palette.hairAccent:palette.hair,.075,24,10,.0025);
      }
    }
  }

  const ds=[];
  if(!known)ds.push(diagnostic("warning","HAIR_STYLE_APPROXIMATED","Unknown hairstyle was approximated with the default long layered style.",{requestedStyle:style}));
  return createResult("hair",g,ds,{style:actualStyle,length:len,strandGroups:strands,construction:"layered-tapered-locks"});
}
