"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { ApartmentScene } from "@/components/three/ApartmentScene";
import { CanvasMount } from "@/components/three/CanvasMount";
import { LoadingScreen } from "@/components/three/LoadingScreen";

/**
 * /apartment — polished learning stage for architectural GLBs.
 * Overlay is DOM (pointer-events auto on chrome, none on the canvas area
 * itself via the header/footer sitting above the full-bleed CanvasMount).
 */
export default function ApartmentPage() {
  const [resetToken, setResetToken] = useState(0);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="pointer-events-auto max-w-md space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="text-sm text-slate-400 transition hover:text-amber-400"
            >
              ← Home
            </Link>
            <h1 className="text-sm font-semibold tracking-wide sm:text-base">
              Apartment Explorer
            </h1>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
            Drag to orbit · Scroll to zoom —{" "}
            <span className="text-slate-500">
              Seret untuk orbit · Scroll untuk zoom
            </span>
          </p>
          <p className="hidden text-xs text-slate-500 sm:block">
            Learning scene for brand / product 3D work — latihan framing
            GLB arsitektur sebelum stage wonderland.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setResetToken((n) => n + 1)}
          className="pointer-events-auto shrink-0 rounded-full border border-slate-600 bg-slate-900/80 px-4 py-1.5 text-sm text-slate-200 transition hover:border-amber-500 hover:text-amber-400"
        >
          Reset camera
        </button>
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
            <ApartmentScene resetToken={resetToken} />
          </CanvasMount>
        </Suspense>
      </div>
    </div>
  );
}
