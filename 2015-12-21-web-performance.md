# Web 性能优化思路

## 性能指标

[RAIL](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn) 是一种以用户为中心的性能模型

* Response: 在100ms内响应用户的点击, 输入等操作.
  * 对于需要超过500ms才能完成的操作, 应该提供反馈.
* Animation: 每个帧的渲染时间小于16ms(每秒60帧).
  * 因为还要留给浏览器渲染的时间, 留给 JS 运行时间大概只有10ms.
* Idle: 最大程度利用空闲时间加载非首屏数据, 并且保证每50ms可以将控制权返回给主线程, 从而保证及时响应用户下一步的操作.
* Load: 加载页面在1000ms内呈现内容.
* [延迟与用户反应之间的关系](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn#%E4%BB%A5%E7%94%A8%E6%88%B7%E4%B8%BA%E4%B8%AD%E5%BF%83)

## 优化思路

### 资源

* 压缩
  * Gzip
  * br(Brotli)
* JS Uglify, minify
  * 使用 Tree Shaking 排除没有使用的导入模块
  * webpack-bundle-analyzer
  * webpack-libs-optimization
* 图像优化
  * WebP
* 字体, 视频优化

### 加载

* [PRPL 模式](https://web.dev/apply-instant-loading-with-prpl/)
  * Push (or preload) the most important resources.(首屏加载前)
  * Render the initial route as soon as possible.(首屏加载)
  * Pre-cache remaining assets.(为下一个场景做准备)
  * Lazy load other routes and non-critical assets.(不是关键的资源延迟加载)
* JS 分包
  * 大于 30KB 的 async/defer 文件可以触发 [V8 Script Streaming](https://v8.dev/blog/cost-of-javascript-2019)
  * 有利于 HTTP2 的多路复用
* 活用 async script, 尽量异步加载非首次渲染需要的资源
* 活用 defer script, 提前 first paint 的时间点
* 缓存策略
  * [HTTP 缓存](2016-02-24-http-cache.md)
  * Service Worker
  * Local Storage 的[野路子](https://imququ.com/post/summary-of-my-blog-optimization.html)
* 优化入口文件大小
  * TCP 的 first roundtrip 只能发 10 个 TCP packets(大概是14KB)
* 使用 `<link rel="preload" />`, `<link rel="dns-prefetch" >`
  * preload-webpack-plugin
* 首屏渲染需要外部 JS, CSS, 应该尽可能的放到 HTML 文档上方(Header)以便尽早发出请求
  * CSS 会阻塞 JS, 所以 CSS 应该放在更前面
* [这里](https://csswizardry.com/2018/11/css-and-network-performance/) 介绍了一些到 2018 年为止 CSS 应该怎么放置的策略
  * 避免 `@import css`, 因为这些都不能并行下载
  * [首屏不需要的 CSS 可以放到 BODY 里](https://docs.google.com/presentation/d/1D4foHkE0VQdhcA5_hiesl8JhEGeTDRrQR4gipfJ8z7Y/present?slide=id.g1d760124ab_0_6)

### 渲染

* 避免不必要的重排, 重绘
  * 慎重使用会[产生重排, 重绘的方法](2018-03-22-web-render.md)
  * 避免强制同步布局(修改后马上查询), 浏览器本不需要在每次查询的时候就马上就去重排的
  * [避免布局抖动(循环内反复获取和修改)](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
    * 可以使用[FastDOM](https://github.com/wilsonpage/fastdom) 批处理 DOM 的读取和写入
  * 可以单独创建新的合成器层(但是不要创建太多了, 耗内存)
    * `will-change` 可以做到, 并提前警示浏览器即将出现更改
    * `transform: translateZ(0)` 在旧浏览器里也可以做到
* Flexbox 要好于浮动布局
* 避免复杂的 CSS 选择器
  * `:nth-last-child` 这种要慎用

### JS 执行

* 对于大型任务
  * 特别大的, 没有 DOM 操作的, 可以考虑 Web Worker
  * 活用几个异步的回调函数将大型任务分割
    * requestAnimationFrame 保证 JavaScript 在帧开始时(Safari 为帧结束)运行, 这个对于实现动画效果很有帮助(cocos 的每一帧都是在 RAF 回调内的)
    * requestIdleCallback 在浏览器空闲的时候执行(貌似 safari 还不支持)
* 慎用微优化(忽略 JS 方法间的性能差距, 因为大部分时候他们微乎其微...)
* 活用防抖动和节流阀
  * 防抖: `Debounce` 触发事件后 n 秒内函数只会执行一次, 如果 n 秒内事件再次被触发则重新计时
    * 用于搜索联想词, 用户的频繁点赞操作, resize(只执行最后一次就可以了)

    ```javascript
    const debounce = function(fn, idle) {
      let last;
      return function() {
        // 每次触发事件时都取消之前的延时调用方法
        clearTimeout(last);
        last = setTimeout(() => {
          fn.apply(this, arguments);
        }, idle)
      };
    }
    ```

  * 节流: `throttle` 在 n 秒内只会执行一次，若果有多次则忽略后面的
    * 类似 RAF
    * 可以用于 loadmore 的实现

    ```javascript
    const throttle = function(fn, delay) {
      let timer = null;
      return function() {
        // 每次触发事件时都判断当前是否有等待执行的延时函数, 如果有则不执行
        if(!timer) {
          timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
          }, delay);
        }
      };
    }
    ```

### 工程角度

* 为不同的环境配置不同的策略
  * `navigator.connection.effectiveType` 可以更准确的检测当前网络环境, Chrome 62 开始支持
* 学习 Github 是怎么通过[增量解耦](https://github.blog/2018-09-06-removing-jquery-from-github-frontend/), 慢慢减少相关方法的调用, 移除 jQuery 的

### 汇总建议

* [PageSpeed 规则和建议](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations?hl=zh-cn)
* [The Runtime Performance Checklist by Paul Lewis](https://calendar.perfplanet.com/2013/the-runtime-performance-checklist/)

> [2019 前端性能优化年度总结 by Vitaly Friedman](https://iangeli.com/2019/02/13/2019-%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E5%B9%B4%E5%BA%A6%E6%80%BB%E7%BB%93.html)
>
> [优化内容效率 in Web Fundamentals](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency)
>
> [毫秒必争，前端网页性能最佳实践 - 微软互联网开发支持 - 博客园](http://www.cnblogs.com/developersupport/p/webpage-performance-best-practices.html)
>
> [Web performance made easy (Google I/O '18)](https://www.youtube.com/watch?v=Mv-l3-tJgGk)
>
> [防抖、节流](http://alloween.top/2018/04/16/%E9%98%B2%E6%8A%96%E3%80%81%E8%8A%82%E6%B5%81/)
