# 微信小程序

[官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)

[github 上整理的文档](https://github.com/justjavac/awesome-wechat-weapp)

[微信小程序架构解析](https://mp.weixin.qq.com/s/3QE3g0NmaBAi91lbrihhVw)

[微信小程序的开发经验分享](https://mp.weixin.qq.com/s/9PID6UJsQyB06xdyOkEVOA)

[小程序标准化概要...](https://github.com/w3c/chinese-ig/blob/master/tf/mini-app/outline.md)

## 对比 Web 标准

* form 表单提交, form 数据放在了 `e.target.detail.value` 里
* target.dataset 为字符串, 微信小程序里为整型

## Runtime

iOS: WebKit,  [JavaScriptCore](https://github.com/phoboslab/JavaScriptCore-iOS)

Android: [X5](https://x5.tencent.com/). 新版 X5 应该是基于 Blink, V8

开发工具: [nwjs(node-webkit)](https://github.com/nwjs/nw.js/), 基于 Chromium,  V8

## WXS

在 page-frame 中运行的 JS(而不是 app-service), 最大的用途是一个视图层的 filter. 避免了跨线程通信的开销......

[知乎上的讨论](https://www.zhihu.com/question/64322737/answer/292519240):

> 框架是要给人用的，就说微信小程序这种，算是小型app，一般一两个人开发就足够了。一般公司不会把主要的技术力量放在小程序开发这里。因此开发者一般是实习生或者是刚毕业工作的程序员。他们的经验能力有限，而且一般公司也不会那么重视小程序的几毫秒性能。所以，你的框架就应该——简单、清晰、通用、易维护、易移植，不要提供过多选项，不要让刚学了点前端的小朋友写得一头雾水。

## 第三方框架

### [WePY](https://github.com/wepyjs/wepy)

* 包括预加载，预查询， 数据绑定， 生命周期优化，事件等。。。(这些为啥小程序自己不实现...)
* 可编译为 WEB 版, 已被官方收纳

### [kbone](https://github.com/Tencent/kbone)

* 官方项目, 通过在小程序上面添加一层模拟 Web 的 adapter 实现

### mpvue

* 基于 vue.js, 将用 vue.js 写的代码转换为小程序可以识别的代码
* 改造了 render 方法，禁止视图层渲染
* 所有的事件都绑在一个 handleProxy 方法上, 用写在 dom 上的 eventid 来区分

### Taro

* 基于 React, 通过 complier 实现转换
* 可以多学学这个项目的组织发布结构和社区营造...
* omi 的转小程序是[基于](https://github.com/Tencent/omi/blob/master/packages/omip/package.json#L15) taro 的
* 1.3.0 貌似是一个大版本, 包括开始支持 hooks

## 分析开发者工具

开发者工具使用了 react.js + nwjs, 名叫 MINA...

### 恢复右键打开调试面板功能(可以底层 inspect)

`/Applications/wechatwebdevtools.app/Contents/Resources/app.nw` 里是开发者工具的源码

`/js/core/index.js`, 注释掉阻止右键打开菜单下的`event.preventDefault()` (onContextMenusShow关键字)

或者注释掉文件 app/dist/app.js 44 行和app/dist/components/simulator/webviewbody.js 149 行preventDefault 调用

注释掉 `package.json`里的 `--disable-devtools`

### 运行代码目录结构

打开微信 web 开发者工具，然后输入 openVendor() 便会打开 WeappVendor这个目录, 里面结构大概是

* 1.3.0
  * WAService.js
  * WAWebview.js
* WAWigget.js
* wcc: 将 wxml 转换为 DOM JSON
* wcsc: 将 wxss 转换为 css

### WAWebview.js

* 类似于 React, 里面包含
  * Virtual Dom 逻辑, 参照了[Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom)
  * 事件绑定

在 WAWebview 源码里，可以看到以下组件的 behaviors 里有 wx-native 的组件定义: wx-contact-button, wx-map, wx-textarea, wx-video, wx-canvas, 也就是说一些特殊的组件还是用 native 来实现的

### WAService.js

封装了一些 API 和后台逻辑

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

### 其他基于 WEPT 的实现

* [weweb](https://github.com/wdfe/weweb)
* [hera](https://github.com/weidian-inc/hera)

## 微信小游戏

### 开放数据域

* [官方文档](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/open-data.html)
* 通信: 类似于 postmessage 方式
  * 类似于通过不同的 webview 隔离
  * 开放数据域不能向主域发送消息
  * 主域可以向开放数据域发送消息
* 只能通过 sharedCanvas 渲染然后绘制到主域上
* 在开放数据域可以使用一些关于社交关系链数据的 API, 从而实现类似于排行榜的功能
  * 保证了用户可以拿到数据展示，但你无法存储数据到自己的服务器
  * [wx.getFriendCloudStorage](https://developers.weixin.qq.com/minigame/dev/api/wx.getFriendCloudStorage.html): 拉取当前用户所有同玩好友的托管数据
  * [wx.getGroupCloudStorage](https://developers.weixin.qq.com/minigame/dev/api/wx.getGroupCloudStorage.html): 获取群同玩成员的游戏数据
* 说是说开放, 但是其实应该是限制
* [cocos 接入微信小游戏的开放数据域](https://docs.cocos.com/creator/manual/zh/publish/publish-wechatgame-sub-domain.html)
  * cocos 里又叫子域(BROWSER_TYPE_WECHAT_GAME_SUB)
  * cocos creator 靠判断是否实现了 [wx.getFileSystemManager](https://github.com/cocos-creator/engine/blob/2.1.0/cocos2d/core/platform/CCSys.js#L635)判断是否在开放数据域

```javascript
let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas

let canvas = wx.createCanvas()
let context = canvas.getContext('2d')
context.drawImage(sharedCanvas, 0, 0)
```

![主域和开放数据域的关系](https://res.wx.qq.com/wxdoc/dist/assets/img/data-flow.ad68359b.png)

