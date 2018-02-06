# Navigator

## Chrome

* [Chrome插件开发文档360版](http://open.chrome.360.cn/extension_dev/overview.html)
* [Chrome插件开发非官方中文文档](https://crxdoc-zh.appspot.com/apps/about_apps.html)

### 进程模型

* 一般来说, chrome 里进程分两类
  * 主进程(browser process)
  * 每个 tab 或者扩展为独立进程(renderer processes), 可以在 Activity Monitor 里看到一个 Google Chrome Helper
* GUI渲染线程负责渲染浏览器界面(repaint, reflow), 与JavaScript引擎互斥，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行
* 事件触发线程
  * 负责将 setTimeout 里面的语句塞到 queue 里去的任务也是在单独的线程里执行的(里面的语句还是要在 js 引擎所在的线程执行的)
  * 另外点击事件, 网络请求等也是放在单独的线程里的
* 网络请求(貌似是主进程里的线程?!), 定时器计数也有单独的线程

[chrome://tracing/](chrome://tracing/)

> [Threads overview](https://chromium.googlesource.com/chromium/src/+/lkcr/docs/threading_and_tasks.md#threads)
>
> [关于JavaScript单线程的一些事](https://github.com/JChehe/blog/blob/master/posts/%E5%85%B3%E4%BA%8EJavaScript%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%B8%80%E4%BA%9B%E4%BA%8B.md#%E6%B5%8F%E8%A7%88%E5%99%A8)
>
> [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理 by dailc](https://juejin.im/post/5a6547d0f265da3e283a1df7)

### 内部链接

* [HTTP/2 查看工具](chrome://net-internals/#http2)
* [查看 chrome HSTS Preload 域名](chrome://net-internals/#hsts)
* [查看缓存文件](chrome://cache/)

### versions

* [Chrome Release Channels](https://www.chromium.org/getting-involved/dev-channel)
* [stable download](https://www.google.com/chrome/browser/desktop/index.html?platform=mac)
* [beta download](https://www.google.com/chrome/browser/beta.html?platform=mac&extra=betachannel) 每月更新
* [dev download](https://www.google.com/chrome/browser/desktop/index.html?platform=mac&extra=devchannel) 每星期更新

* [Canary](https://www.google.com/chrome/browser/canary.html?platform=mac) 每天更新, 可与上面三个共存安装
* [chromium](https://download-chromium.appspot.com/) 小时更新

### dev tools

* [Chrome devtools 官方文档](https://developers.google.com/web/tools/chrome-devtools/)
* 查看事件绑定: `chrome-dev-tools -> Elements -> Event Listeners -> 勾上Ancestors`

### 快捷键

* [Chrome快捷键](https://support.google.com/chrome/answer/165450?hl=zh-Hans)
* `Command-L` 突出显示网址。
* `Command-T` 打开新标签页。
* `Command-Option+箭头键` 切换标签页。
* [List of Chrome URLS](chrome://about/)

### Chrome headless

* [puppeteer](https://github.com/GoogleChrome/puppeteer)
* [chrome-launcher(by lighthouse team)](https://github.com/GoogleChrome/chrome-launcher) just a launcher
* [非官方 list](https://medium.com/@kensoh/chromeless-chrominator-chromy-navalia-lambdium-ghostjs-autogcd-ef34bcd26907)

> [Headless Chrome 入门](https://zhuanlan.zhihu.com/p/29207391)

## Blink

Blink and Chromium are not really separable anymore, 所以他们的 source code 是在一起的

* [Git repositories on chromium](https://chromium.googlesource.com/)

* [chromium homepage](https://www.chromium.org/Home)
* [chromium For Developers(guide)](http://www.chromium.org/developers)
* [chromium source code](https://chromium.googlesource.com/chromium/src/)(注意, 直接进入的那个貌似已经废弃了...)
  * 注意: 库很大, 需要机器性能很好再 clone.....
* [Getting Around the Chromium Source Code Directory Structure](http://www.chromium.org/developers/how-tos/getting-around-the-chrome-source-code)
* [chromium Bug tracker](https://bugs.chromium.org/p/chromium/issues/list)
* [Checking out and building Chromium for Mac](https://chromium.googlesource.com/chromium/src/+/master/docs/mac_build_instructions.md)
* [Chromium Code Search](https://cs.chromium.org/)

* [Blink homepage](https://www.chromium.org/blink)
* [Blink source code](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/)

[blink 源码目录现在还叫webkit](https://groups.google.com/a/chromium.org/forum/#!topic/platform-architecture-dev/DKQn-SILZzo/discussion)

* [v8 source code mirror in github](https://github.com/v8/v8)

## webkit

* [getting the code](https://webkit.org/getting-the-code/)
* [source code mirror in github](https://github.com/WebKit/webkit)
