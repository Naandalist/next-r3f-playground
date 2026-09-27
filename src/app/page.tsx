import Link from "next/link";
import { StarterExperience } from "@/components/three/StarterExperience";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-3xl space-y-8">
        <header className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
            R3F playground
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            next-r3f-playground
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Practice playground for Next.js App Router + TypeScript + React
            Three Fiber — warm-up before immersive product experiences (think
            Mie Sedaap–style brand sites).
          </p>
          <p className="text-base leading-relaxed text-zinc-500">
            Playground latihan R3F di Next/TS. Baca{" "}
            <code className="font-mono text-sm">LEARNING.md</code> dan{" "}
            <code className="font-mono text-sm">git log --reverse</code> sebagai
            kurikulum.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/viewer"
              className="inline-flex items-center rounded-full bg-amber-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
            >
              Open Product Viewer →
            </Link>
            <Link
              href="/apartment"
              className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Apartment Explorer →
            </Link>
            <a
              href="https://github.com/Naandalist/next-r3f-playground"
              className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm text-zinc-700 transition hover:border-zinc-500 dark:border-zinc-600 dark:text-zinc-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repo / commit story
            </a>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Starter cube on /
          </h2>
          <StarterExperience className="h-[50vh] w-full overflow-hidden rounded-xl" />
        </section>
      </main>
    </div>
  );
}
