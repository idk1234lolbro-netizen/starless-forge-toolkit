export function makeMaterial(T,color="#b8a0a0",options={}){return new T.MeshStandardMaterial({color,roughness:options.roughness??.78,metalness:options.metalness??0,...(options.transparent?{transparent:true,opacity:options.opacity??1}:{})})}
export function makePalette(spec={},T){
  if(!T?.MeshStandardMaterial)throw new TypeError("A compatible THREE instance is required.");
  const p=spec.palette??{};
  const eyeColor=p.eyes??"#477da8";
  return{
    skin:makeMaterial(T,p.skin??"#f0c6ad"),
    skinLight:makeMaterial(T,p.skinLight??"#f8d8c5"),
    skinShadow:makeMaterial(T,p.skinShadow??"#d99f91"),
    hair:makeMaterial(T,p.hair??"#342b42"),
    hairAccent:makeMaterial(T,p.hairAccent??p.hair??"#342b42"),
    eyes:makeMaterial(T,eyeColor,{roughness:.35}),
    eyeWhite:makeMaterial(T,p.eyeWhite??"#fff8f2",{roughness:.42}),
    eyeDark:makeMaterial(T,"#17151b",{roughness:.35}),
    eyeHighlight:makeMaterial(T,"#ffffff",{roughness:.2}),
    brow:makeMaterial(T,p.brow??p.hair??"#342b42"),
    clothes:makeMaterial(T,p.clothes??"#303342"),
    clothesAccent:makeMaterial(T,p.clothesAccent??"#a9a5bd"),
    shoes:makeMaterial(T,p.shoes??"#25232a"),
    metal:makeMaterial(T,p.metal??"#c6b7a0",{metalness:.72,roughness:.28}),
    mouth:makeMaterial(T,"#985e61")
  };
}
