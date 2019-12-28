# CSS 排版

## 普通流

格式化上下文 + 盒 / 文字 = 位置

### 块级盒

排入 BFC (block formatting context, 块级格式化上下文)

* 元素在其内部创建新的 BFC 的触发条件
  * body 根元素
  * 浮动元素
  * position 是 fixed 或 absolute
  * 非块级但仍能包含块级元素的容器 (display 是 table-cell, table-caption, inline-block, flex 或 inline-flex)
  * 块级的能包含块级元素的容器, 且 overflow 为 visible 以外的值(hidden, auto, scroll)
    * 自身为块级, 且 overflow 为 visible 的块级元素容器, 它的块级格式化上下文和外部的块级格式化上下文发生了融合. 也就是说, 如果不考虑盒模型相关的属性, 这样的元素从排版的角度就好像根本不存在

```html
<!-- 如果想要避免外边距的重叠, 可以将其放在不同的 BFC 容器中 -->
<style>
.bfc {
  overflow:hidden;
}
.green {
  height: 200px;
  width: 100px;
  background: green;
  margin: 10px;
}
</style>
<div class="bfc">
  <div class="green"></div>
</div>
<div class="bfc">
  <div class="green"></div>
</div>

<!-- BFC 自己本身不会与浮动盒子叠加(可解决文字环绕效果) -->
<style>
.red-bfc {
  float: left;
  height: 100px;
  background: red;
  width: 100px;
}
.green-bfc {
  height: 200px;
  background: green;
  overflow: hidden;
}
</style>
<div class='red-bfc'></div>
<div class='green-bfc'></div>

<!-- 计算 BFC 的高度时, 浮动元素也参与计算(可以用来清除浮动) -->
<style>
.bfc-border {
  overflow:hidden;
  border: 1px solid red;
}
.green-float {
  height: 200px;
  width: 100px;
  background: green;
  margin: 10px;
  float: right;
}
</style>
<div class='bfc-border'>
  <div class='green-float'></div>
  <div class='green-float'></div>
  <div class='green-float'></div>
</div>
```

### 行内级盒或者文字

Inline formatting context(行内格式化上下文)

首先尝试排入行内级格式化上下文, 如果排不下, 那么创建一个行盒, 先将行盒排版(行盒是块级), 行盒会创建一个行内级格式化上下文.

## 浮动(float)

把盒的顶部跟当前行内级上下文上边缘对齐, 然后根据 float 的方向把盒的对应边缘对到块级格式化上下文的边缘, 之后重排当前行盒.

通俗的理解就是根据浮动的方向尽可能的向左边或右边偏移, 其效果与印刷排版中的文本环绕相似.

## fix 定位

postion: fix/absolute/relative

## Flexbox

根据外部容器决定内部尺寸

这是一个分配剩余空间的游戏

```css
.item {
  // Default is 0 1 auto.
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

* [Flexbox Cheatsheet](https://yoksel.github.io/flex-cheatsheet/)
* [A community-curated list of flexbox issues and cross-browser workarounds for them](https://github.com/philipwalton/flexbugs)
* [A Complete Guide to Flexbox in css-tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Flexbox Defense - 一个 Flexbox 的游戏](http://www.flexboxdefense.com/))

> [Flex 布局 by you-need-to-know-css](https://lhammer.cn/You-need-to-know-css/#/flexbox-layout)
>
> [深入理解css3中的flex-grow、flex-shrink、flex-basis by Zhoonchen](http://zhoon.github.io/css3/2014/08/23/flex.html)
>
> [CSS 布局 in MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout)
>
> [10 分钟理解 BFC 原理 in zhihu by 林东洲](https://zhuanlan.zhihu.com/p/25321647)
