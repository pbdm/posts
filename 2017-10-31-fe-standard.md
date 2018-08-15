# 前端标准

## Organizations

* [whatwg.org(Web Hypertext Application Technology Working Group)](https://whatwg.org/)
* [IETF(The Internet Engineering Task Force)](http://ietf.org/)
* [W3C(World Wide Web Consortium)](https://www.w3.org/)
* [Ecma International](https://www.ecma-international.org/)

## Standard

* [ALL STANDARDS AND DRAFTS in W3C](https://www.w3.org/TR/)
* [WHATWG Standards](https://spec.whatwg.org/)
* [JavaScript(ECMAScript) 语言标准历史及标准制定过程介绍](https://itbilu.com/javascript/js/V1APADgrG.html)
* [HTML Standard - whatwg](https://html.spec.whatwg.org/multipage/)
* [HTML - W3C](https://www.w3.org/TR/html/)
* [HTML Standard - whatwg 中文](https://whatwg-cn.github.io/html/)
* [HTML/W3C-WHATWG-Differences](https://www.w3.org/wiki/HTML/W3C-WHATWG-Differences)
* [CSS SPEC­I­FI­CA­TIONS](https://www.w3.org/Style/CSS/current-work)
* [ES5整理by 颜海镜](http://yanhaijing.com/es5/#about)
* [ECMAScript Language Specification - ECMA-262 Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/)
* [ECMAScript 2015 Language Specification &ndash; ECMA-262 6th Edition](http://www.ecma-international.org/ecma-262/6.0/)
* [ECMAScript® 2016 Language Specification](http://www.ecma-international.org/ecma-262/7.0/index.html)
* [RFC 6265 - HTTP State Management Mechanism (obsoletes RFC 2965)](https://tools.ietf.org/html/rfc6265)
* [Request for Comments (RFC,记录互联网规范、协议、过程等的标准文件)](https://www.ietf.org/rfc.html)
* [RFC Search Page](https://www.rfc-editor.org/search/rfc_search.php)
* [中文 RFC](http://man.chinaunix.net/develop/rfc/default.htm)

## 标准实现状态

* [HTML5 test: how well does your browser support html5?](http://html5test.com/)
* [Can I use... Support tables for HTML5, CSS3, etc](http://caniuse.com/)
  * [X5 Caniuse Tests](http://res.imtt.qq.com/tbs/incoming20160419/home.html)
* [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
* [Node.js ES2015/ES6, ES2016 and ES2017 support](node.green)

* [WebKit Feature Status](https://webkit.org/status/)
* [Chrome Platform Status](https://www.chromestatus.com/features)

## Web browser engine

* [Acid2 测试, 如果渲染正确，浏览器打开Acid2的测试页面则会看到一个笑脸(看起来已过时了, 最新版 Chrome 都没通过这个测试...)](https://zh.wikipedia.org/wiki/Acid2)

### Blink

2013年从 Webkit fork

Blink and Chromium are not really separable anymore, 所以他们的 source code 是在一起的

* [Git repositories on chromium](https://chromium.googlesource.com/)

* [chromium homepage](https://www.chromium.org/Home)
* [chromium For Developers(guide)](http://www.chromium.org/developers)
* [chromium source code](https://chromium.googlesource.com/chromium/src/)(注意, 直接进入的那个貌似已经废弃了...)
  * 注意: 库很大, 需要机器性能很好再 clone.....
* [Getting Around the Chromium Source Code Directory Structure](http://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code)
* [chromium Bug tracker](https://bugs.chromium.org/p/chromium/issues/list)
* [Checking out and building Chromium for Mac](https://chromium.googlesource.com/chromium/src/+/master/docs/mac_build_instructions.md)
* [Chromium Code Search](https://cs.chromium.org/)

* [Blink homepage](https://www.chromium.org/blink)
* [Blink source code](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/)

[blink 源码目录现在还叫webkit](https://groups.google.com/a/chromium.org/forum/#!topic/platform-architecture-dev/DKQn-SILZzo/discussion)

* [v8 source code mirror in github](https://github.com/v8/v8)

### Webkit

* [getting the code](https://webkit.org/getting-the-code/)
* [source code](https://trac.webkit.org/browser/webkit/trunk)
* [source code mirror in github](https://github.com/WebKit/webkit)

### Servo

基于 Rust, mozilla 的实验性项目, 支持并行渲染!! 等着他并入 firefox 的那一天吧... `https://github.com/servo/servo`

## Javascript engine

* V8 — open source, developed by Google, written in C++, used in Chrome(blink) and nodejs
  * JIT
> [How JavaScript works in v8 by Alexander Zlatkov](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)
* JavaScriptCore — open source, marketed as Nitro and developed by Apple for Safari(webkit)
* Chakra - `JScript9` for Internet Explorer and `JavaScript` for Microsoft Edge
* SpiderMonkey — the first JavaScript engine, which back in the days powered Netscape Navigator, and today powers Firefox
* Rhino — managed by the Mozilla Foundation, open source, developed entirely in Java
* KJS — KDE’s engine originally developed by Harri Porten for the KDE project’s Konqueror web browser
* Nashorn - open source as part of OpenJDK, written by Oracle Java Languages and Tool Group
* JerryScript — is a lightweight engine for the Internet of Things

> [web-bugs](https://github.com/webcompat/web-bugs/issues)
