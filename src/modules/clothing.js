import{addEllipticalLoft,addTaperedTube,addTube,addSphere}from "../core/geometry.js";
import{createResult,diagnostic}from "../core/diagnostics.js";

const SLEEVE_TYPES=new Set(["long","short","sleeveless"]);

export function createClothing(spec={},palette,T){
  if(!T?.Group)throw new TypeError("createClothing requires the host THREE instance.");
  const g=new T.Group();g.name="CharacterClothing";
  const clothing=spec.clothing??{},kind=clothing.kind??"uniform";
  const p=spec.proportions??{},shoulders=Math.max(.28,Math.min(.7,Number(p.shoulderWidth)||.42));
  const hips=Math.max(.25,Math.min(.65,Number(p.hipWidth)||.36));
  const sx=shoulders/.42,hx=hips/.36;
  const requestedSleeves=clothing.sleeves??(kind==="coat"?"long":"short");
  const sleeves=SLEEVE_TYPES.has(requestedSleeves)?requestedSleeves:"short";
  const ds=[];

  // A fitted torso shell follows the body silhouette instead of floating over it as a sphere.
  addEllipticalLoft(T,g,palette.clothes,[
    [.65,hips*.76*1.05,.145*1.08],
    [.73,hips*.91*1.055,.17*1.08],
    [.88,hips*.78*1.06,.155*1.08],
    [1.00,shoulders*.66*1.055,.17*1.08],
    [1.12,shoulders*.82*1.055,.195*1.08],
    [1.23,shoulders*.91*1.05,.18*1.08],
    [1.30,shoulders*.66*1.07,.135*1.1]
  ],28);

  // Sleeves are tapered volumes that sit over the upper arms.
  if(sleeves!=="sleeveless"){
    for(const side of[-1,1]){
      const endY=sleeves==="long"?.73:.96;
      addTaperedTube(T,g,[
        [side*shoulders*.78,1.22,0],
        [side*shoulders*.91,1.13,.005],
        [side*shoulders*1.04,1.02,.018],
        [side*shoulders*1.08,endY,.025]
      ],palette.clothes,sleeves==="long"?.095:.105,18,8,.058);
      if(sleeves==="long"){
        addSphere(T,g,palette.clothesAccent,[side*shoulders*1.08,endY,.025],[.064,.035,.067],14);
      }
    }
  }

  // A shaped neckline and front placket add visible garment construction.
  addTube(T,g,[[-.18*sx,1.255,.177],[0,1.205,.214],[.18*sx,1.255,.177]],palette.clothesAccent,.016,18);
  addTube(T,g,[[0,1.18,.215],[0,1.04,.205],[0,.91,.185]],palette.clothesAccent,.012,16);
  for(const y of[1.10,1.02,.94]){
    addSphere(T,g,palette.metal,[0,y,.219],[.018,.018,.012],10);
  }

  if(["dress","uniform"].includes(kind)){
    // The skirt widens gradually from the waist, creating a readable flared silhouette.
    addEllipticalLoft(T,g,palette.clothes,[
      [.49,.49*hx,.245],
      [.55,.47*hx,.235],
      [.65,.405*hx,.215],
      [.76,.325*hx,.175],
      [.82,.305*hx,.165]
    ],32);
    addTube(T,g,[[-.27*hx,.76,.16],[0,.745,.185],[.27*hx,.76,.16]],palette.clothesAccent,.012,20);
  }else if(kind==="coat"){
    // Longer lower panels give coat-style outfits a coat-tail silhouette.
    addEllipticalLoft(T,g,palette.clothes,[
      [.29,.47*hx,.235],
      [.38,.455*hx,.23],
      [.55,.405*hx,.215],
      [.72,.33*hx,.18],
      [.84,.305*hx,.165]
    ],32);
    for(const side of[-1,1]){
      addTube(T,g,[[side*.17,1.25,.175],[side*.115,1.10,.212],[side*.09,.93,.208],[side*.13,.73,.175]],palette.clothesAccent,.018,22);
    }
  }else if(["pants","casual"].includes(kind)){
    for(const side of[-1,1]){
      addTaperedTube(T,g,[
        [side*.15,.79,.005],
        [side*.15,.59,.012],
        [side*.15,.34,.02],
        [side*.15,.10,.02]
      ],palette.clothes,.135,22,10,.075);
    }
  }else{
    ds.push(diagnostic("warning","CLOTHING_KIND_APPROXIMATED","Unknown clothing kind was approximated with a fitted top.",{kind}));
  }

  if(!SLEEVE_TYPES.has(requestedSleeves))ds.push(diagnostic("warning","CLOTHING_SLEEVE_STYLE_APPROXIMATED","Unknown sleeve style was approximated with short sleeves.",{sleeves:requestedSleeves}));
  return createResult("clothing",g,ds,{kind,sleeves,construction:"fitted-loft-garment-with-layered-panels"});
}
