import http from "node:http";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";
const workerPath = resolve("dist/server/index.js");

if (!existsSync(workerPath)) {
  throw new Error("Build the site first with `npm run build`.");
}

const workerModule = await import(pathToFileURL(workerPath));

const server = http.createServer(async (incoming, outgoing) => {
  const url = new URL(incoming.url ?? "/", `http://${host}:${port}`);
  const request = new Request(url, {
    headers: incoming.headers,
    method: incoming.method,
  });

  try {
    const response = await workerModule.default.fetch(request, {}, {});
    const body = Buffer.from(await response.arrayBuffer());
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(body);
  } catch (error) {
    outgoing.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    outgoing.end(error instanceof Error ? error.stack : String(error));
  }
});

server.listen(port, host, () => {
  console.log(`Preview running at http://localhost:${port}`);
});
