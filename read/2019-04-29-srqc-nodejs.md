# 深入浅出 Node.js

> [豆瓣阅读链接](https://read.douban.com/reader/ebook/12053349/)

## 第 1 章　Node简介

Node 是单线程的, 单线程的弱点:

* 无法利用多核CPU。
* 错误会引起整个应用退出，应用的健壮性值得考验。
* 大量计算占用CPU导致无法继续调用异步I/O。