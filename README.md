# Victoria Ren Resume Website

A dependency-free software engineer resume website built as a Sites-compatible ESM Worker.

## Commands

```sh
npm run dev
npm run build
npm run validate
npm run export:pages
npm run preview
```

`npm run dev` rebuilds automatically when source files change and serves the latest Worker at `http://localhost:4173`. It also injects a local-only reload hook so the browser refreshes after successful rebuilds.

`npm run preview` serves the already-built Worker from `dist/server/index.js` without watching files.

`npm run export:pages` writes a static GitHub Pages artifact to `_site/` after `npm run build` has produced `dist/server/index.js`.

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds the Worker artifact, validates it, exports `_site/`, and deploys that static folder to GitHub Pages.

In the GitHub repository, set `Settings` -> `Pages` -> `Build and deployment` -> `Source` to `GitHub Actions`.

## Project Shape

```text
assets/
  hero-workspace.png
Victoria_Ren_Resume.docx
worker/
  index.js
scripts/
  dev.mjs
  build.mjs
  build.sh
  export-pages.mjs
  serve.mjs
  validate-artifact.mjs
```

`worker/index.js` is the hand-edited source. The build injects `assets/hero-workspace.png` and `Victoria_Ren_Resume.docx` into the generated Worker so the deployable artifact is self-contained.
