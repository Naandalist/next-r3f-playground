"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { CanvasTexture, Object3D, SRGBColorSpace } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  SLOTS,
  itemById,
  type SlotId,
} from "@/lib/workspace/catalog";

type WorkspaceSceneProps = {
  selection: Record<SlotId, string | null>;
  activeSlot: SlotId | null;
  onSelectSlot: (slot: SlotId) => void;
  resetKey: number;
};

const CAMERA = {
  position: [4.4, 3.4, 4.6] as [number, number, number],
  target: [0.1, 0.6, -0.4] as [number, number, number],
};

export function WorkspaceScene(props: WorkspaceSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: CAMERA.position, fov: 38 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#f3efe6"]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 7, 3]} intensity={1.3} castShadow />
      <hemisphereLight args={["#fff6e8", "#cbb89a", 0.4]} />
      <Room />
      <Selection selection={props.selection} />
      {SLOTS.map((slot) => (
        <Hotspot
          key={slot.id}
          position={slot.hotspot}
          active={props.activeSlot === slot.id}
          filled={Boolean(props.selection[slot.id])}
          onClick={() => props.onSelectSlot(slot.id)}
        />
      ))}
      <CameraRig resetKey={props.resetKey} />
    </Canvas>
  );
}

function CameraRig({ resetKey }: { resetKey: number }) {
  const camera = useThree((state) => state.camera);
  const controls = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    camera.position.set(...CAMERA.position);
    controls.current?.target.set(...CAMERA.target);
    controls.current?.update();
  }, [camera, resetKey]);

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={CAMERA.target}
      enablePan={false}
      minDistance={3.2}
      maxDistance={9}
      maxPolarAngle={Math.PI / 2.15}
      minPolarAngle={0.35}
    />
  );
}

function Selection({ selection }: { selection: Record<SlotId, string | null> }) {
  return (
    <group>
      {SLOTS.map((slot) => {
        const item = itemById(selection[slot.id]);
        if (!item) return null;
        return (
          <SlotModel
            key={slot.id}
            src={item.src}
            position={slot.position}
            scale={item.scale}
          />
        );
      })}
    </group>
  );
}

function SlotModel({
  src,
  position,
  scale,
}: {
  src: string;
  position: [number, number, number];
  scale: number;
}) {
  const { scene } = useGLTF(src);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    return () => disposeObject(clone);
  }, [clone]);

  return <primitive object={clone} position={position} scale={scale} />;
}

function Hotspot({
  position,
  active,
  filled,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  filled: boolean;
  onClick: () => void;
}) {
  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[0.07, 18, 18]} />
      <meshStandardMaterial
        color={active ? "#0f766e" : "#14b8a6"}
        emissive={filled ? "#0f766e" : "#5eead4"}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Room() {
  const floor = useFloorTexture();
  const { scene } = useGLTF("/models/workspace/rug.glb");
  const rug = useMemo(() => scene.clone(true), [scene]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, -0.2]}>
        <planeGeometry args={[7.2, 5.6]} />
        <meshStandardMaterial map={floor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.45, -2.55]}>
        <boxGeometry args={[6.4, 2.9, 0.08]} />
        <meshStandardMaterial color="#f7f4ee" />
      </mesh>
      <mesh position={[-3.16, 1.45, -0.2]}>
        <boxGeometry args={[0.08, 2.9, 4.7]} />
        <meshStandardMaterial color="#f7f4ee" />
      </mesh>
      <mesh position={[3.16, 1.45, -0.2]}>
        <boxGeometry args={[0.08, 2.9, 4.7]} />
        <meshStandardMaterial color="#f4efe6" />
      </mesh>
      <mesh position={[0.15, 1.45, -2.48]}>
        <boxGeometry args={[1.7, 2.5, 0.04]} />
        <meshStandardMaterial color="#8a5a3c" />
      </mesh>
      <primitive object={rug} position={[0.05, 0.01, -0.35]} scale={1.6} />
    </group>
  );
}

function useFloorTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    ctx.fillStyle = "#d7b48a";
    ctx.fillRect(0, 0, 512, 512);
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        ctx.fillStyle = (row + col) % 2 === 0 ? "#e4c49a" : "#c89b68";
        ctx.fillRect((row % 2) * 64 + col * 128, row * 64, 120, 56);
      }
    }
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, []);
}

function disposeObject(root: Object3D) {
  root.traverse((obj) => {
    const mesh = obj as Object3D & {
      geometry?: { dispose: () => void };
      material?: { dispose: () => void } | { dispose: () => void }[];
    };
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
    else mesh.material?.dispose();
  });
}

useGLTF.preload("/models/workspace/rug.glb");
