"use client";

/**
 * ApartmentModel — loads the practice apartment block GLB (Draco).
 *
 * Second arg `true` on useGLTF enables drei's Draco decoder path.
 * Without it, KHR_draco_mesh_compression assets fail to parse.
 */
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { Group } from "three";

export const APARTMENT_MODEL_URL = "/models/apartment.glb";

type ApartmentModelProps = {
  /** Uniform scale (1 = authoring units from the GLB) */
  scale?: number;
};

export function ApartmentModel({ scale = 1 }: ApartmentModelProps) {
  // Draco: apartment.glb ships with KHR_draco_mesh_compression
  const { scene } = useGLTF(APARTMENT_MODEL_URL, true);

  const cloned = useMemo(() => scene.clone(true) as Group, [scene]);

  return <primitive object={cloned} scale={scale} />;
}

useGLTF.preload(APARTMENT_MODEL_URL, true);
