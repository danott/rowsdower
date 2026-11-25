// A tiny stand-in for the DOM: just enough of it for rowsdower to run.
export class FakeElement {
  constructor(tagName, ownerDocument) {
    this.tagName = tagName.toUpperCase()
    this.ownerDocument = ownerDocument
    this.dataset = {}
    this.style = {}
    this.children = []
    this.parentNode = null
  }
  append(child) {
    child.remove()
    child.parentNode = this
    this.children.push(child)
  }
  remove() {
    if (!this.parentNode) return
    const siblings = this.parentNode.children
    siblings.splice(siblings.indexOf(this), 1)
    this.parentNode = null
  }
}

export class FakeDocument {
  constructor() {
    this.body = this.createElement("body")
  }
  createElement(tagName) {
    return new FakeElement(tagName, this)
  }
}
