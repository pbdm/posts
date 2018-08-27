# HTTP 缓存

* 缓存阶段
  * 本地缓存阶段, 当满足条件时, 浏览器直接使用本地副本, 不会发送任何请求, `Cache-Control` 优先级高于 `Expires`
    * [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control) (http1.1)
      * `no-store`: 永远不缓存
      * `no-cache`: 不缓存过期资源(是否过期需要服务器验证, 如果验证成功则返回 304(验证方法见协商缓存阶段))
        * 替代了 http 1.0 的 `Pragma: no-cache`
      * `max-age`: 缓存秒数
      * `public` or `private`: 是否可以作为共享缓存(CDN可以缓存)
      > [What's the difference between Cache-Control: max-age=0 and no-cache?](https://stackoverflow.com/questions/1046966/whats-the-difference-between-cache-control-max-age-0-and-no-cache)
      >
      > [RFC 7234 for Cache-Control](https://tools.ietf.org/html/rfc7234#section-5.2)
      >
      > [no-cache与must-revalidate深入探究 by 程序猿小卡](http://www.cnblogs.com/chyingp/p/no-cache-vs-must-revalidate.html)
      >
      > ~~[缓存策略 by daihuimi](http://imweb.io/topic/55c6f9bac222e3af6ce235b9)~~
      >
      > ~~[【Web缓存机制系列】2 – Web浏览器的缓存机制 by alloyteam](http://www.alloyteam.com/2012/03/web-cache-2-browser-cache/)~~

      ![cache-control-dec](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/images/http-cache-decision-tree.png)
    * Expires (缓存到期的绝对GMT时间)
  * 协商缓存阶段, `ETag` & `If-None-Match` 优先级高于 `Last-Modified` & `If-Modified-Since`, 如果成功命中则会返回 304 Not Modified
    * `ETag`(Response header) & `If-None-Match`(Request header) (http1.1)
    * `Last-Modified`(Response header) & `If-Modified-Since`(Request header) (http1.0)
  * Vary
    * 属于 Response header, 值为 header-name 的集合
    * 当缓存服务器收到一个请求，只有当前的请求和原始（缓存）的请求头跟缓存的响应头里的Vary都匹配，才能使用缓存的响应
    * 可以使用 `Vary: User-Agent` 来区分移动端和桌面端的展示内容
* Cache-Control in Request
  * 总得来说还是应该先去遵守服务端的规则, 除非有特殊需求
  * 理解的时候可以把浏览器缓存当成是一个中间缓存
  * `no-cache`: (告诉中间缓存)不要使用缓存(这里貌似不会再去检验 `If-None-Match/If-Modified-Since` 了, 所以不会返回304了?!)
  * `max-age:0`: 在重新获取资源之前，先检验 If-None-Match/If-Modified-Since

> [循序漸進理解 HTTP Cache 機制 by techbridge](https://blog.techbridge.cc/2017/06/17/cache-introduction/)
>
> [HTTP 缓存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
>
> [HTTP caching in MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
>
> 图解 HTTP, 6.3.1 cache-control

## chrome 里 Cache-Control 的测试

* 这里暂不区分 disk cache 和 memory cache
* 如果在调试工具点上 `Disable cache` 或者 `cmd+shift+r`, 浏览器会强制在请求头上加上 `Cache-Control: no-cache` 和 `Pragma: no-cache`, 且不发送 `If-None-Match/If-Modified-Since`
* 浏览器前进和后退的过程当中所有请求是缓存的(忽视以上策略), 可以在前进后退的请求头里看到 `Provisional headers are shown`, 说明没有真正的发出请求

![cache-control](http://pbdm.qiniudn.com/20171124165919_Ppd5Q9_Screenshot.jpeg)

进入 `chrome://net-internals/#events`, 可以在 URL_REQUEST 看到数据是从缓存中读取的

![cache-control](http://pbdm.qiniudn.com/20171124172734_Dybrm1_Screenshot.jpeg)

* 在地址栏对当前url `cmd+r` 或回车, 浏览器会强制(忽视以上策略)对该url(首个页面)发出 `Cache-Control: max-age=0`
* 页面里的 `<a>` 标签即使 href 与页面 url 相同也是遵循缓存策略的