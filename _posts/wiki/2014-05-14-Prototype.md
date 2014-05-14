---
layout: wiki
published: true
category: wiki
---

##[阻止超链接跳转](http://stackoverflow.com/questions/1399613/disable-link-with-the-prototype-observe-method)
```javascript
$('link').observe('click', function(e) { e.stop(); });
```