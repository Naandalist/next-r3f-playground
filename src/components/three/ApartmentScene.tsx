"use client";

/**
 * ApartmentScene — lights + Environment + OrbitControls around the GLB.
 * Framing / camera clamps / reset land in a follow-up polish commit.
 */
import { Environment, OrbitControls } from "@react-three/drei";
import { ApartmentModel } from "./ApartmentModel";

export function ApartmentScene() {
  return (
    <>
      <color attach="background" args={["#0b1220"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 12, 6]} intensity={1.1} />
      <directionalLight position={[-4, 6, -8]} intensity={0.35} />

      {/* Interior-friendly HDRI: soft window light without harsh sun */}
      <Environment preset="apartment" />

      <ApartmentModel />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={40}
      />
    </>
  );
}
