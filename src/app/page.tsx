import { StarterExperience } from "@/components/three/StarterExperience";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-3xl space-y-8">
        <header className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
            Hello cube
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            next-r3f-playground
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Drag to orbit, scroll to zoom. This is mesh + lights +{" "}
            <code className="font-mono text-sm">OrbitControls</code> — the
            classic first interactive Three.js scene, expressed in R3F.
          </p>
          <p className="text-base leading-relaxed text-zinc-500">
            Seret untuk orbit, scroll untuk zoom. Scene pertama yang interaktif.
          </p>
        </header>

        <StarterExperience />
      </main>
    </div>
  );
}
