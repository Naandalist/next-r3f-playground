"use client";

/**
 * Client-only Canvas shell.
 * Do not import this directly from a Server Component with
 * next/dynamic({ ssr: false }) — in Next.js 15+/16 that option is only
 * legal inside a Client Component. Use CanvasMount instead.
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
        // Solid background proves the canvas mounted; scene content comes later
        style={{ background: "#0f172a" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        {children}
      </Canvas>
    </div>
  );
}
