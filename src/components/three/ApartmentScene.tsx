"use client";

/**
 * ApartmentScene — frames the Draco apartment block for learning.
 *
 * Apartments / buildings often ship with a weird origin (this one is
 * centered mid-volume). We use drei `Center` + its `onCentered` bbox
 * callback, then place the camera at a distance that fits the whole block.
 */
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { ApartmentModel } from "./ApartmentModel";

type ApartmentSceneProps = {
  /** Bump from the DOM overlay to snap the camera back to the framed view */
  resetToken?: number;
};

const FALLBACK_POSITION = new Vector3(14, 8, 14);
const FALLBACK_TARGET = new Vector3(0, 0, 0);

type Framing = {
  position: [number, number, number];
  target: [number, number, number];
  minDistance: number;
  maxDistance: number;
};

function CameraFramer({
  framing,
  resetToken = 0,
}: {
  framing: Framing | null;
  resetToken?: number;
}) {
  const { camera, controls } = useThree();

  useEffect(() => {
    const position = framing
      ? new Vector3(...framing.position)
      : FALLBACK_POSITION;
    const target = framing
      ? new Vector3(...framing.target)
      : FALLBACK_TARGET;

    camera.position.copy(position);
    camera.lookAt(target);
    camera.updateProjectionMatrix();

    const orbit = controls as unknown as {
      target?: { copy: (v: Vector3) => void };
      update?: () => void;
    } | null;
    orbit?.target?.copy(target);
    orbit?.update?.();
  }, [camera, controls, framing, resetToken]);

  return null;
}

export function ApartmentScene({ resetToken = 0 }: ApartmentSceneProps) {
  const { camera } = useThree();
  const [framing, setFraming] = useState<Framing | null>(null);

  return (
    <>
      <color attach="background" args={["#0b1220"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 12, 6]} intensity={1.1} />
      {/* Soft fill from the opposite side — apartments read better with two lights */}
      <directionalLight position={[-4, 6, -8]} intensity={0.35} />

      <Environment preset="apartment" />

      {/*
        Center recenters the mid-volume origin onto world 0.
        onCentered gives width/height/depth after centering — use that
        to compute a framing distance from the active camera FOV.
      */}
      <Center
        onCentered={({ width, height, depth }) => {
          const maxDim = Math.max(width, height, depth);
          const perspective =
            camera instanceof PerspectiveCamera ? camera : null;
          const fovDeg = perspective?.fov ?? 45;
          const fov = (fovDeg * Math.PI) / 180;
          const distance = (maxDim / (2 * Math.tan(fov / 2))) * 1.35;

          setFraming((prev) => {
            const next: Framing = {
              position: [distance * 0.75, distance * 0.35, distance * 0.75],
              target: [0, 0, 0],
              minDistance: maxDim * 0.35,
              maxDistance: maxDim * 4,
            };
            if (
              prev &&
              Math.abs(prev.position[0] - next.position[0]) < 0.01 &&
              Math.abs(prev.minDistance - next.minDistance) < 0.01
            ) {
              return prev;
            }
            return next;
          });
        }}
      >
        <ApartmentModel />
      </Center>

      {/* Skip ContactShadows: the block already includes floor slabs / self-shadowing geometry */}

      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={framing?.minDistance ?? 4}
        maxDistance={framing?.maxDistance ?? 40}
        // Keep the camera above the ground plane so you don't flip under the building
        maxPolarAngle={Math.PI * 0.49}
        target={framing?.target ?? [0, 0, 0]}
      />

      <CameraFramer framing={framing} resetToken={resetToken} />
    </>
  );
}
