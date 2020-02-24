# Web 性能工具

* [这里](https://progressivetooling.com/)有一个性能优化相关工具的列表
  * [lazysizes, 谷歌 I/O 上推荐的图片懒加载库](https://github.com/aFarkas/lazysizes)

## 本地测试工具

### Chrome DevTools 的 Performance 工具

* 这个[官方文档](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/?hl=zh-cn)介绍了如何使用 Chrome DevTools 进行性能分析.
* 分析得出的时间线火焰图上的名词可以参照[这里](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference?hl=zh-cn)的解释
  * 深蓝: Loading
    * Parse HTML(DOM 树构建)
    * Parse Stylesheet(CSSOM 构建? 貌似新版工具才有的)
    * Send Request
    * Receive Response
    * Receive Data
    * Finish Loading
  * 深黄: Scripting
  * 深紫: Rendering
    * Recalculate style
    * Layout
  * 深绿: Painting
    * Paint
    * Composite Layers
* 选择 [Disable JavaScript samples](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#disable-js-samples), 后将不显示详细的调用栈
* 可以[借助 Shift 的帮助](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#select)来详细分析每一段的时间长短
* Enable JavaScript samples 状态下时间线火焰图里相同的浅色代表了执行的 JS 函数属于相同的文件

### Lighthouse

[Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=zh-cn) 是一个开源的自动化工具, 从更倾向于用户的感知(users perception)的角度帮助改进网络应用的质量. Chrome 60 后已经默认加在在 audits 标签里了, [这篇](https://developers.google.com/web/updates/2018/05/lighthouse)18年5月的文章介绍了一些3.0新增的功能. 如果 Chrome 端一直显示在 `warming up...` 有可能是需要翻墙...

Lighthouse 同时也可以[跑在 handless(无 UI界面)](https://github.com/GoogleChrome/lighthouse/blob/master/docs/headless-chrome.md)环境下, 我们可以方便的根据它跑出的 JSON 结果[生成 HTML 报告文件](https://github.com/GoogleChrome/lighthouse/blob/master/docs/hacking-tips.md#iterating-on-the-report)

[Pageseed Insights](https://developers.google.com/speed/pagespeed/insights/) 提供了网页版的 Lighthouse

#### 重要指标

* [First Meaningful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint): FMP, 首次有效绘制时间, 可确定用户感觉到页面主要内容处于可见状态的时间. 这篇[文章](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view?hl=zh-cn)介绍了这个时间点的计算逻辑. 大致就是紧跟着 "最大布局变化" 之后的渲染时间点, 但是在长页面, 有字体加载的情况下也会有另外的考虑
* [Time to Interative](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive): TTI, 可交互时间

## RUM(真实用户监测) API

### 基本事件

* onDOMContentLoaded
* onLoad

### Page lifecycle

* DOMContentLoaded, load 和 Page Lifecycle API 没有必然联系
* beforeunload 只应被用来提示用户有为存储信息
  * [`beforeunload`在iOS里不支持](https://stackoverflow.com/questions/3239834/window-onbeforeunload-not-working-on-the-ipad)
* `chrome://discards/`: 当前页面状态
![Page Lifecycle API](https://developers.google.com/web/updates/images/2018/07/page-lifecycle-api-state-event-flow.png)

### PerformancePaintTiming API

[Paint Timing](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformancePaintTiming) API 可以提供 FP 和 FCP 的值, 但提供不了 FMP

### Navigation Timing API

* [performance.timing(已废弃)](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
  * domInteractive 表示 DOM 树准备就绪的时间点. (DOM tree ready)
  * domContentLoaded 事件通常表示 DOM 和 CSSOM 均准备就绪的时间点, 之后就可以开始构建渲染树了
    * 如果没有阻塞解析器的 JavaScript(sync 和 defer), 则 DOMContentLoaded 将在 domInteractive 后立即触发(此时 CSSOM 是有可能还没解析完毕的)
  * domComplete 表示网页及其所有子资源都准备就绪(包括图片资源)的时间点。从这里开始浏览器右上角的菊花将会停止
  * loadEvent: domComplete 后会立即触发, 作为每个网页加载的最后一步，浏览器会触发 onload 事件，以便触发额外的应用逻辑。
* `performance.getEntriesByType("resource")`: 获取所有加载资源的 performance
![timing-overview](https://www.w3.org/TR/navigation-timing/timing-overview.png)

> [大前端时代前端监控的最佳实践 by holden(六猴)](https://zhuanlan.zhihu.com/p/38368337)
