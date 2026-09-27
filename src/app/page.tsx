import { CanvasMount } from "@/components/three/CanvasMount";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-3xl space-y-8">
        <header className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
            Client-only canvas
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            next-r3f-playground
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            The slate rectangle below is a React Three Fiber{" "}
            <code className="font-mono text-sm">Canvas</code> loaded with{" "}
            <code className="font-mono text-sm">next/dynamic</code> and{" "}
            <code className="font-mono text-sm">ssr: false</code> from a Client
            Component (`CanvasMount`) — WebGL never runs during server render.
          </p>
          <p className="text-base leading-relaxed text-zinc-500">
            Kotak di bawah adalah Canvas R3F yang di-load client-only. Pitfall
            Next.js: jangan pernah render WebGL di Server Component;{" "}
            <code className="font-mono text-sm">ssr: false</code> hanya legal di
            Client Component.
          </p>
        </header>

        <CanvasMount />
      </main>
    </div>
  );
}
