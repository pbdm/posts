# 小程序

[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)

[github 上整理的文档](https://github.com/justjavac/awesome-wechat-weapp)

[微信小程序架构解析](https://mp.weixin.qq.com/s/3QE3g0NmaBAi91lbrihhVw)

[微信小程序的开发经验分享](https://mp.weixin.qq.com/s/9PID6UJsQyB06xdyOkEVOA)

## 语法

主要针对与 WEB 标准的不同

* form 表单提交, form 数据放在了 `e.target.detail.value` 里
* target.dataset 为字符串, 微信小程序里为整型

## Runtime

ios: [JavaScriptCore](https://github.com/phoboslab/JavaScriptCore-iOS): WebKit 的 JavaScript 引擎

dev: [nwjs(node-webkit)](https://github.com/nwjs/nw.js/)

## WXS

在 page-frame 中运行的 JS, 最大的用途是一个视图层的 filter. 避免了跨线程通信的开销 ?!?!?! 那当初为啥要拆出来?!

> [如何评价微信新推出的WXS语言](https://www.zhihu.com/question/64322737)

## WePY

还尼玛出现了基于小程序的开发框架，[WePY](https://github.com/wepyjs/wepy)

包括预加载，预查询， 数据绑定， 生命周期优化，事件等。。。(这些尼玛不是应该小程序自己实现的么...)

可编译为 WEB 版

已被官方收纳

## mpvue

* 基于 vue.js, 将用 vue.js 写的代码转换为小程序可以识别的代码
  * 改造了 render 方法，禁止视图层渲染
  * 所有的事件都绑在一个 handleProxy 方法上, 用写在 dom 上的 eventid 来区分

## 分析开发者工具

开发者工具使用了 react.js + nwjs, 名叫 MINA...

### 恢复右键打开调试面板功能(可以底层 inspect)

`/Applications/wechatwebdevtools.app/Contents/Resources/app.nw` 里是开发者工具的源码

`/js/core/index.js`, 注释掉阻止右键打开菜单下的`event.preventDefault()` (onContextMenusShow关键字)

或者注释掉文件 app/dist/app.js 44 行和app/dist/components/simulator/webviewbody.js 149 行preventDefault 调用

注释掉 `package.json`里的 `--disable-devtools`

### 运行代码目录结构

打开微信 web 开发者工具，然后输入 openVendor() 便会打开 WeappVendor这个目录, 里面结构大概是

- 1.3.0
  - WAService.js
  - WAWebview.js
- WAWigget.js
- wcc: 将 wxml 转换为 DOM JSON
- wcsc: 将 wxss 转换为 css

### WAWebview.js

* 类似于 React, 里面包含
  * Virtual Dom 逻辑, 参照了[Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom))。
  * 事件绑定

在 WAWebview 源码里，可以看到以下组件的 behaviors 里有 wx-native 的组件定义: wx-contact-button, wx-map, wx-textarea, wx-video, wx-canvas, 也就是说一些特殊的组件还是用 native 来实现的

### WAService.js

封装了一些 api 和后台逻辑

* 每一个页面都放在一个 webview 标签内， (不清楚真实环境内是怎么做的)
* 点击 -> view接收事件 -> nwjs 发送给 service -> service 查找到对应的指向函数并调用 this.setData
* 小程序的视图层目前使用 WebView 作为渲染载体(page-frame)，而逻辑层是由独立的 JavascriptCore 作为运行环境(app-service), 两者通过 evaluateJavascript 传递数据

> 这3篇[文章](https://chemzqm.github.io/wept/#/home?id=%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86) 讲得还是蛮好的

## WEPT

从 `bin/wept` 看起, 可以看到是起了一个 node 服务, 入口在 `../build/server` (从 gulpfile 里可以看到 build 目录是 lib 目录通过 babel 编译后的版本)

`server.js` 使用了 koa, 主要逻辑在 `router.js` 里

### index

`/` 路径请求了 `template` 里的 `index.html` 模版, 并用作者自己的 `et-improve` 和当前 config 渲染出起始页面

起始页面包含 [record.js](https://github.com/mattdiamond/Recorderjs)(音频相关, 已经没有维护, 作者应该取了某一个 fork) 和 `/script/build.js`

最主要的文件 `build.js`, 编译自 `src` 目录

`Tabbar` 是一个 React 的 component, 用来展现底部 tab

`header.js` 也是一个 React component, 从 message.js -> command.js 路径引入(这里不好吧, 好乱...)

### appservice

`index.js` 里会渲染一个指向 appservice 的 iframe

模版为 `service.html`

### view

`view.js` 里会渲染一个当前页面的 iframe, src 为 wxml 文件, 基于 `view.html` 渲染

尼玛 wcc 和 wcsc 一直在改, 2018-01-12, 编译出来的 css 都带了 `%%HERESUFFIX%%` 是什么鬼...

## weweb

基于 wept 的另外一套实现...

> [weweb](https://github.com/wdfe/weweb)

## hera

基于 wept 的又另外一套实现...

> [hera](https://github.com/weidian-inc/hera)
