# 百度智能小程序

* 版本规则也是醉了...
  * swan-native版本(SDK版本), 3位：A.B.C, 如 1.2.3
  * swan.js版本(framework), 3位：(A+2).(B*10 + C).(X), 如3.23.1
* 开发工具的编译模式更改为“依赖分析“模式就可以使用npm安装依赖包了
* js native 通信基于 [ecomfe/js-native](https://github.com/ecomfe/js-native)
  * AddJavaScriptInterface (Android WebView)
  * prompt (Android WebView、iOS WebView)
  * location.href (Android WebView、iOS WebView)
  * iframe (Android WebView、iOS WebView)
  * postMessage (iOS WKWebView)
  * JSEngine API 注入 (Android、iOS)
* [接入文档](https://github.com/swan-team/host-app-guide/blob/master/source/SUMMARY.md)

## 扩展

* hostMethodDescriptions
* methods: 开放给业务方的 API, 可以基于 hostMethodDescriptions 封装(通过 boxjs)
* components: 组件
  * native组件参考:
    `https://github.com/swan-team/swan-components/blob/master/src/behaviorDecorators/index.js#L463`
    `https://github.com/swan-team/swan-components/blob/master/src/behaviorDecorators/index.js#L345`
  * behaviors: 一些特有的装饰器
  * dependencies
* getShareURL: 分享
* customLog: 统计
* 基于[js-native](https://github.com/ecomfe/js-native)

## San 框架

* 这玩意越看越像 Vue, 与 Vue 区别:
  * methode 直接置于组件下, 而不是放在 `methods` 内
  * 双向绑定: `{= name =}`, 类似于 `v-model`
  * 感觉比 Vue 花样多, 更难上手(不是因为先看了 Vue 才有这个感觉的)
  * 为了 SSR 引入了 组件反解概念

> [San 生命周期](https://baidu.github.io/san/tutorial/component/)

## 坑

* Taro
  * 有时ScrollView 撑开了回不来
  * props 传给子组件时有时不更新
  * render 函数捏不能写 if else, 只能写一堆单个的 if
* s-if内 `selectKeys.indexOf(item.appKey)` 这种表达式没有值
  * 可以用 [filter](http://smartprogram.baidu.com/docs/develop/framework/view_filter/) 解决..
* 自定义组件内的事件不能被 Page.after 捕捉到(IDE 内)
  * swan-core 升级到 3.60.16 解决
