/**
 * Optional dispose helper notes for learning.
 *
 * Three.js objects (geometries, materials, textures) hold GPU memory.
 * R3F + drei usually dispose on unmount, but when you manually clone
 * scenes or create resources outside hooks, call dispose explicitly.
 *
 * Example sketch (not wired into the viewer yet):
 *
 *   import type { Object3D } from "three";
 *
 *   export function disposeObject(root: Object3D) {
 *     root.traverse((obj) => {
 *       const mesh = obj as Object3D & {
 *         geometry?: { dispose: () => void };
 *         material?: { dispose: () => void } | { dispose: () => void }[];
 *       };
 *       mesh.geometry?.dispose();
 *       if (Array.isArray(mesh.material)) {
 *         mesh.material.forEach((m) => m.dispose());
 *       } else {
 *         mesh.material?.dispose();
 *       }
 *     });
 *   }
 *
 * Prefer letting useGLTF / <primitive> lifecycle handle cleanup first.
 */

export {};
