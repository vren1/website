import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";
const workerPath = resolve(projectRoot, "dist/server/index.js");
const buildScript = resolve(projectRoot, "scripts/build.mjs");
const watchTargets = [
  "worker/index.js",
  "assets/hero-workspace.png",
  "Victoria_Ren_Resume.docx",
  ".openai/hosting.json",
  "scripts/build.mjs",
].map((target) => resolve(projectRoot, target));

const reloadClient = `<script>
(() => {
  const events = new EventSource("/__dev/events");
  events.addEventListener("reload", () => window.location.reload());
})();
</script>`;

let currentWorker = null;
let currentMtimeMs = 0;
let lastSourceSnapshot = "";
let buildInProgress = false;
let buildQueued = false;
const liveReloadClients = new Set();

function runBuild() {
  buildInProgress = true;
  console.log("[dev] building");

  return new Promise((resolveBuild) => {
    const child = spawn(process.execPath, [buildScript], {
      cwd: projectRoot,
      stdio: "inherit",
    });

    child.on("close", (code) => {
      buildInProgress = false;

      if (code === 0) {
        console.log("[dev] build complete");
        notifyReload();
      } else {
        console.error(`[dev] build failed with exit code ${code}`);
      }

      if (buildQueued) {
        buildQueued = false;
        runBuild().then(resolveBuild);
        return;
      }

      resolveBuild(code === 0);
    });
  });
}

async function getSourceSnapshot() {
  const entries = await Promise.all(
    watchTargets.map(async (target) => {
      try {
        const stats = await stat(target);
        return `${target}:${stats.mtimeMs}:${stats.size}`;
      } catch {
        return `${target}:missing`;
      }
    }),
  );
  return entries.join("|");
}

async function rebuildIfSourcesChanged(reason) {
  const nextSourceSnapshot = await getSourceSnapshot();
  if (nextSourceSnapshot === lastSourceSnapshot) {
    return;
  }

  lastSourceSnapshot = nextSourceSnapshot;
  console.log(`[dev] change detected: ${reason}`);

  if (buildInProgress) {
    buildQueued = true;
    return;
  }

  void runBuild();
}

function startSourcePolling() {
  setInterval(() => {
    void rebuildIfSourcesChanged("source snapshot");
  }, 700);
}

function notifyReload() {
  for (const response of liveReloadClients) {
    response.write("event: reload\ndata: built\n\n");
  }
}

async function loadWorker() {
  const stats = await stat(workerPath);
  if (!currentWorker || stats.mtimeMs !== currentMtimeMs) {
    currentMtimeMs = stats.mtimeMs;
    currentWorker = await import(
      `${pathToFileURL(workerPath).href}?mtime=${stats.mtimeMs}`
    );
  }
  return currentWorker;
}

async function handleWorkerRequest(incoming, outgoing) {
  const url = new URL(incoming.url ?? "/", `http://${host}:${port}`);
  const workerModule = await loadWorker();
  const request = new Request(url, {
    headers: incoming.headers,
    method: incoming.method,
  });

  const response = await workerModule.default.fetch(request, {}, {});
  const headers = new Headers(response.headers);
  let body = Buffer.from(await response.arrayBuffer());

  if ((headers.get("content-type") ?? "").startsWith("text/html")) {
    const html = body.toString("utf8");
    const withReload = html.includes("</body>")
      ? html.replace("</body>", `${reloadClient}</body>`)
      : `${html}${reloadClient}`;
    body = Buffer.from(withReload);
    headers.delete("content-length");
  }

  outgoing.writeHead(response.status, Object.fromEntries(headers));
  outgoing.end(body);
}

function handleLiveReload(incoming, outgoing) {
  outgoing.writeHead(200, {
    "cache-control": "no-cache, no-transform",
    connection: "keep-alive",
    "content-type": "text/event-stream; charset=utf-8",
  });
  outgoing.write(": connected\n\n");
  liveReloadClients.add(outgoing);

  incoming.on("close", () => {
    liveReloadClients.delete(outgoing);
  });
}

lastSourceSnapshot = await getSourceSnapshot();
const initialBuildOk = await runBuild();
if (!initialBuildOk) {
  process.exitCode = 1;
  throw new Error("Initial dev build failed.");
}

for (const target of watchTargets) {
  if (!existsSync(target)) {
    console.warn(`[dev] watch target missing: ${target}`);
  }
}
startSourcePolling();

const server = http.createServer(async (incoming, outgoing) => {
  const url = new URL(incoming.url ?? "/", `http://${host}:${port}`);

  if (url.pathname === "/__dev/events") {
    handleLiveReload(incoming, outgoing);
    return;
  }

  try {
    await handleWorkerRequest(incoming, outgoing);
  } catch (error) {
    outgoing.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    outgoing.end(error instanceof Error ? error.stack : String(error));
  }
});

server.listen(port, host, () => {
  console.log(`[dev] serving http://localhost:${port}`);
});
