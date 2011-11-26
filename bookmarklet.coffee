rowsdowered = false
rowsdowerize = () ->
  return if rowsdowered is true
  head = document.getElementsByTagName('head')[0]

  unless jQuery?
    script = document.createElement('script')
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js'
    
  script = document.createElement('script')
  script.src = 'https://raw.github.com/danott/rowsdower/master/min/rowsdower.js'
  head.appendChild(script)
  rowsdowered = true
rowsdowerize()