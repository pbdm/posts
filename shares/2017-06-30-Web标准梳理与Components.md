# 从 Web 标准到 Web Components

2017-07-05

我们会先梳理一下 Web 标准的制定流程，然后谈谈 Web Components, 再讨论下当前市面上的框架和 Web Components 的关系。

## JS 标准

ECMAScript 是一种由 [Ecma 国际](https://www.ecma-international.org/)通过 [ECMA-262](https://www.ecma-international.org/publications/standards/Ecma-262.htm) 标准化的脚本程序设计语言, Javascript 是这一标准的实现和扩展

ECMAScript 标准发展到现在已经经历了 N 个版本，并且在 [ECMAScript2015](http://www.ecma-international.org/ecma-262/6.0/) ( ES6 ) 这个版本有了很大的改进， 添加了大量新的语言特性, 也是从这个版本开始，他的命名规则开始使用 ECMAScirpt + 年份的形式。

他的定制过程包含了 Stage 0 到 Stage 4 五个阶段。

* Stage0: 开放提交阶段(Strawman)
* Stage1: Proposal
* Stage2: Draft
* Stage3: Canidate
* Stage4: Finished

理论上来标准说只有到了 Stage3 或者 4 才会稳定下来，对现有各个阶段的标准查阅和浏览器支持可以访问[这里](http://kangax.github.io/compat-table/esnext/)。可以看到可怜的 `Decorator` 依然处于 Stage2, 而 `::`更是只在 Stage0 里。

## HTML 标准

现在主要由两个组织制定：[W3C](https://www.w3.org/) 和 [WHATWG](https://whatwg.org/)

对于这两个组织和 html 标准的关系，有段子是这么说的：
> 当年 W3C 嫌自己的儿子HTML没出息，就拿出去扔在河边了，WHATWG路过捡回去养，后来HTML长大了，出息了，W3C又找WHATWG来要儿子，WHATWG好歹也养了三年，不是很同意，但是生父终究是生父啊，于是就共同抚养呗。W3C领HTML回去之后，给HTML取个新名字“HTML5”，但是抚养过程中，W3C想要HTML5当公务员，找个稳定的金饭碗，WHATWG想要HTML5去创业，于是分歧越来越大，最终HTML5精神分裂，一半去给W3C当儿子，一半去给WHATWG当儿子。

W3C: World Wide Web Consortium, 它们的 [Web Platform Working Group](https://www.w3.org/WebPlatform/WG/) (WebPlat WG) 定制的标准叫 [HTML5.*](https://www.w3.org/TR/html/), 制定[步骤](https://www.w3.org/2017/Process-20170301/#recs-and-notes)十分冗长，包括

* First Public Working Draft
* Public Working Drafts
* Candidate Recommendation
* Proposed Recommendation
* W3C Recommendation
* Edited Recommendation

最新的 W3C Recommendation 版本是2016年11月1日发布的[5.1](https://www.w3.org/TR/html51/)版本，最新的 Working Draft 版本是 [5.2](https://www.w3.org/TR/html52/), 但是应该是嫌弃 W3C 太慢了, 他们都被 WHATWG 称为 `snapshot`

WHATWG: Web Hypertext Application Technology Working Group(网页超文本应用技术工作小组), 由 Apple, Mozilla Foundation, Opear SoftWare 在 2004 年创立。他们定制的标准叫 [HTML Living Standard](https://html.spec.whatwg.org/multipage/), 官方原话是
> concerned about the W3C’s direction with XHTML, lack of interest in HTML and apparent disregard for the needs of real-world authors

两者的区别可以看[这里](https://www.w3.org/wiki/HTML/W3C-WHATWG-Differences)和[这里](https://diffofhtmls.herokuapp.com/)。总的来说，W3C 趋于保守和规范，WHATWG 更贴近浏览器的最新实现。

> [What does "Living Standard" mean?](https://wiki.whatwg.org/wiki/FAQ#What_does_.22Living_Standard.22_mean.3F)

## CSS 标准

由 W3C [CSS Working Group](https://www.w3.org/Style/CSS/members) 制定[标准](https://www.w3.org/Style/CSS/current-work)。另外，CSS之父 [Håkon Wium Lie](http://www.wiumlie.no/en) 在 WHATWG 也为我们提供了[CSS Books](https://books.spec.whatwg.org/) 和 [CSS Figures](https://figures.spec.whatwg.org)

> [CSS Books & CSS Figures in blog](https://blog.whatwg.org/css-books-css-figures)

## Web Component

面向未来的组件标准，通过一种标准化的非侵入的方式封装自定义的可重用组件，包含以下四个 Web 标准:

* Custom Elements
  * 在文档中可以自定义元素名称
  * [W3C 标准](https://w3c.github.io/webcomponents/spec/custom/)
  * [WHATWG 标准](https://html.spec.whatwg.org/multipage/custom-elements.html)
* Shadow DOM
  * 保证了组件和样式的独立封装性
  * [W3C 标准](https://w3c.github.io/webcomponents/spec/shadow/)
* HTML imports
  * 用于在 HTML 文档中 引入 Custom Elements，保证了组件的重用
  * [W3C 标准](https://w3c.github.io/webcomponents/spec/imports/)
* HTML Template
  * 即 `<template>` 元素, 他在页面加载时并不渲染，但是可以在运行时使用 Javascript 进行实例化
  * [W3C 标准](https://www.w3.org/TR/html/semantics-scripting.html#the-template-element)
  * [WHATWG 标准](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)

他们在 W3C 中的[状态](https://www.w3.org/TR/#tr_Web_Components)为一个 W3C Recommendation(HTML Template), 3个 Drafts。从浏览器当前的[实现](http://caniuse.com/#search=web%20component)来看，Chrome 很给力啊。虽然其他的平台支持不好，但是我们有 [polyfills](https://github.com/WebComponents/webcomponentsjs), 我们还有有基于 Web Components 的 [Polymer](https://www.polymer-project.org/)

## Web Component Example

在当前文档引用某个已经存在的 Component (HTML imports)

```html
<link rel="import" href="./x-foo.html">
<x-foo></x-foo>
```

定义一个新的 HTML element (Custom Elements)

```javascript
  // Custom Element's name must contain a dash(something like namespace)
  // 2018-03-21: deprecated in favor of customElements.define()
  var XFoo = document.registerElement(
    'x-foo',
    // Custom elements 默认继承了HTMLElement, 所以以下的可以省略
    {
      prototype: Object.create(HTMLElement.prototype)
    }
  );

  // 同时也可以继承已有的 elements, 如 button
  var MegaButton = document.registerElement('mega-button', {
    prototype: Object.create(HTMLButtonElement.prototype),
    extends: 'button'
  });

  // 继承后的元素可以这样使用
  <button is="mega-button">
```

Custom Elements 的 生命周期回调函数

* `createdCallback`: element 新增后
* `attachedCallback`: element 添加到 document 后
* `detachedCallback`: element 从 document 移除后
* `attributeChangedCallback(attrName, oldVal, newVal)`: attribute 修改后

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() { console.log('created')};
proto.attachedCallback = function() { console.log('attached')};
var XFoo = document.registerElement('x-foo', {prototype: proto});
```

一个完整的例子，在生成 Custom Elements 的时候添加 Shadow DOM, 并将提前定义好的 template 插入 Shawod DOM

```html
<template id="tpl">
  <style> div { color: red; } </style>
  <div>tpl</div>
</template>
<script>
  // 获取 template 变量
  var tpl = document.currentScript.ownerDocument.querySelector('#tpl');
  var proto = Object.create(HTMLElement.prototype, {
    attachedCallback: {
      value: function() {
        var clone = document.importNode(tpl.content, true);
        // 添加一个 Shadow Root, 并将 template 的 clone 添加到这个 Shadow Root 上
        this.createShadowRoot().appendChild(clone);
      }
    }
  });
  // 生成 Custom element
  document.registerElement('x-message', {
    prototype: proto
  });
</script>
```

## 微信小程序 与 Web Components

```html
<!-- 定义模版 -->
<template name="msgItem">
  <view>
    <!--模版引擎采用 Mustache-->
    <text> {{index}}: {{msg}} </text>
    <text> Time: {{time}} </text>
  </view>
</template>
<!-- 使用模版 -->
<import src="/components/template/msgItem.wxml"/>
<template is="msgItem" data="{{...item}}"/>
```

* 使用了 Custom Elements, 但是命名并不符合标准(Custom Element's name must contain a dash), 他这里使用了驼峰。。。
* 样式和模版文件需要用自己定义的 `wxss`, `wxml` 这样的特别后缀
* 引用模版的时候并不符合规范 (html imports)
* 无法使用 css 预编译

## Vue.js 与 Web Components

写法有点像，并积极的在往 Web Components 靠, 但仍然在等待标准的完善

> [It is also totally feasible to offer deeper integration between Vue with Web Component specs such as Custom Elements and Shadow DOM style encapsulation - however at this moment we are still waiting for the specs to mature and be widely implemented in all mainstream browsers before making any serious commitments.](https://vuejs.org/v2/guide/comparison.html#Polymer)

## React 与 Web Components

React [声称](https://facebook.github.io/react/docs/web-components.html)分别与 Web Components 解决了不同的问题，Web Component 更侧重于组件的封装和重用，而 React 侧重于数据的同步。我们可以在 Web Components 里使用 React, 也可以在 React 中使用 Web Components。

我们可以把 React 作为 Web Components 的上层框架，在 Web Components 内部用 React 来处理数据的绑定和同步

```javascript
const proto = Object.create(HTMLElement.prototype, {
  attachedCallback: {
    value: function() {
      const mountPoint = document.createElement('span');
      this.createShadowRoot().appendChild(mountPoint);

      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
    }
  }
});
document.registerElement('x-search', {prototype: proto});
```

事实上 JSX 以及 React 的生命周期函数定义已经成为了一套通用的规范，其组件的生态也很完善了(全家桶哈哈哈)。

> [React Integration](https://github.com/webcomponents/react-integration), 号称可以将 Web Components 转化为 React Components

### 小结

Web Components 主要是为了以标准的形式解决前端组件复用的问题, 但是他的标准仍然处于 Draft, 在前端并未广泛使用，且在未来有可能有小幅的修改。比如 Lifecycle callback 里的 `attachedCallback` 与 `detachedCallback` 被替换为了 `connectedCallback` 与 `disconnectedCallback` , 但是 Chrome 貌似实现的还是前者。他属于**未来**，但是对于**未来**的定义是1年，2年，还是3年以上并不可知。。。

另外，Webkit 直接将 HTML imports 列为[不考虑](https://webkit.org/status/#feature-html-imports)实现的范畴。。。

> [Web Components 可用性调研](http://harttle.land/2017/02/08/web-components-survey.html)
>
> [Official Introduction for Web Components](https://www.webcomponents.org/introduction)
>
> [Custom Elements by Eric Bidelman](https://www.html5rocks.com/en/tutorials/webcomponents/customelements/)
