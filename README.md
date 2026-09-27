# next-r3f-playground

Practice playground: **Next.js App Router + TypeScript + React Three Fiber (Three.js)**.

Built as a learning runway before heavy Three.js work on brand experiences (e.g. Mie Sedaap–style immersive product sites at Zero One Group).

> **Kurikulum = commit history.** Baca `LEARNING.md` dan jalankan `git log --reverse`.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` |

## Learning goals (Mie Sedaap–style prep)

- Mount WebGL safely in Next.js (`'use client'` + `next/dynamic` `ssr: false` inside a Client Component)
- Compose a scene: lights, mesh, `OrbitControls`, environment, shadows
- Load a GLB with `useGLTF` behind `Suspense` + a loading gate
- Structure a `/viewer` product stage you can later theme for a brand

## Run locally

```bash
git clone https://github.com/Naandalist/next-r3f-playground.git
cd next-r3f-playground
npm install
npm run dev
```

- Home: [http://localhost:3000](http://localhost:3000)
- Product viewer: [http://localhost:3000/viewer](http://localhost:3000/viewer)

```bash
npm run build   # production check
npm start       # serve the build
```

## Project map

```
src/
  app/
    page.tsx              # landing + starter cube
    viewer/page.tsx       # full-viewport product stage
  components/three/
    CanvasMount.tsx       # next/dynamic ssr:false client boundary
    ExperienceCanvas.tsx  # R3F Canvas shell
    StarterExperience.tsx # home cube composition
    Scene.tsx             # StarterScene + ProductScene
    ProductModel.tsx      # useGLTF loader
    LoadingScreen.tsx     # Suspense DOM overlay
  lib/three/
    dispose.ts            # GPU cleanup notes
public/models/
  demo.glb                # tiny sample — replace with your product
  README.md               # where to get CC0 GLBs
```

## Replay the curriculum

```bash
git log --reverse --format='%h %s'
```

See **LEARNING.md** for what each commit teaches and what to practice next (Draco, scroll-driven camera, WebXR).

## License

Practice code — use freely for learning. Sample `demo.glb` is from the Khronos glTF Sample Models collection; respect upstream licenses when you swap assets.
