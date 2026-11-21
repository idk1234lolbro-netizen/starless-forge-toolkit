import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import {generateCharacter} from "../src/index.js";
import {createBody} from "../src/modules/body.js";

test("generates valid geometry with the supplied host THREE instance",()=>{
  const r=generateCharacter({hair:{style:"long",length:1.1,strands:12},clothing:{kind:"uniform"},accessories:[{type:"glasses"}]},{THREE});
  assert.equal(r.ok,true);assert.ok(r.metrics.meshCount>0);assert.ok(r.metrics.vertexCount>0);assert.ok(r.metrics.bounds.height>1);
  assert.equal(r.diagnostics.some(d=>d.severity==="error"),false);r.dispose();
});
test("reports unsupported options without crashing",()=>{
  const r=generateCharacter({hair:{style:"dragon-wings"},clothing:{kind:"spacesuit"},accessories:[{type:"unknown-item"}]},{THREE});
  assert.equal(r.ok,true);assert.ok(r.diagnostics.some(d=>d.code==="HAIR_STYLE_APPROXIMATED"));
  assert.ok(r.diagnostics.some(d=>d.code==="CLOTHING_KIND_APPROXIMATED"));assert.ok(r.diagnostics.some(d=>d.code==="ACCESSORY_UNSUPPORTED"));r.dispose();
});
test("requires the host THREE instance",()=>assert.throws(()=>generateCharacter({}),/options\.THREE/));
test("body uses a smooth torso loft and articulated limb segments",()=>{
  const palette={skin:new THREE.MeshStandardMaterial(),clothes:new THREE.MeshStandardMaterial(),shoes:new THREE.MeshStandardMaterial()};
  const result=createBody({proportions:{height:1.8,shoulderWidth:.46,hipWidth:.39}},palette,THREE);
  assert.equal(result.ok,true);
  assert.equal(result.metrics.construction,"elliptical-torso-with-articulated-limb-segments");
  let lofts=0,meshes=0;result.object.traverse(o=>{if(o.isMesh){meshes++;if(o.geometry.index&&o.geometry.getAttribute("normal"))lofts++;}});
  assert.ok(meshes>=25);assert.equal(lofts,1);
  result.object.traverse(o=>{if(o.isMesh){const p=o.geometry.getAttribute("position");for(let i=0;i<p.count;i++)assert.ok(Number.isFinite(p.getX(i)+p.getY(i)+p.getZ(i)));}});
});
