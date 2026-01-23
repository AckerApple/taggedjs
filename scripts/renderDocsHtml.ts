import { Window as HappyWindow } from "happy-dom"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const window = new HappyWindow()
globalThis.window = window as unknown as globalThis.Window & typeof globalThis
globalThis.document = window.document as unknown as globalThis.Document
globalThis.navigator = window.navigator as unknown as globalThis.Navigator

const { tagElement } = await import("taggedjs")
const { GuideApp } = await import("../src/documentations/guide.js")

const mount = document.createElement("app")
mount.id = "docs-app"
document.body.appendChild(mount)

tagElement(GuideApp, mount)

const ssrHtml = mount.innerHTML
const docsPath = path.join(__dirname, "..", "documentation", "index.html")
const html = fs.readFileSync(docsPath, "utf8")

const startMarker = "<!-- taggedjs:ssr-start -->"
const endMarker = "<!-- taggedjs:ssr-end -->"

if (!html.includes(startMarker) || !html.includes(endMarker)) {
  throw new Error(`Missing SSR markers in ${docsPath}`)
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
const markerRegex = new RegExp(
  `^([\\t ]*)${escapeRegex(startMarker)}[\\s\\S]*?${escapeRegex(endMarker)}`,
  "m"
)

const match = html.match(markerRegex)
if (!match) {
  throw new Error(`Could not locate SSR markers in ${docsPath}`)
}

const markerIndent = match[1] ?? ""
const indented = ssrHtml
  .split("\n")
  .map((line) => (line.length ? `${markerIndent}${line}` : line))
  .join("\n")

const block = [
  `${markerIndent}${startMarker}`,
  indented,
  `${markerIndent}${endMarker}`,
].join("\n")

const updated = html.replace(markerRegex, block)

fs.writeFileSync(docsPath, updated)
console.debug(`Rendered docs HTML into ${docsPath}`)
