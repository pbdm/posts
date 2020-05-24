# 白屏检测

通过浏览器默认提供的接口, 很难检测到真正用户体验到的白屏时间. 因此我们需要更为准备的指标

## [First Contentful Paint (FCP)](https://web.dev/fcp/)

如果一开始渲染的只是很小一部分(比如一个 Loading 条), 参考价值不大

## [First Meaningful Paint(FMP)](https://web.dev/first-meaningful-paint/)

Google 专门写了一篇[文章](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view#heading=h.ycg9fbz776q3)介绍了他的计方式, 大致意思就是紧跟着 "最大布局变化" 之后的渲染时间点. 我们可以基于`MutationObserver` 监听 DOM 变化. 但是他也有很多不准确的情况: 

* Web 字体用得比较多时候
* 长页面的情况
* 如果页面有骨架屏, 那加载骨架屏的时间点其实变化的不多, 但是也已经不是白屏了

因此, 我们又有了下面的 LCP 指标

## [Largest Contentful Paint(LCP)](https://web.dev/lcp/)

代表了页面在 Viewport 内绘制面积最大的时间点. Chrome 提供了默认的 API, 但是 API 适用性不高, 只有最近几个 Chrome 版本开始支持

```javascript
// chrome 实现了一个不是标准的方法检测 Largest Contentful Paint
const observer = new PerformanceObserver((entryList) => {
  // 这里会在每次谷歌认为是 contentful paint 的时候执行, entries 里包含了该次 paint 的 size
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  const lcp = lastEntry.renderTime || lastEntry.loadTime;
  console.log('LCP:', lcp)
});
observer.observe({entryTypes: ['largest-contentful-paint']});
```

>  [Largest Contentful Paint by berwin](https://github.com/berwin/Blog/issues/47)
>
> [捕获FMP的原理 by berwin](https://github.com/berwin/Blog/issues/42)