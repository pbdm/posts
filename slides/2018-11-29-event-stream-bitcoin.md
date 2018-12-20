
# event-stream 被植入比特币后门事件

---

# 起因

原作者 dominictarr 由于时间和精力有限，将其维护工作交给了另一位开发者 Right9ctrl，该开发者获得了 event-stream 的控制权

---

# 经过

Right9ctrl 在2018年9月9日为 event-stream [添加](https://github.com/dominictarr/event-stream/commit/e3163361fed01384c986b9b4c18feb1fc42b8285)了一个 flatmap-stream 的依赖, 而这个依赖项包含有窃取用户数字钱包的恶意代码

该恶意程序在默认情况下处于休眠状态，当 BitPay 的 Copay 钱包启动后，就会自动激活，它将会窃取用户钱包内的私钥并发送至 copayapi.host:8080

直到 11月21号, 才被[发现](https://github.com/dominictarr/event-stream/issues/116)

---

# 影响

* [event-stream](https://www.npmjs.com/package/event-stream) 包是一个Node.js 流数据的 JavaScript 软件包，每周下载量在200万次以上，两个月间已经有大约800万次的下载量

* 而且 Angular、Vue、Bootstrap、Gatsby 等都在使用 event-stream

* [vue](https://m.weibo.cn/detail/4310948972111526)

* [vscode](https://code.visualstudio.com/blogs/2018/11/26/event-stream)

* npm官网已对其进行[下架处理](https://www.npmjs.com/package/flatmap-stream?activeTab=versions)

---

# 确认是否受影响

```
npm ls event-stream flatmap-stream

flatmap-stream@0.1.1

```

---

# 防范

* package-lock.json
* 公司层面的私有仓库

---

# Reference

* [Details about the event-stream incident - npm blog](https://blog.npmjs.org/post/180565383195/details-about-the-event-stream-incident)
* [Malicious code found in npm package event-stream downloaded 8 million times in the past 2.5 months](https://snyk.io/blog/malicious-code-found-in-npm-package-event-stream)
* [GITHUB又出幺蛾子？才让机器人修复漏洞就又给黑客送上模块版权](https://tech.china.com/article/20181127/kejiyuan1108220392.html)