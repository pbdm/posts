# Web 渲染

## 重要指标

### FCP(first contentful paint)

is it happening?

point when the browser renders the first bit of content from the DOM

### 首次有效绘制(FMP(First Meaningful Paint))

is it useful?

Paint that follows biggest layout change(视口内)

可确定用户感觉到页面主要内容处于可见状态的时间

> [Time to First Meaningful Paint: a layout-based approach](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view?hl=zh-cn)

## 像素管道(pixel pipeline)

浏览器绘制的过程由以下5个步骤组成: javascript -> style(样式计算) -> layout布局 -> paint绘制 -> composite合成

其中 layout 和 paint 会根据需要省略
![像素管道](https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg?hl=zh-cn)

### Javascript and Style

![render-tree-construction](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png)

* Parse HTML(show in dev tools): DOM 树构建
* Recalculate Style(show in dev tools): CSSOM 树构建
* DOM 树与 CSSOM 树合并后形成渲染树

### Layout(布局, 排版)

* 在 Firefox 中称为重排(reflow)

常见的触发重排的地方:

* 对“geometric properties(几何属性)”的更改
  * 盒子计算(`clientTop`, `offsetTop`, `getBoundingClientRect`)
  * 滚动(`scrollTo()`, `scrollTop`, `scrollHeight`)
  * 获取焦点(`elem.focus()`)
  * `window.getComputedStyle`(通常会)
  * 计算点击事件位置

* flexbox 可以减少 layout 时间
* 避免强制同步布局(更改样式后马上获取布局值)
* 避免布局抖动(循环内反复获取和修改)

* [FastDOM(自动为您批处理读取和写入)](https://github.com/wilsonpage/fastdom)

> [Alon's Blog](http://jinlong.github.io/2015/09/30/what-forces-layout-reflow/)
>
> [What forces layout / reflow by paulirish](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

### Paint(绘制)

* 除 transform 或 opacity 属性之外，更改任何属性始终都会触发绘制

### Composite(合成)

合成是将页面的已绘制部分放在一起以在屏幕上显示的过程

* `will-change` 可以单独创建新的合成器层(但是不要创建太多了), 并提前警示浏览器即将出现更改
* `transform: translateZ(0)` 旧浏览器里可以用

## 优化 JS 执行

* requestAnimationFrame 保证 JavaScript 在帧开始时运行
* 大型任务分割为微任务( micro-tasks), 并且在每帧的 requestAnimationFrame 处理程序
* 慎用微优化(忽略js 方法间的性能差距, 因为他们微乎其微...)
* requestIdleCallback 在浏览器空闲的时候执行(貌似 safari 还不支持)
* 防抖动和节流阀
  * `throttle` 保证 X 毫秒内有且执行执行一次
  * `Debounce` 把多个顺序地调用合并成一次
  > [实例解析防抖动（Debouncing）和节流阀（Throttling） by Alon's Blog](http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

## 优化 CSS 计算

* `:nth-last-child` 这种要慎用

## 用户输入处理

* 输入的时候避免长时间和样式更改的语句, 使用 requestAnimationFrame

> [CSS Triggers (layout, paint, composite)](https://csstriggers.com/)
>
> [浏览器前端优化 by Alon](http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/)
>
> [浏览器的工作原理 by Tali Garsiel and Paul Irish](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
>
> [LIFE OF A pixel by Steve Kobes:video](https://drive.google.com/file/d/1Ky59m-F79ULs4ydMbD4Mp1dBXvs_eDes/view)
>
> [LIFE OF A pixel by Steve Kobes:slide](https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit#slide=id.p)
>
