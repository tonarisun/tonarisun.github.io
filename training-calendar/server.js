const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const args = process.argv.slice(2);

function getArgValue(flag, fallback) {
  const index = args.indexOf(flag);
  if (index === -1 || !args[index + 1]) {
    return fallback;
  }
  return args[index + 1];
}

const host = getArgValue("--host", process.env.HOST || "0.0.0.0");
const port = Number(getArgValue("--port", process.env.PORT || "8080"));

const STATIC_DIR = __dirname;
const INDEX_FILE = path.join(STATIC_DIR, "index.html");

const MIME_TYPES = {
  ".html": "text/html; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".css": "text/css; charset=UTF-8",
  ".json": "application/json; charset=UTF-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function safeResolvePath(requestPathname) {
  const decoded = decodeURIComponent(requestPathname);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const candidate = normalized === "/" ? "/index.html" : normalized;
  const filePath = path.join(STATIC_DIR, candidate);
  const relative = path.relative(STATIC_DIR, filePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url || "/");
  const pathname = parsedUrl.pathname || "/";
  const resolvedPath = safeResolvePath(pathname);

  if (!resolvedPath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=UTF-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(resolvedPath, (statError, stats) => {
    let targetFile = resolvedPath;

    if (!statError && stats.isDirectory()) {
      targetFile = path.join(resolvedPath, "index.html");
    }

    fs.readFile(targetFile, (readError, data) => {
      if (readError) {
        // Fallback for client routes.
        fs.readFile(INDEX_FILE, (indexError, indexData) => {
          if (indexError) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
            res.end("Not Found");
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
          res.end(indexData);
        });
        return;
      }

      const ext = path.extname(targetFile).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  });
});

server.listen(port, host, () => {
  console.log("training-calendar server is running");
  console.log("Local:   http://" + host + ":" + port);
  if (host === "0.0.0.0") {
    console.log("Network: http://<your-local-ip>:" + port);
  }
});
