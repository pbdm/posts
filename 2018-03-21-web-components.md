# Web Components

[Web Components 官网](https://www.webcomponents.org)

2019.7: API 变化很频繁, 2020.2(Chrome80) 版本将[移除 v0 API](https://developers.google.com/web/updates/2019/07/web-components-time-to-upgrade)

[Web Component v1 polyfills](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs)

[Polymer](https://www.polymer-project.org/) 是基于 Web Components 的

通过一种标准化的非侵入的方式封装自定义的可重用组件, 包含以下四个 Web 标准:

## Custom Elements

* [WHATWG 标准](https://html.spec.whatwg.org/multipage/custom-elements.html)

* 在文档中可以自定义元素名称
* 名称中间必须包含 `-`, 否则就成了 HTMLUnknownElement

```javascript
// Custom Elements vs HTMLUnknownElement
// https://developers.google.com/web/fundamentals/web-components/customelements#details
document.createElement('username') instanceof HTMLUnknownElement;  // true
document.createElement('user-name') instanceof HTMLUnknownElement; // false
document.createElement('div') instanceof HTMLDivElement; // true
document.createElement('span') instanceof HTMLSpanElement; // true
```

* API 主要为 [customElements.define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)
* 生命周期函数: `connectedCallback`, `disconnectedCallback`, `adoptedCallback`, `attributeChangedCallback`
* 通信
  * 通过组件的 setter, getter, 以及 dispatchEvent, addEventListener 可以实现通信
  * 元素可通过定义 `attributeChangedCallback` 来对属性的更改作出响应. 对于 `observedAttributes` 数组中列出的每一属性更改, 浏览器都将调用此方法
* [Custom Elements Everywhere](https://custom-elements-everywhere.com/): 各大框架对 Custom Elements 的支持程度

## Shadow DOM

* [W3C 标准](https://w3c.github.io/webcomponents/spec/shadow/)
* 保证了组件和样式的独立封装性
* [attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) API
* [shadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) API

## ES Modules

* [WHATWG 标准](https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system)
* 用于在 HTML 文档中 引入 Custom Elements，保证了组件的重用
* 代替了 Webkit 列为[不考虑](https://webkit.org/status/#feature-html-imports)实现的范畴的 [HTML imports](https://w3c.github.io/webcomponents/spec/imports/)(当时 Webkit 不考虑的时候还以为 Web Components 完了, 现在看来并不是...)

## HTML Template

* [whatwg 标准](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
* 即 `<template>` 元素, 他在页面加载时并不渲染，但是可以在运行时使用 Javascript 进行实例化

> [Web Components in Google Web Fundamentals](https://developers.google.com/web/fundamentals/web-components)
>
> [Web Components 可用性调研](http://harttle.land/2017/02/08/web-components-survey.html)
>
> [HTMLUnknownElement与HTML5自定义元素的故事 by 张鑫旭](http://www.zhangxinxu.com/wordpress/2018/03/htmlunknownelement-html5-custom-elements/)
