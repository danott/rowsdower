// A tiny stand-in for the DOM: just enough of it for rowsdower to run.
export class FakeElement {
  constructor(tagName, ownerDocument) {
    this.tagName = tagName.toUpperCase()
    this.ownerDocument = ownerDocument
    this.attributes = {}
    this.style = {}
    this.children = []
    this.parentNode = null
  }
  setAttribute(name, value) {
    this.attributes[name] = String(value)
  }
  getAttribute(name) {
    return name in this.attributes ? this.attributes[name] : null
  }
  hasAttribute(name) {
    return name in this.attributes
  }
  appendChild(child) {
    if (child.parentNode) child.parentNode.removeChild(child)
    child.parentNode = this
    this.children.push(child)
    return child
  }
  removeChild(child) {
    const index = this.children.indexOf(child)
    if (index === -1) throw new Error("NotFoundError: not a child of this element")
    this.children.splice(index, 1)
    child.parentNode = null
    return child
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
