# Learning curriculum — baca commit history

Urutan commit di repo ini adalah kurikulum. Jangan squash; replay dari awal.

```bash
git log --reverse --format='%h %s%n%b%n---'
```

## Commit map (ordered)

### 1. `chore: bootstrap Next.js App Router playground with TypeScript`

**Kenapa:** Baseline routing, layout, dan tooling harus solid sebelum WebGL masuk.

**Latihan:** Buka `src/app/`, pahami App Router (`layout.tsx`, `page.tsx`), jalankan `npm run dev` tanpa canvas.

### 2. `feat(deps): add Three.js and React Three Fiber to the Next.js stack`

**Kenapa:** R3F = Three.js deklaratif di React (bukan imperative `new THREE.*` di `useEffect`). Drei menyediakan controls, loaders, environment.

**Latihan:** Baca `package.json`. Bandingkan API Fiber vs raw three docs.

### 3. `feat(canvas): mount a client-only R3F Canvas that skips SSR`

**Kenapa:** Pitfall Next.js — `window` / WebGL tidak ada di server. Di Next 15+/16, `next/dynamic({ ssr: false })` **hanya legal di Client Component**. Pola kita: `CanvasMount` (client) punya dynamic import; page Server Component mengimpor `CanvasMount`.

**Latihan:** Baca `CanvasMount.tsx` vs `ExperienceCanvas.tsx`. Jangan panggil `dynamic(..., { ssr: false })` langsung dari Server Component — build akan gagal.

### 4. `feat(scene): light a starter mesh and enable orbit camera controls`

**Kenapa:** Hello cube = mesh + material + lights + `OrbitControls`. Fondasi scene interaktif.

**Latihan:** Ganti `boxGeometry` → `sphereGeometry`, ubah warna, tambah `pointLight`.

### 5. `feat(viewer): add /viewer product stage with Suspense loading gate`

**Kenapa:** Pola brand site — stage produk penuh viewport, loading gate, environment, shadows, reset camera. Dekat dengan pengalaman immersive (Mie Sedaap–style).

**Latihan:** Ganti `public/models/demo.glb` dengan GLB CC0 lain; sesuaikan `scale` di `ProductModel`. Baca `LoadingScreen` + `Suspense`.

### 6. `docs: map the commit history into a Two.js/R3F learning curriculum`

**Kenapa:** Dokumentasi agar Nanda (dan mentor ZOG) bisa replay cerita belajar dari git history.

**Latihan:** Tulis catatan sendiri di bawah “Next practice”.

## Next practice (setelah playground ini)

1. **Draco / Meshopt GLB** — compress model produk besar dengan `gltf-transform`
2. **Scroll experience** — ikat progress scroll ke posisi kamera (`ScrollControls` atau Lenis + `useFrame`)
3. **WebXR** — coba `@react-three/xr` untuk headset / AR preview
4. **Postprocessing** — bloom / vignette untuk “wonderland” look
5. **Multiple products** — route dinamis `/viewer/[slug]` + catalog JSON

## Tips Indonesia → English identifiers

Komentar boleh campur ID/EN di docs; **nama komponen, file, dan props tetap English** agar siap code-review di Zero One Group.

Selamat berlatih — see you in the wonderland stage.
