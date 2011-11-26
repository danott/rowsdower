# ROWSDOWER!

Add some zap to any page on the internet.

## Script Tag Version

    <script src="https://raw.github.com/danott/rowsdower/master/min/rowsdower.js" type="text/javascript"></script>

## Bookmarklet Version

There is also a bookmarklet version.

    <a href='javascript:var rowsdowered,rowsdowerize;rowsdowered=!1;rowsdowerize=function(){var a,b;if(rowsdowered)return;a=document.getElementsByTagName("head")[0];b=document.createElement("script");b.src="https://raw.github.com/danott/rowsdower/master/min/rowsdower.js";a.appendChild(b);return rowsdowered=!0};rowsdowerize();'>Rowdower!</a>

A draggable link can be found [here](http://danott.us/notes/show/rowsdower).

## Thanks

- Thanks to [CodeKit](http://incident57.com/codekit/) for making working with and compiling CoffeeScript a breeze.
- Thanks to [MST3K](http://www.mst3k.com/) for giving us entertainment we enjoy so much.
- Thanks to [StackOverflow](http://stackoverflow.com/) for answering random questions along the way.