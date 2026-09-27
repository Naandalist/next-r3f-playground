"use client";

/**
 * Classic "hello cube" framed as the first interactive scene:
 * mesh + material + lights + OrbitControls.
 */
import { OrbitControls } from "@react-three/drei";

export function Scene() {
  return (
    <>
      {/* Soft key + fill so the mesh reads clearly */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} castShadow />

      {/* Starter mesh — rotate / zoom with the mouse via OrbitControls */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.2} roughness={0.35} />
      </mesh>

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={2}
        maxDistance={12}
      />
    </>
  );
}

/** Alias kept for the learning path when /viewer adds a product Scene */
export function StarterScene() {
  return <Scene />;
}
