// Show the source of each live example right below it, so the docs can't drift from the code.
for (const example of document.querySelectorAll("[data-example]")) {
  const lines = example.textContent.replace(/^\n+|\s+$/g, "").split("\n")
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length))
  const source = lines.map((l) => l.slice(indent)).join("\n")

  const pre = document.createElement("pre")
  const code = pre.appendChild(document.createElement("code"))
  code.textContent = source
  example.closest("figure").append(pre)
}
