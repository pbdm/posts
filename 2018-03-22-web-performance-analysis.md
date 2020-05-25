# Web 性能分析

在成熟的前端工程体系中, 前端性能监控往往是重要的一环, 有了性能监控, 业务方就可以根据具体的数据持续优化自己的页面, 从而提高用户体验.

## 性能指标

### [RAIL 模型](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn#%E4%BB%A5%E7%94%A8%E6%88%B7%E4%B8%BA%E4%B8%AD%E5%BF%83)

由 Google 提出, 包含以用户为中心的4个性能指标: 

* Response: 在100ms内响应用户的点击, 输入等操作. 对于需要超过500ms才能完成的操作, 应该提供反馈.
* Animation: 每个帧的渲染时间小于16ms(每秒60帧). 因为还要留给浏览器渲染的时间, 留给 JS 运行时间大概只有10ms.
* Idle: 保证每50ms可以将控制权返回给主线程,  从而保证及时响应用户下一步的操作.
* Load: 加载页面在1000ms内呈现内容.

### [重要指标](https://web.dev/metrics/)

* [Largest Contentful Paint](https://web.dev/lcp/):  LCP, 在 Lighthouse 6.0 版本后替代了 FMP. 在有骨架屏的情况下比 FMP 更能体现用户体验
* [~~First Meaningful Paint~~](https://web.dev/first-meaningful-paint/), 首次有效绘制时间, 可确定用户感觉到页面主要内容处于可见状态的时间. 这篇[Google 的文章](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view?hl=zh-cn)介绍了这个时间点的计算逻辑. 大致就是紧跟着 "最大布局变化" 之后的渲染时间点, 但是在长页面, 有字体加载的情况下也会有另外的考虑
* [Time to Interative](https://web.dev/interactive/): TTI, 首次可交互时间

## 获取方式

性能指标的获取方式主要分为两种: RUM(Real User Monitoring, 真实用户监控) 和通过本地工具分析, 两种方法往往是相辅相成的

### RUM(Real User Monitoring, 真实用户监控)

最原始的方式是考察 `onload` 和 `DOMContentLoaded` 的时间. 但是站在用户的角度这两个指标是无法准确的定义真正的用户感受的. 比如现在市面上常用的 SPA 方案, 一般情况下白屏往往需要在 JS 逻辑执行后才有可能消失, 如果仅关注`DOMContentLoaded`将没有很大的意义.

Web 标准还提供了一系列的用于获取性能数据的接口挂在 `window.performance` 对象上.

最初的方式是通过 `performance.timing `获取 [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming) 的数据, 这里的数据都是绝对的 **UNIX 时间戳**, 这种方式在很长的时间内被广泛使用, 其中主要数据有:

* domInteractive:  表示 DOM 树准备就绪的时间点. (DOM tree ready)
* domContentLoaded: 通常表示 DOM 和 CSSOM 均准备就绪的时间点, 之后就可以开始构建渲染树了
  * 如果没有阻塞解析器的 JavaScript(sync 和 defer), 则 DOMContentLoaded 将在 domInteractive 后立即触发(此时 CSSOM 是有可能还没解析完毕的)
* domComplete 表示网页及其所有子资源都准备就绪(包括图片资源)的时间点。从这里开始浏览器右上角的菊花将会停止
* loadEvent: domComplete 后会立即触发, 作为每个网页加载的最后一步，浏览器会触发 onload 事件，以便触发额外的应用逻辑.

下面的图展示了我们可以通过这个 API 获取哪些数据

![timing-overview](https://www.w3.org/TR/navigation-timing/timing-overview.png)

根据 [Performance Timeline Level 2](https://developer.mozilla.org/en-US/docs/Web/API/Performance_Timeline) , 我们拥有了更强大的 API, 随着时间的推移, 这些 API 在浏览器上也基本实现了, 我们可以通过 `performance.getEntries()` 获取所有的信息, 也可以通过  ``performance.getEntriesByType('type')`获取各种单一类别信息, 比如: 

* 通过 `performance.getEntriesByType('navigation')` 获取更页面的 [PerformanceNavigationTiming](https://developer.mozilla.org/docs/Web/API/PerformanceNavigationTiming) 指标([Chrome 57后开始支持](https://caniuse.com/#feat=mdn-api_performancenavigationtiming))
* 通过 `performance.getEntriesByType('resource')` 获取页面内某个资源的 [PerformanceResourceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceResourceTiming) 指标([Chrome 43 后开始支持](https://caniuse.com/#search=PerformanceResourceTiming) )
* 通过 `performance.getEntriesByType('paint')` 获取 First Paint 和 First Contenful Paint 的 [PerformancePaintTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformancePaintTiming)指标([Chrome 60 后开始支持](https://caniuse.com/#search=PerformancePaintTiming))
* 通过 `performance.getEntriesByType('longtask')` 耗时任务 [PerformanceLongTaskTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming) 指标(Chrome 58 后开始支持, 并暂时只有 Chrome 支持)
* 通过 `performance.timeOrigin`, `performance.now()`, `performance.mark()`, `performance.measure()` 这一套 API 自定义的获取页面渲染到某个阶段的指标, 比如接口请求完成, 组件加载完成

[这里](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/entryType)列举了所有 type 的列表. 需要注意的是, 和这些指标的数值都是**相对时间**.

同时我们还可以在上报环节使用 [PerformanceObserver API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) 来监听新产生的性能数据(Chrome 52后开始陆续支持), 并且通过 `PerformanceObserver.supportedEntryTypes` 得到当前浏览器可以得到的 [custom metrics](https://web.dev/custom-metrics/)

```javascript
function fn(list) { 
	// Process the "measure" event
  // 处理 "measure" 事件 
} 
var observer = new PerformanceObserver(fn); 
observer.observe({entryTypes: ["measure"]});
```

### 本地工具

#### Chrome DevTools 的 Performance 工具

在 Chrome Devtools 我们可以找到一个 Performance 的面板, 这个[官方文档](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/?hl=zh-cn)介绍如何使用他生成火焰图并分析性能. 分析得出的时间线火焰图上的名词可以参照[这里](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference?hl=zh-cn)的解释: 

* 深蓝: Loading
  * Parse HTML(DOM 树构建)
  * Parse Stylesheet(CSSOM 构建, 新版工具才有)
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

一些技巧: 

* Enable JavaScript samples 状态下时间线火焰图里相同的浅色代表了执行的 JS 函数属于相同的文件, 选择 [Disable JavaScript samples](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#disable-js-samples), 后将不显示详细的调用栈

* [借助 Shift 的帮助](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#select)来详细分析每一段的时间长短

#### Lighthouse

[Lighthouse](https://developers.google.com/web/tools/lighthouse/?hl=zh-cn) 是一个开源的自动化工具, 从更倾向于用户的感知(users perception)的角度帮助改进网络应用的质量. Chrome 60 后已经默认加在在 audits 标签里了. 我们可以从[官方文档](https://web.dev/learn/#lighthouse)找到他的介绍

![](https://developers.google.com/web/tools/lighthouse/images/report.png?hl=zh-cn)

从上图我们可以看到, Lighthouse 的分析可以得出很多重要指标, 并根据这些指标给页面打分, 同时给出一定的优化措施

> Tips: 如果在分析的过程中一直显示 `warming up...` 有可能是需要翻墙 

Lighthouse 同时也可以[跑在 handless(无 UI界面)](https://github.com/GoogleChrome/lighthouse/blob/master/docs/headless-chrome.md)环境下, 我们可以方便的根据它跑出的 JSON 结果[生成 HTML 报告文件](https://github.com/GoogleChrome/lighthouse/blob/master/docs/hacking-tips.md#iterating-on-the-report). [Pageseed Insights](https://developers.google.com/speed/pagespeed/insights/) 就是根据这个部署的

## [白屏检测](2020-05-21-white-screen.md)

> [Progressive Tooling: 一个性能优化相关工具的列表](https://progressivetooling.com/)
>
> [蚂蚁金服如何把前端性能监控做到极致 by 杨森](https://www.infoq.cn/article/Dxa8aM44oz*Lukk5Ufhy)
>
> [大前端时代前端监控的最佳实践 by holden(六猴)](https://zhuanlan.zhihu.com/p/38368337)
