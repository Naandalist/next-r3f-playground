"use client";

/**
 * Client boundary that owns `next/dynamic({ ssr: false })`.
 *
 * Next.js lesson: `ssr: false` is NOT allowed in Server Components
 * (Next 15+/16). Keep the dynamic import here, then import CanvasMount
 * from any Server Component page.
 */
import dynamic from "next/dynamic";
import type { ComponentProps, ReactNode } from "react";

const ExperienceCanvas = dynamic(
  () =>
    import("@/components/three/ExperienceCanvas").then(
      (m) => m.ExperienceCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] w-full items-center justify-center rounded-xl bg-slate-900 text-sm text-slate-400">
        Mounting WebGL canvas…
      </div>
    ),
  },
);

type CanvasMountProps = {
  children?: ReactNode;
  className?: string;
};

export function CanvasMount(props: CanvasMountProps) {
  return <ExperienceCanvas {...props} />;
}

export type CanvasMountComponentProps = ComponentProps<typeof CanvasMount>;
