import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const workerPath = resolve(projectRoot, "worker/index.js");
const heroPath = resolve(projectRoot, "assets/hero-workspace.png");
const resumePath = resolve(projectRoot, "Victoria_Ren_Resume.docx");

const [workerSource, heroImage, resumeDocx, manifest] = await Promise.all([
  readFile(workerPath, "utf8"),
  readFile(heroPath),
  readFile(resumePath),
  readFile(manifestPath, "utf8"),
]);

for (const placeholder of [
  '"__HERO_WORKSPACE_BASE64__"',
  '"__RESUME_DOCX_BASE64__"',
]) {
  if (!workerSource.includes(placeholder)) {
    throw new Error(`Missing ${placeholder} placeholder in worker/index.js`);
  }
}

const bundledWorker = workerSource
  .replace(
    '"__HERO_WORKSPACE_BASE64__"',
    JSON.stringify(heroImage.toString("base64")),
  )
  .replace(
    '"__RESUME_DOCX_BASE64__"',
    JSON.stringify(resumeDocx.toString("base64")),
  );

await rm(distRoot, { recursive: true, force: true });
await mkdir(resolve(distRoot, "server"), { recursive: true });
await writeFile(resolve(distRoot, "server/index.js"), bundledWorker);

console.log(`Built ${distRoot}`);
