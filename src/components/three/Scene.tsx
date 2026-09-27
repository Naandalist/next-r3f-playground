"use client";

/**
 * Scenes for the playground:
 * - StarterScene / Scene — hello cube (home)
 * - ProductScene — lights + Environment + ContactShadows + product (viewer)
 */
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { ProductModel } from "./ProductModel";

type ProductSceneProps = {
  /** Bump this to reset the camera to the default framing */
  resetToken?: number;
};

const DEFAULT_POSITION: [number, number, number] = [2.8, 1.8, 3.2];

function CameraReset({ resetToken = 0 }: { resetToken?: number }) {
  const { camera, controls } = useThree();

  useEffect(() => {
    camera.position.set(...DEFAULT_POSITION);
    camera.lookAt(0, 0.3, 0);
    camera.updateProjectionMatrix();
    const orbit = controls as unknown as {
      target?: { set: (x: number, y: number, z: number) => void };
      update?: () => void;
    } | null;
    orbit?.target?.set(0, 0.3, 0);
    orbit?.update?.();
  }, [camera, controls, resetToken]);

  return null;
}

/** Product stage used by /viewer */
export function ProductScene({ resetToken = 0 }: ProductSceneProps) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <Environment preset="city" />

      <ProductModel scale={1.6} />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.55}
        scale={8}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={1.5}
        maxDistance={14}
        target={[0, 0.3, 0]}
      />

      <CameraReset resetToken={resetToken} />
    </>
  );
}

/** @deprecated Prefer ProductScene on /viewer; kept name `Scene` for early commits */
export function Scene(props: ProductSceneProps) {
  return <ProductScene {...props} />;
}

/** Home-page hello-cube scene */
export function StarterScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} castShadow />
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
