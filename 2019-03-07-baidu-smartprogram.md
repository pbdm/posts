# 百度智能小程序

* 版本规则也是醉了...
  * swan-native版本(SDK版本), 3位：A.B.C, 如 1.2.3
  * swan.js版本(framework), 3位：(A+2).(B*10 + C).(X), 如3.23.1
* js native 通信基于 [ecomfe/js-native](https://github.com/ecomfe/js-native)
* [接入文档](https://github.com/swan-team/host-app-guide/blob/master/source/SUMMARY.md)

## 扩展

* hostMethodDescriptions
* methods: 开放给业务方的 API, 可以基于 hostMethodDescriptions 封装(通过 boxjs)
* components: 组件
  * 貌似只是可以写 san 的自定义组件, 不能加 native 组件?!
* getShareURL: 分享
* customLog: 统计

## 开发者工具
