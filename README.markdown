ROWSDOWER!

Add some zap to any page on the internet with jQuery. After jQuery is available on the page, simply include this script via:

    <script src="https://raw.github.com/danott/rowsdower/master/min/rowsdower.js" type="text/javascript"></script>

Or use this bookmarklet by dragging it into your bookmarks bar.

<a href='javascript:var rowsdowered,rowsdowerize;rowsdowered=!1;rowsdowerize=function(){var a,b;if(rowsdowered===!0)return;a=document.getElementsByTagName("head")[0];b=document.createElement("script");b.src="https://raw.github.com/danott/rowsdower/master/min/rowsdower.js";a.appendChild(b);return rowsdowered=!0};rowsdowerize();'>Rowsdower!</a>