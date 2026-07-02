# Victoria Ren Resume Website

A dependency-free software engineer resume website built as a Sites-compatible ESM Worker.

## Commands

```sh
npm run dev
npm run build
npm run validate
npm run preview
```

`npm run dev` rebuilds automatically when source files change and serves the latest Worker at `http://localhost:4173`. It also injects a local-only reload hook so the browser refreshes after successful rebuilds.

`npm run preview` serves the already-built Worker from `dist/server/index.js` without watching files.

## Project Shape

```text
assets/
  hero-workspace.png
worker/
  index.js
scripts/
  dev.mjs
  build.mjs
  build.sh
  serve.mjs
  validate-artifact.mjs
```

`worker/index.js` is the hand-edited source. The build injects `assets/hero-workspace.png` into the generated Worker so the deployable artifact is self-contained.
