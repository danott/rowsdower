// Turn rowsdower.js (an ES module) into rowsdower.global.js (a classic script that sets window.rowsdower).
// rowsdower.js has no imports, so this is a text transform: drop the exports and wrap it in a function.
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const root = new URL("..", import.meta.url)
const EXPORT = "export default function rowsdower("
const COMMONJS = /\n\/\/ Makes require\("rowsdower"\).*\nexport \{ rowsdower as "module\.exports" \}\n/

export function buildGlobal() {
  const source = readFileSync(new URL("rowsdower.js", root), "utf8")
  const { version, license, repository } = JSON.parse(readFileSync(new URL("package.json", root), "utf8"))

  if (source.split(EXPORT).length !== 2) {
    throw new Error(`rowsdower.js must contain exactly one \`${EXPORT}\``)
  }
  if (!COMMONJS.test(source)) {
    throw new Error('rowsdower.js must end with its `export { rowsdower as "module.exports" }` line')
  }
  const script = source.replace(COMMONJS, "\n").replace(EXPORT, "function rowsdower(")
  if (/^\s*(import|export)\b/m.test(script)) {
    throw new Error("rowsdower.js may only have its default export; anything else needs a real bundler")
  }

  const body = script.trim()
  const indented = body.replace(/^(?=.)/gm, "  ")
  const url = `https://github.com/${repository.replace(/^github:/, "")}`

  return `/*! rowsdower ${version} | ${license} | ${url} */
// Generated from rowsdower.js by scripts/build-global.js. Don't edit this file; run \`npm run build\`.
;(function () {
${indented}

  window.rowsdower = rowsdower
})()
`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(new URL("rowsdower.global.js", root), buildGlobal())
  console.log("Wrote rowsdower.global.js")
}
