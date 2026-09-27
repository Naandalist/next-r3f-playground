# Models (`public/models`)

Drop GLB / GLTF product assets here. They are served statically at `/models/...`.

## Included

- `demo.glb` — tiny Khronos glTF Sample Models **Box** (sample asset). Swap it for your brand model when ready.
- `apartment.glb` — low-poly **apartment block** practice asset (~122 KB, Draco-compressed). Used by the `/apartment` explorer. Bounding box roughly 7.6 × 13.4 × 6.8 units (Y is the tall axis). Origin is near the mesh center, so the scene uses `Center` + Orbit distance clamps to frame the whole building.

## Where to find free / CC0 models

- [Khronos glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Poly Pizza](https://poly.pizza/) (check license per asset)
- [Sketchfab](https://sketchfab.com/) — filter for downloadable + CC0 / CC-BY
- [pmndrs market](https://market.pmnd.rs/)

Tip: compress heavy product scans with [gltf-transform](https://gltf-transform.dev/) + Draco before shipping. This apartment file already ships with `KHR_draco_mesh_compression` — load it with `useGLTF(url, true)` so drei wires the Draco decoder.

## Wiring

- `ProductModel` loads `/models/demo.glb` via `useGLTF`. Change `MODEL_URL` in `src/components/three/ProductModel.tsx` to point at your file.
- `ApartmentModel` loads `/models/apartment.glb` (Draco) for the `/apartment` learning scene.
