class: center, middle

# Puppeteer 简介

---

layout: true

.right[puppeteer 简介]

---

## 简介

* 一个通过 [DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) 控制 Chrome(Chromium) 的 node 库
* 默认使用 chrome 的 [headless](https://developers.google.com/web/updates/2017/04/headless-chrome) 模式

---

![:scale 100%](https://raw.githubusercontent.com/pbdm/img/master/20181218165131.png)

---

### DevTools Protocol

* 操作 Dom, Debugger, 网络相关

![:scale 100%](https://raw.githubusercontent.com/pbdm/img/master/20181219155155.png)

???
sudo /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

```javascript
await Main.sendOverProtocol('Emulation.setDeviceMetricsOverride', {
  mobile: true,
  width: 412,
  height: 732,
  deviceScaleFactor: 2.625,
});
const data = await Main.sendOverProtocol("Page.captureScreenshot");
```

---

## 用法

[try puppeteer](https://try-puppeteer.appspot.com/)

`npm install puppeteer`

```javascript
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.google.com');
console.log(await page.content());
await page.screenshot({path: 'screenshot.png'});
await browser.close();
```

---
为 SPA 页面生成预加载的内容
.left-column[
<div class="mermaid" style="font-size: 12px">
sequenceDiagram
客户端 ->> 服务端: 请求
客户端 ->> 客户端: 执行首屏逻辑
</div>
]
.right-column[
<div class="mermaid" style="font-size: 12px">
sequenceDiagram
服务端 ->> 服务端: 生成骨架图
客户端 ->> 服务端: 请求
客户端 ->> 客户端: 执行首屏逻辑
</div>
]
.center[
<div class="mermaid" style="font-size: 12px">
sequenceDiagram
服务端 ->> 服务端: puppeteer执行首屏逻辑
客户端 ->> 服务端: 请求
客户端 ->> 客户端: 简单渲染
</div>
]

???
> [an answer to server-side rendering JS sites](https://developers.google.com/web/tools/puppeteer/articles/ssr)
> [构建时预渲染：网页首帧优化实践 by 美团](https://tech.meituan.com/first_contentful_paint_practice.html)

---

### 自动化测试

![:scale 100%](https://raw.githubusercontent.com/pbdm/img/master/20181219162514.png)

---

### 性能监控

* [tracing](https://github.com/GoogleChrome/puppeteer/blob/v1.11.0/docs/api.md#class-tracing)

```javascript
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.tracing.start({path: 'trace.json'});
await page.goto('https://www.google.com');
await page.tracing.stop();
await browser.close();
```

* [coverage](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage)
* [lighthouse](https://developers.google.com/web/tools/lighthouse/)

???

```javascript
// page.coverage
const pti = require('puppeteer-to-istanbul')
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()
// Enable both JavaScript and CSS coverage
await Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);
// Navigate to page
await page.goto('https://www.google.com');
// Disable both JavaScript and CSS coverage
const [jsCoverage, cssCoverage] = await Promise.all([
  page.coverage.stopJSCoverage(),
  page.coverage.stopCSSCoverage(),
]);
pti.write(jsCoverage)
await browser.close()
```

```cmd
npm i nyc -g
nyc report --reporter=html
```

---

### 其他用途

* 爬虫
* 截屏和生成 PDF
* 文字识别小脚本
* chrome 扩展测试

---

## Reference

* [puppeteer github](https://github.com/GoogleChrome/puppeteer)
* [puppeteer 官网](https://developers.google.com/web/tools/puppeteer/)

---
layout: false
class: center, middle

# 谢谢