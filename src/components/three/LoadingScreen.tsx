"use client";

/**
 * DOM overlay shown while Suspense waits for assets (e.g. useGLTF).
 * Kept outside the Canvas so it stays readable HTML/CSS.
 */
export function LoadingScreen({ label = "Loading 3D assets…" }: { label?: string }) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950/90 text-slate-200"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent"
        aria-hidden
      />
      <p className="text-sm tracking-wide">{label}</p>
      <p className="text-xs text-slate-500">Menyiapkan model produk…</p>
    </div>
  );
}
