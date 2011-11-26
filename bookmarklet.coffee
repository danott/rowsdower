rowsdowered = false
rowsdowerize = () ->
  return if rowsdowered
  head = document.getElementsByTagName('head')[0]
  script = document.createElement('script')
  script.src = 'https://raw.github.com/danott/rowsdower/master/min/rowsdower.js'
  head.appendChild(script)
  rowsdowered = true
rowsdowerize()