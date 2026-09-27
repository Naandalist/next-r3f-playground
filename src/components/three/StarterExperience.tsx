"use client";

import { CanvasMount } from "@/components/three/CanvasMount";
import { StarterScene } from "@/components/three/Scene";

type StarterExperienceProps = {
  className?: string;
};

export function StarterExperience({ className }: StarterExperienceProps) {
  return (
    <CanvasMount className={className}>
      <StarterScene />
    </CanvasMount>
  );
}
