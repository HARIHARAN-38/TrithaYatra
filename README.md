# TRITHAYATRA · HARI EDITION

Hari's independent edition of the Indian art atlas. It keeps the timeline, interactive map, artwork stories, and source archive, with a warmer botanical palette and literary editorial style.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build`. The output is a static SPA in `dist/`; Vercel's SPA rewrite is included in `vercel.json`.

## Experiences

- `/timeline` — six sourced chapters with a scroll driven Three.js depth gallery and accessible artifact notes.
- `/map` — eight locations with Leaflet, OpenStreetMap tiles, a keyboard operable index, and source panels.
- `/sources` — research references, image credits and third party notices.

Historical and visual content lives in `src/data/`. Image licences and source links are recorded in `src/data/media.ts` and shown on the sources page.

## Third party code

MIT notices are retained under `third_party/`. Adapted scroll progress and camera beat code is in `src/experience/scroll-rig.ts`. The art image depth and scroll mood approach also draws on Codrops' Atmospheric Depth Gallery. The Awwwards 3D repository informs lighting and scene composition; it is a template and reference collection, not a site base. Bruno Simon's folio is used as a visual quality reference only.

## Map tiles

The map uses OpenStreetMap standard raster tiles and displays attribution. Follow the current [OpenStreetMap tile usage policy](https://operations.osmfoundation.org/policies/tiles/) if deployment traffic grows.
