// Serve the docs locally exactly as GitHub Pages will: docs/ at the root, plus rowsdower.js and rowsdower.global.js.
import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, join, normalize } from "node:path"

const root = new URL("..", import.meta.url).pathname
const port = Number(process.env.PORT) || 8000
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (path.endsWith("/")) path += "index.html"
  const library = ["/rowsdower.js", "/rowsdower.global.js"].includes(path)
  const file = library ? join(root, path) : join(root, "docs", path)

  try {
    const body = await readFile(file)
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" })
    res.end(body)
  } catch {
    res.writeHead(404).end("Not found")
  }
}).listen(port, () => console.log(`Docs at http://localhost:${port}/`))
