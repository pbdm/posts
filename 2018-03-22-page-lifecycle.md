# Page lifecycle

* DOMContentLoaded, load 和 Page Lifecycle API 没有必然联系
* beforeunload 只应被用来提示用户有为存储信息
  * **坑**: [`beforeunload`在iOS里不支持](https://stackoverflow.com/questions/3239834/window-onbeforeunload-not-working-on-the-ipad), 可以考虑使用 pagehide 代替
* `chrome://discards/`: 当前页面状态

![Page Lifecycle API](https://developers.google.com/web/updates/images/2018/07/page-lifecycle-api-state-event-flow.png)