import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const workerPath = resolve(projectRoot, "dist/server/index.js");

const [source] = await Promise.all([readFile(workerPath, "utf8")]);

// A data URL forces ESM parsing even though the deployment archive has no package.json.
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const workerModule = await import(moduleUrl);
assert.equal(
  typeof workerModule.default?.fetch,
  "function",
  `${pathToFileURL(workerPath)} must export default.fetch`,
);

const htmlResponse = await workerModule.default.fetch(
  new Request("https://site.test/"),
);
assert.equal(htmlResponse.status, 200, "home route should return 200");
assert.match(
  htmlResponse.headers.get("content-type") ?? "",
  /^text\/html/,
  "home route should return HTML",
);

const html = await htmlResponse.text();
assert.match(
  html,
  /Victoria Ren/,
  "home route should include portfolio content",
);
assert.match(html, /ADELE/, "home route should include resume impact content");
assert.match(
  html,
  /victoriaren7@gmail\.com/,
  "home route should include resume contact",
);
assert.match(
  html,
  /\/assets\/hero-workspace\.png/,
  "home route should reference the hero image",
);
assert.match(
  html,
  /\/Victoria_Ren_Resume\.docx/,
  "home route should reference the downloadable resume",
);

const imageResponse = await workerModule.default.fetch(
  new Request("https://site.test/assets/hero-workspace.png"),
);
assert.equal(imageResponse.status, 200, "hero image route should return 200");
assert.equal(
  imageResponse.headers.get("content-type"),
  "image/png",
  "hero image route should return PNG content",
);
assert.ok(
  (await imageResponse.arrayBuffer()).byteLength > 1_000_000,
  "hero image route should return the bundled image",
);

const resumeResponse = await workerModule.default.fetch(
  new Request("https://site.test/Victoria_Ren_Resume.docx"),
);
assert.equal(resumeResponse.status, 200, "resume route should return 200");
assert.equal(
  resumeResponse.headers.get("content-type"),
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "resume route should return DOCX content",
);
assert.ok(
  (await resumeResponse.arrayBuffer()).byteLength > 5_000,
  "resume route should return the bundled resume",
);

console.log(
  "Artifact is valid ESM, exports default.fetch, and serves expected routes",
);
