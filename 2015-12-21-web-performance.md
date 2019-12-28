# 页面性能

[RAIL](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn) 是一种以用户为中心的性能模型

延迟与用户反应

* 0 - 16ms: 人们特别擅长跟踪运动，如果动画不流畅，他们就会对运动心生反感。 用户可以感知每秒渲染 60 帧的平滑动画转场。也就是每帧 16 毫秒（包括浏览器将新帧绘制到屏幕上所需的时间），留给应用大约 10 毫秒的时间来生成一帧。
* 0 - 100ms: 在此时间窗口内响应用户操作，他们会觉得可以立即获得结果。时间再长，操作与反应之间的连接就会中断。
* 100 - 300ms: 用户会遇到轻微可觉察的延迟。
* 300 - 1000ms: 在此范围内，延迟感觉像是任务自然和持续发展的一部分。对于网络上的大多数用户，加载页面或更改视图代表着一个任务。
* 1000ms+: 超过 1 秒，用户的注意力将离开他们正在执行的任务。
* 10000ms+: 用户感到失望，可能会放弃任务；之后他们或许不会再回来。

关键指标:

* 输入延迟时间（从点按到绘制）小于 100 毫秒。
* 每个帧的工作(拖动的持续阶段, 从 JS 到绘制）完成时间小于 16 毫秒。
* 主线程 JS 工作分成不大于 50 毫秒的块。
* 加载页面可以在 1000 毫秒内就绪。

[PageSpeed 规则和建议](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations?hl=zh-cn)

## [加载](2018-03-22-web-load.md)

## [渲染](2018-03-22-web-render.md)

## 工具

* [A list of community-built, third-party tools that can be used to improve page performance](https://progressivetooling.com/)
  * [lazysizes, 谷歌 I/O 上推荐的图片懒加载库](https://github.com/aFarkas/lazysizes)

### Chrome dev tools

* [Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/?hl=zh-cn)
  * [时间线事件参考](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference?hl=zh-cn)
  * [Disable JavaScript samples(不显示详细的调用栈)](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#disable-js-samples)
  * [When analyzing a section like Network or Main, sometimes you need a more precise estimate of how long certain events took. Hold Shift, click and hold, and drag left or right to select a portion of the recording. At the bottom of your selection, DevTools shows how long that portion took(详细分析每一段的时间长短)](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#select)
  * Javascript samples enabled 情况下, 火焰图下不同的浅色代表了执行的函数属于不同的 js 文件
  * 深黄色的一般都是原生调用方法(scripting activity)?!
  * 颜色:
    * 深蓝: parsing(html)
    * 深黄: scripting(js)
    * 深紫: rendering(css)
    * 深绿: painting(大部分image?!)
* [优化措施](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/)
* [The Runtime Performance Checklist by Paul Lewis](https://calendar.perfplanet.com/2013/the-runtime-performance-checklist/)
  * [做出 layout boundaries, 避免全局的 layout](http://wilsonpage.co.uk/introducing-layout-boundaries/), 可以用这个[工具](https://github.com/paullewis/Boundarizr/)来测试

### Lighthouse

一个开源的自动化工具，用于改进网络应用的质量, 更倾向于用户的感知(users perception)

Chrome 60 后已经默认在 audits 标签里了

It’s an improved “Pagespeed Insights

* [Using Lighthouse To Improve Page Load Performance(介绍了一些3.0的新功能)](https://developers.google.com/web/updates/2018/05/lighthouse)

* First meaningful paint
* [First Interactive](https://developers.google.com/web/tools/lighthouse/audits/first-interactive)
* [Consistently Interactive](https://developers.google.com/web/tools/lighthouse/audits/consistently-interactive)

* [headless use](https://github.com/GoogleChrome/lighthouse/blob/master/docs/headless-chrome.md)
* [根据 json 生成 html](https://github.com/GoogleChrome/lighthouse/blob/master/docs/hacking-tips.md#iterating-on-the-v2-report)

> [使用 Lighthouse 审查网络应用](https://developers.google.com/web/tools/lighthouse/?hl=zh-cn)
>
> [Web performance made easy (Google I/O '18)](https://www.youtube.com/watch?v=Mv-l3-tJgGk)

### Others

* Pagespeed Insights
* [Page speed optimization](https://varvy.com/pagespeed/)

> [大前端时代前端监控的最佳实践 by holden(六猴)](https://zhuanlan.zhihu.com/p/38368337)
>
> [毫秒必争，前端网页性能最佳实践 - 微软互联网开发支持 - 博客园](http://www.cnblogs.com/developersupport/p/webpage-performance-best-practices.html)
>
> [High PerformanceBrowser Networking by ILYA GRIGORIK](https://hpbn.co/)
