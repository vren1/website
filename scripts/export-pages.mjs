import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(".");
const workerPath = resolve(projectRoot, "dist/server/index.js");
const outputRoot = resolve(projectRoot, "_site");

const workerModule = await import(
  `${pathToFileURL(workerPath).href}?export=${Date.now()}`
);

async function fetchRoute(pathname) {
  const response = await workerModule.default.fetch(
    new Request(`https://pages.local${pathname}`),
    {},
    {},
  );

  if (!response.ok) {
    throw new Error(`Failed to export ${pathname}: ${response.status}`);
  }

  return response;
}

function makeProjectPagesSafe(html) {
  return html
    .replace(
      /((?:href|src)=["'])\/(assets\/hero-workspace\.png|Victoria_Ren_Resume\.docx)(["'])/g,
      "$1$2$3",
    )
    .replace(/href="\/"/g, 'href="./"');
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(resolve(outputRoot, "assets"), { recursive: true });

const homeResponse = await fetchRoute("/");
const homeHtml = makeProjectPagesSafe(await homeResponse.text());
await writeFile(resolve(outputRoot, "index.html"), homeHtml);

const imageResponse = await fetchRoute("/assets/hero-workspace.png");
await writeFile(
  resolve(outputRoot, "assets/hero-workspace.png"),
  Buffer.from(await imageResponse.arrayBuffer()),
);

const resumeResponse = await fetchRoute("/Victoria_Ren_Resume.docx");
await writeFile(
  resolve(outputRoot, "Victoria_Ren_Resume.docx"),
  Buffer.from(await resumeResponse.arrayBuffer()),
);

await writeFile(resolve(outputRoot, ".nojekyll"), "");

console.log(`Exported GitHub Pages site to ${outputRoot}`);
