import * as THREE from "three";
import { diagnostic } from "./diagnostics.js";

export function validateObject3D(root) {
  const diagnostics = [];
  let meshCount = 0;
  let vertexCount = 0;
  let triangleCount = 0;
  root.updateMatrixWorld(true);

  root.traverse(object => {
    if (!object.isMesh) return;
    meshCount++;
    const geometry = object.geometry;
    const position = geometry?.getAttribute?.("position");
    if (!position || position.count === 0) {
      diagnostics.push(diagnostic("error", "MESH_MISSING_POSITION", "A mesh has no position vertices.", { object: object.name }));
      return;
    }
    vertexCount += position.count;
    triangleCount += geometry.index ? geometry.index.count / 3 : position.count / 3;
    for (let i = 0; i < position.count; i++) {
      if (![position.getX(i), position.getY(i), position.getZ(i)].every(Number.isFinite)) {
        diagnostics.push(diagnostic("error", "MESH_NON_FINITE_VERTEX", "A mesh contains a non-finite vertex.", { object: object.name, vertex: i }));
        break;
      }
    }
    if (!geometry.getAttribute("normal")) {
      diagnostics.push(diagnostic("warning", "MESH_MISSING_NORMALS", "A mesh has no normal attribute.", { object: object.name }));
    }
  });

  const bounds = new THREE.Box3().setFromObject(root);
  const size = bounds.isEmpty() ? new THREE.Vector3() : bounds.getSize(new THREE.Vector3());
  if (meshCount === 0) diagnostics.push(diagnostic("error", "CHARACTER_EMPTY", "No meshes were found in the generated character."));
  if (size.y <= 0) diagnostics.push(diagnostic("error", "CHARACTER_INVALID_BOUNDS", "Generated character has zero or invalid height."));
  return {
    ok: !diagnostics.some(d => d.severity === "error"),
    diagnostics,
    metrics: { meshCount, vertexCount, triangleCount, bounds: { width: size.x, height: size.y, depth: size.z } }
  };
}
