$(document).ready ->

  DUDERS = 'data:image/png;base64,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'
  SEATS = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAATCAYAAABbV8lLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFOSURBVHja7NmxLwNRAMfxT0s6mEgMIiwGf4CB2cZmMBgNRn+AyW7wJxgMBlMXm0FIEBEJERESk4SIySBVFMs1aYRG0971et43+S03vLy87/3evbvLSY5ZTGMQebxEKUg3hWi+ovne4RgHuPYPmUERN3hCpSafGcwz7rGPJfRkTegQVnCFUoZF/jVvuMUqujtZ7Bx2g9C6qeA8kt0xTOEhiG04ZWykXe5JENt0o0uYT5vYtejZEuS2JiVspkluKUiJ5TDWdsnLobWxb9k77ZK7GB0Mgoj4JV8kLXcgyE1ccjEOkV2/XL9En0BS5DCCYWy1euCf5I7WfH8NJMcrJnAal+BDjAe5beWjzs7aMPlvh6qxIDcVnMXR4Ef0h7XNVourbd1Gb1jX1JBv1atTtcFl6f/x/h9bPIm9Zu+UI7yH9Uxli9ebHGPhCwAA//8DABhjQbQ4OQ6DAAAAAElFTkSuQmCC'

  ZAPSTYLE = 
    'backgroundImage' : 'url(' + SEATS + ')'
    'backgroundRepeat': 'repeat-x'
    'backgroundPosition': 'bottom right'
    'width': '100%'
    'height': 146
    'textAlign': 'right'
    'position': 'fixed'
    'bottom': 0
    'right': 0
    'zIndex': 999

  $('<div id="ZAP_ROWSDOWER"><img src="' + DUDERS + '">').css(ZAPSTYLE).appendTo('body')
