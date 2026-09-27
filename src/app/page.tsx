export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-2xl space-y-6 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium uppercase tracking-widest text-amber-600">
          Empty stage
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          next-r3f-playground
        </h1>
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Clean Next.js App Router + TypeScript baseline. Routing, layout, and
          tooling are solid — Three.js / React Three Fiber arrives in the next
          commits.
        </p>
        <p className="text-base leading-relaxed text-zinc-500 dark:text-zinc-500">
          Baseline bersih Next.js App Router + TypeScript. Routing, layout, dan
          tooling sudah siap — Three.js / React Three Fiber menyusul di commit
          berikutnya.
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-zinc-500">
          <li>
            Pages live under <code className="font-mono text-zinc-700 dark:text-zinc-300">src/app/</code>
          </li>
          <li>App Router · TypeScript · Tailwind · ESLint</li>
          <li>No WebGL yet — this commit is the empty stage</li>
        </ul>
      </main>
    </div>
  );
}
