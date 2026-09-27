"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ApartmentScene } from "@/components/three/ApartmentScene";
import { CanvasMount } from "@/components/three/CanvasMount";
import { LoadingScreen } from "@/components/three/LoadingScreen";

/**
 * /apartment — full-viewport practice stage for an architectural GLB.
 * Client page so Suspense + state (reset) stay next to the canvas tree.
 */
export default function ApartmentPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm text-slate-400 transition hover:text-amber-400"
        >
          ← Home
        </Link>
        <h1 className="text-sm font-medium tracking-wide sm:text-base">
          Apartment Explorer
        </h1>
      </header>

      <div className="relative min-h-screen w-full flex-1">
        <Suspense
          fallback={
            <LoadingScreen
              label="Loading apartment…"
              subtitle="Menyiapkan model apartemen…"
            />
          }
        >
          <CanvasMount className="h-screen w-full rounded-none">
            <ApartmentScene />
          </CanvasMount>
        </Suspense>
      </div>
    </div>
  );
}
