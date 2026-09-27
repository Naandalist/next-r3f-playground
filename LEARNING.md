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

### 6. `docs: map the commit history into a Three.js/R3F learning curriculum`

**Kenapa:** Dokumentasi agar Nanda (dan mentor ZOG) bisa replay cerita belajar dari git history.

**Latihan:** Tulis catatan sendiri di bawah “Next practice”.

### 7. Branch `feat/apartment-viewer` — Apartment Explorer

Checkout:

```bash
git checkout feat/apartment-viewer
npm run dev
# open http://localhost:3000/apartment
```

**Kenapa:** Produk box (`demo.glb`) terlalu kecil untuk latihan framing. Apartment block memaksa kamu menghitung bbox, `Center`, clamp orbit (jangan tembus lantai), dan load Draco.

**File yang wajib dibaca:**

| File | Yang dipelajari |
|------|-----------------|
| `public/models/apartment.glb` + `README.md` | Asset + catatan Draco / ukuran bbox |
| `src/components/three/ApartmentModel.tsx` | `useGLTF(url, true)` — argumen kedua = Draco |
| `src/components/three/ApartmentScene.tsx` | `Center`, `Box3` framing, `maxPolarAngle`, reset camera |
| `src/app/apartment/page.tsx` | Overlay DOM + `pointer-events` di atas canvas penuh |
| `src/components/three/LoadingScreen.tsx` | Subtitle opsional untuk copy ID/EN |

**Latihan:** Ubah `Environment preset` dari `apartment` → `city` / `warehouse`. Longgarkan `maxPolarAngle`. Ganti jarak framing (`1.35` multiplier di `MeasureBounds`).

## Next practice (setelah playground ini)

1. **Draco / Meshopt GLB** — compress model produk besar dengan `gltf-transform` (apartment sudah contoh Draco-ready)
2. **Scroll experience** — ikat progress scroll ke posisi kamera (`ScrollControls` atau Lenis + `useFrame`)
3. **WebXR** — coba `@react-three/xr` untuk headset / AR preview
4. **Postprocessing** — bloom / vignette untuk “wonderland” look
5. **Multiple products** — route dinamis `/viewer/[slug]` + catalog JSON
6. **Interior walkthrough** — pertama-person / pointer-lock di dalam unit apartemen

## Tips Indonesia → English identifiers

Komentar boleh campur ID/EN di docs; **nama komponen, file, dan props tetap English** agar siap code-review di Zero One Group.

Selamat berlatih — see you in the wonderland stage.
