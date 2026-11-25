import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import vm from "node:vm"
import { buildGlobal } from "../scripts/build-global.js"
import { FakeDocument } from "./fake-dom.js"

const committed = readFileSync(new URL("../rowsdower.global.js", import.meta.url), "utf8")

// Load the file the way a browser loads <script src="rowsdower.global.js">.
function loadInPage() {
  const page = vm.createContext({ document: new FakeDocument() })
  page.window = page
  new vm.Script(committed, { filename: "rowsdower.global.js" }).runInContext(page)
  return page
}

test("rowsdower.global.js is up to date with rowsdower.js", () => {
  assert.equal(committed, buildGlobal(), "Run `npm run build` and commit rowsdower.global.js")
})

test("runs as a classic script and sets window.rowsdower", () => {
  const page = loadInPage()
  assert.equal(typeof page.window.rowsdower, "function")
  assert.deepEqual(
    Object.keys(page).filter((key) => !["document", "window"].includes(key)),
    ["rowsdower"],
    "should only add window.rowsdower",
  )
})

test("the global mounts to document.body and cleans up", () => {
  const page = loadInPage()
  const cleanup = page.window.rowsdower()

  const [chairs] = page.document.body.children
  assert.ok("rowsdowerChairs" in chairs.dataset)
  assert.ok("rowsdowerCrew" in chairs.children[0].dataset)

  cleanup()
  cleanup()
  assert.equal(page.document.body.children.length, 0)
})
