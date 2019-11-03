# ROWSDOWER!

Zap any page on the internet.

## Why?

The crew of the Satellite of Love deserves a fair shot at any page on the internet.
`rowsdower` appends the iconic silhouette of the crew to any page.

## How?

### Browser

```html
<script src="https://unpkg.com/rowsdower"></script>
<script>
  rowsdower()
</script>
```

### Webpack

```bash
npm add rowsdower
```

```javascript
var rowsdower = require("rowsdower")
rowsdower()
```

## Advanced usage

### Appending anywhere

`rowsdower` accepts an optional argument to specificy where the crew should be mounted.
It defaults to `document.body`.

```javascript
rowsdower(document.getElementById('some-div'))
```

### Cleanup

`rowsdower()` returns a function to remove the element from the target.
This can be combined with tools like React to append and remove the element programatically.

```javascript
function useRowsdower(visible = true) {
  React.useEffect(() => {
    if (visible) return rowsdower()
  }, [visible])
}
```

### Styling

Data attributes present on the elements can be used as css selectors.

```css
[data-rowsdower-chairs] { /* The div of chairs */ }
[data-rowsdower-crew] { /* The img of the crew */ }
```

## Wait, what?

"Rowsdower" is a reference to "Zap Rowsdower", the protagonist of [The Final Sacrifice][].
The Final Sacrifice was experiment #910 of [Mystery Science Theater 3000][].

I really enjoy Mystery Science Theater 3000.
I used to have a sticker of the crew on my guitar.
I wanted it on my websites, too.

[The Final Sacrifice]: https://en.wikipedia.org/wiki/The_Final_Sacrifice
[Mystery Science Theater 3000]: https://mst3k.com