# Models (`public/models`)

Drop GLB / GLTF product assets here. They are served statically at `/models/...`.

## Included

- `demo.glb` — tiny Khronos glTF Sample Models **Box** (sample asset). Swap it for your brand model when ready.

## Where to find free / CC0 models

- [Khronos glTF Sample Models](https://github.com/KhronosGroup/glTF-Sample-Models)
- [Poly Pizza](https://poly.pizza/) (check license per asset)
- [Sketchfab](https://sketchfab.com/) — filter for downloadable + CC0 / CC-BY
- [pmndrs market](https://market.pmnd.rs/)

Tip: compress heavy product scans with [gltf-transform](https://gltf-transform.dev/) + Draco before shipping.

## Wiring

`ProductModel` loads `/models/demo.glb` via `useGLTF`. Change `MODEL_URL` in
`src/components/three/ProductModel.tsx` to point at your file.
