import{addSphere,addCylinderBetween,addEllipticalLoft}from "../core/geometry.js";import{createResult,diagnostic}from "../core/diagnostics.js";

export function createBody(spec={},palette,T){
  if(!T?.Group)throw new TypeError("createBody requires the host THREE instance.");
  const g=new T.Group();g.name="CharacterBody";
  const p=spec.proportions??{},h=Math.max(1,Math.min(2.6,Number(p.height)||1.7)),s=Math.max(.28,Math.min(.7,Number(p.shoulderWidth)||.42)),hip=Math.max(.25,Math.min(.65,Number(p.hipWidth)||.36)),u=h/1.7;

  // A continuous torso silhouette replaces the two intersecting torso spheres.
  // Radii are deliberately elliptical so the body reads with a front/back volume.
  addEllipticalLoft(T,g,palette.clothes,[
    [.64*u,hip*.72,.145*u],
    [.73*u,hip*.91,.17*u],
    [.88*u,hip*.78,.155*u],
    [1.00*u,s*.66,.17*u],
    [1.12*u,s*.82,.195*u],
    [1.23*u,s*.91,.18*u],
    [1.30*u,s*.66,.135*u]
  ],32);

  // Neck and shoulder transition.
  addCylinderBetween(T,g,palette.skin,[0,1.27*u,0],[0,1.43*u,0],.085*u,.09*u,20);
  addSphere(T,g,palette.clothes,[0,1.22*u,0],[s*.91,.115*u,.18*u],24);

  // Arms use upper-arm, elbow and forearm segments with separate hand volumes.
  const shoulderX=s*.78;
  for(const side of[-1,1]){
    const shoulder=[side*shoulderX,1.20*u,0];
    const elbow=[side*(s*1.08),.96*u,.015*u];
    const wrist=[side*(s*1.12),.73*u,.025*u];
    addSphere(T,g,palette.clothes,shoulder,[.125*u,.135*u,.13*u],20);
    addCylinderBetween(T,g,palette.skin,shoulder,elbow,.092*u,.078*u,16);
    addSphere(T,g,palette.skin,elbow,[.078*u,.078*u,.078*u],16);
    addCylinderBetween(T,g,palette.skin,elbow,wrist,.078*u,.057*u,16);
    addSphere(T,g,palette.skin,wrist,[.058*u,.065*u,.06*u],16);
    addSphere(T,g,palette.skin,[wrist[0],.665*u,.055*u],[.065*u,.09*u,.045*u],18);
  }

  // Legs are split at the knees to create a readable joint and tapered silhouette.
  for(const side of[-1,1]){
    const x=side*hip*.43;
    const hipPoint=[x,.69*u,0],knee=[x*1.04,.385*u,.005*u],ankle=[x*1.04,.105*u,.015*u];
    addSphere(T,g,palette.clothes,hipPoint,[.125*u,.145*u,.135*u],20);
    addCylinderBetween(T,g,palette.skin,hipPoint,knee,.112*u,.087*u,18);
    addSphere(T,g,palette.skin,knee,[.088*u,.09*u,.09*u],18);
    addCylinderBetween(T,g,palette.skin,knee,ankle,.083*u,.061*u,18);
    addSphere(T,g,palette.skin,ankle,[.064*u,.075*u,.067*u],16);
    addSphere(T,g,palette.shoes,[x*1.04,.055*u,.075*u],[.105*u,.055*u,.17*u],20);
  }

  const issues=[];
  if(h<1.2||h>2.4)issues.push(diagnostic("warning","BODY_HEIGHT_UNUSUAL","Requested height is outside the usual stylized character range.",{height:h}));
  return createResult("body",g,issues,{height:h,shoulderWidth:s,hipWidth:hip,construction:"elliptical-torso-with-articulated-limb-segments"});
}
