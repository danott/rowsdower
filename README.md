# ROWSDOWER!

Zap any page on the internet.

## Why?

The crew of the Satellite of Love deserves a fair shot at any page on the internet.
`rowsdower` appends the iconic silhouette of the crew to any page.

See it in action at **[danott.github.io/rowsdower](https://danott.github.io/rowsdower/)**.

## How?

`rowsdower` is a single file with zero dependencies.

### Browser

```html
<script type="module">
  import rowsdower from "https://unpkg.com/rowsdower"
  rowsdower()
</script>
```

### Plain old script tag

Like it's the good old days. [`rowsdower.global.js`](rowsdower.global.js) sets a global `rowsdower`.
Load it from a CDN, or download it and vendor it.

```html
<script src="https://unpkg.com/rowsdower/rowsdower.global.js"></script>
<script>
  rowsdower()
</script>
```

### npm

```bash
npm install rowsdower
```

```javascript
import rowsdower from "rowsdower"
rowsdower()
```

CommonJS works too:

```javascript
const rowsdower = require("rowsdower")
rowsdower()
```

## Advanced usage

### Appending anywhere

`rowsdower` accepts an optional element to mount the crew into.
It defaults to `document.body`.

```javascript
rowsdower(document.getElementById("some-div"))
```

The crew is `position: fixed`, so give the container a `transform` to keep them inside it.

### Cleanup

`rowsdower()` returns a function that removes the crew. It's safe to call more than once.

That's all any framework needs: call `rowsdower()` when your component mounts, and call the function it returns when it unmounts.
Importing it is safe during server rendering, since it doesn't touch the DOM until you call it.

### Styling

Data attributes present on the elements can be used as css selectors.

```css
[data-rowsdower-chairs] { /* The div of chairs */ }
[data-rowsdower-crew] { /* The img of the crew */ }
```

### Dark mode

The crew is a black silhouette. On a dark page, backlight them:

```css
@media (prefers-color-scheme: dark) {
  [data-rowsdower-chairs] {
    filter: drop-shadow(0 0 1px rgb(255 255 255 / 0.9))
      drop-shadow(0 0 10px rgb(255 240 210 / 0.5));
  }
}
```

## Wait, what?

"Rowsdower" is a reference to "Zap Rowsdower", the protagonist of [The Final Sacrifice][].
The Final Sacrifice was experiment #910 of [Mystery Science Theater 3000][].

I really enjoy Mystery Science Theater 3000.
I used to have a sticker of the crew on my guitar.
I wanted it on my websites, too.

[The Final Sacrifice]: https://en.wikipedia.org/wiki/The_Final_Sacrifice
[Mystery Science Theater 3000]: https://mst3k.com

## Development

There's nothing to install. You'll need Node 20.19 or 22.12 and newer.

```bash
npm test       # run the tests
npm run build  # regenerate rowsdower.global.js from rowsdower.js
npm run docs   # preview the docs at http://localhost:8000
```

`rowsdower.global.js` is generated, but committed so it can be vendored straight from GitHub.
Edit `rowsdower.js`, then run `npm run build`.
The tests fail if the two are out of sync.

The docs in `docs/` deploy to GitHub Pages on every push to `main`.
