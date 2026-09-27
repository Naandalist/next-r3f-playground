"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { CanvasMount } from "@/components/three/CanvasMount";
import { LoadingScreen } from "@/components/three/LoadingScreen";
import { ProductScene } from "@/components/three/Scene";

export default function ViewerPage() {
  const [resetToken, setResetToken] = useState(0);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-slate-400 transition hover:text-amber-400"
          >
            ← Home
          </Link>
          <h1 className="text-sm font-medium tracking-wide sm:text-base">
            Product Viewer
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setResetToken((n) => n + 1)}
          className="rounded-full border border-slate-600 bg-slate-900/80 px-4 py-1.5 text-sm text-slate-200 transition hover:border-amber-500 hover:text-amber-400"
        >
          Reset camera
        </button>
      </header>

      <div className="relative min-h-screen w-full flex-1">
        <Suspense fallback={<LoadingScreen />}>
          <CanvasMount className="h-screen w-full">
            <ProductScene resetToken={resetToken} />
          </CanvasMount>
        </Suspense>
      </div>
    </div>
  );
}
