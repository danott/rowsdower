import { test, beforeEach, afterEach } from "node:test"
import assert from "node:assert/strict"
import { createRequire } from "node:module"
import rowsdower from "../rowsdower.js"
import { FakeDocument } from "./fake-dom.js"

const pngDataUri = /^data:image\/png;base64,[A-Za-z0-9+/]+=*$/

let originalDocument
beforeEach(() => {
  originalDocument = globalThis.document
  globalThis.document = new FakeDocument()
})
afterEach(() => {
  globalThis.document = originalDocument
})

test("mounts the chairs and crew to document.body by default", () => {
  rowsdower()

  const [chairs] = document.body.children
  assert.equal(document.body.children.length, 1)
  assert.equal(chairs.tagName, "DIV")
  assert.ok("rowsdowerChairs" in chairs.dataset)

  const [crew] = chairs.children
  assert.equal(crew.tagName, "IMG")
  assert.ok("rowsdowerCrew" in crew.dataset)
  assert.match(crew.src, pngDataUri)
  assert.equal(crew.alt, "")
})

test("mounts to a given target", () => {
  const target = document.createElement("div")
  document.body.append(target)

  rowsdower(target)

  assert.equal(document.body.children.length, 1)
  assert.equal(target.children.length, 1)
  assert.ok("rowsdowerChairs" in target.children[0].dataset)
})

test("creates elements with the target's own document", () => {
  const otherDocument = new FakeDocument()

  rowsdower(otherDocument.body)

  const [chairs] = otherDocument.body.children
  assert.equal(chairs.ownerDocument, otherDocument)
  assert.equal(document.body.children.length, 0)
})

test("pins the theater to the bottom right of the viewport", () => {
  rowsdower()

  const [chairs] = document.body.children
  const [crew] = chairs.children
  assert.equal(chairs.style.position, "fixed")
  assert.equal(chairs.style.bottom, "0")
  assert.equal(chairs.style.right, "0")
  assert.match(chairs.style.background, /^url\(data:image\/png;base64,.*\) repeat-x bottom right$/)
  assert.equal(chairs.style.pointerEvents, "none")
  assert.equal(crew.style.position, "fixed")
  assert.ok(Number(crew.style.zIndex) > Number(chairs.style.zIndex))
})

test("returns a cleanup function that removes the crew", () => {
  const cleanup = rowsdower()
  assert.equal(document.body.children.length, 1)

  cleanup()
  assert.equal(document.body.children.length, 0)
})

test("cleanup is safe to call more than once", () => {
  const cleanup = rowsdower()

  cleanup()
  assert.doesNotThrow(cleanup)
})

test("each call mounts an independent crew", () => {
  const first = rowsdower()
  const second = rowsdower()
  assert.equal(document.body.children.length, 2)

  first()
  assert.equal(document.body.children.length, 1)

  second()
  assert.equal(document.body.children.length, 0)
})

test("throws a helpful error without a document or target", () => {
  globalThis.document = undefined
  assert.throws(() => rowsdower(), {
    name: "TypeError",
    message: /needs a target element/,
  })
})

test("images are inline PNG data URIs", () => {
  rowsdower()

  const [chairs] = document.body.children
  const [crew] = chairs.children
  const chairSrc = chairs.style.background.match(/^url\((.*)\)/)[1]

  for (const src of [chairSrc, crew.src]) {
    assert.match(src, pngDataUri)
    const bytes = Buffer.from(src.split(",")[1], "base64")
    assert.deepEqual([...bytes.subarray(1, 4)], [0x50, 0x4e, 0x47]) // "PNG"
  }
})

test("explains how to unwrap a jQuery object", () => {
  const element = document.createElement("div")
  const $element = { jquery: "3.7.1", 0: element, length: 1, get: () => element }

  assert.throws(() => rowsdower($element), {
    name: "TypeError",
    message: /not a jQuery object.*\.get\(0\)/,
  })
  assert.equal(element.children.length, 0)
})

test("rejects targets that aren't elements, like selector strings", () => {
  assert.throws(() => rowsdower("#theater"), {
    name: "TypeError",
    message: /needs a target element/,
  })
})

test("importing is safe without a DOM, like during server rendering", async () => {
  globalThis.document = undefined
  const module = await import(`../rowsdower.js?ssr=${Date.now()}`)
  assert.equal(typeof module.default, "function")
})

test("require() returns the function itself, for CommonJS", () => {
  const require = createRequire(import.meta.url)
  assert.equal(require("../rowsdower.js"), rowsdower)
})
