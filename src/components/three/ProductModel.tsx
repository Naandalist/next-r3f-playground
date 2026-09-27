"use client";

/**
 * ProductModel — loads a GLB via drei's useGLTF (Suspense-friendly).
 *
 * Swap `MODEL_URL` for your brand asset later. If the GLB is missing,
 * render <PlaceholderProduct /> instead (same component file).
 */
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { Group } from "three";

/** Local CC0 sample (Khronos Box). Replace with your product GLB. */
export const MODEL_URL = "/models/demo.glb";

type ProductModelProps = {
  /** Uniform scale applied to the loaded root */
  scale?: number;
};

export function ProductModel({ scale = 1.5 }: ProductModelProps) {
  const { scene } = useGLTF(MODEL_URL);

  // Clone so multiple instances / Strict Mode remounts don't share one scene
  const cloned = useMemo(() => scene.clone(true) as Group, [scene]);

  return (
    <primitive object={cloned} scale={scale} position={[0, 0.1, 0]} />
  );
}

useGLTF.preload(MODEL_URL);

/**
 * Procedural stand-in for offline / no-GLB demos.
 * Render <PlaceholderProduct /> instead of ProductModel if you remove the GLB.
 */
export function PlaceholderProduct() {
  return (
    <group position={[0, 0.2, 0]}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.5]} />
        <meshStandardMaterial color="#e11d48" metalness={0.15} roughness={0.4} />
      </mesh>
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0.6, 0.35]}>
        <torusGeometry args={[0.35, 0.08, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.4} roughness={0.25} />
      </mesh>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
    </group>
  );
}
