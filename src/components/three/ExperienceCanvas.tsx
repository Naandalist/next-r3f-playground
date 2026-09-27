"use client";

/**
 * Client-only Canvas shell.
 * Mount via CanvasMount (dynamic ssr:false) from pages.
 */
import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

type ExperienceCanvasProps = {
  children?: ReactNode;
  className?: string;
};

export function ExperienceCanvas({
  children,
  className,
}: ExperienceCanvasProps) {
  return (
    <div className={className ?? "h-[60vh] w-full overflow-hidden rounded-xl"}>
      <Canvas
        style={{ background: "#0f172a" }}
        camera={{ position: [2.5, 2, 4], fov: 45 }}
        gl={{ antialias: true }}
        shadows
      >
        {children}
      </Canvas>
    </div>
  );
}
