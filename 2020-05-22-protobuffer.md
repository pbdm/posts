# Protocol Buffers

谷歌开发的一个传输协议, 采用二进制传输

## 编译工具

Mac 自带了官方的 [protoc](https://github.com/protocolbuffers/protobuf/tree/master/js), 调试的时候可以直接用, 但是貌似第三方的 [pbjs](https://github.com/protobufjs/protobuf.js#pbjs-for-javascript)更好用, 甚至可以支持 Typescript, 本项目使用的是 pbjs, 并且采用实时加载 .proto 文件的方式

## 优势

* 通信量大的时候省流: 输过程中等于是省去了 JSON 里的 key 以及一些不必要的括号的数据量
* 通过 .proto 文件的定义更利于打通前端和服务端的接口规范, 可以通过很方便的通过这个输出一个 API 文档

## 劣势

* 兼容性: [protobufjs](https://github.com/protobufjs/protobuf.js#compatibility) 的文档里标注的是 IE9+(If typed arrays are not supported by the environment, plain arrays will be used instead.), 如果按照支持 typed arrays(二进制数组) 来算需要[IE10 +](https://caniuse.com/#search=typedarray)
* 在传输前后还是需要转成 JSON 格式才可以进行数据的操作, 所以会消耗一定的浏览器性能
* 由于要预加载 .proto 的内容, 会在一定程度上增加工程的复杂度
* 有一定的学习成本
* 不利于抓包调试(抓到的 post body 都是二进制形式的)
* 需要和服务端同步描述文件, 而且只要服务端任何字段修改了就需要改描述文件
  * 按照老的方式需要服务端把描述文件通过人肉的方式传给前端
  * `https://github.com/protobufjs/protobuf.js` 可以在加载页面的时候自动加载描述文件
  