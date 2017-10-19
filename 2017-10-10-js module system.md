# Javascript Module system styles

* `<script>` tag
* [ES2015 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) (`import`, `export`)
* [CommonJS](http://www.commonjs.org/specs/modules/1.0/): synchronous (`require`, `module.exports`)
* [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md): asynchronous require(`define`, `require`)
  * [require.js](http://requirejs.org/)
  * [curl.js](https://github.com/cujojs/curl)
  * [CMD](https://github.com/seajs/seajs/issues/242)(Common Module Definition)
    * [sea.js](https://github.com/seajs/seajs) `define(function(require, exports, module) {`
  * AMD 与 CMD 的区别
    * AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
    * 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
    * CMD 推崇依赖就近，AMD 推崇依赖前置
  ```javascript
  // CMD
  define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ...
  })
  // AMD 默认推荐的是
  define(['./a', './b'], function(a, b) {  // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
    ...
  })
  ```
  > [AMD 和 CMD 的区别 in zhihu](https://www.zhihu.com/question/20351507)
* [UMD](https://github.com/umdjs/umd)(Universal Module Definition, 同时支持 AMD 和 CommonJs 的规范)
  ```javascript
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
      } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('b'));
      } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.b);
      }
    }(this, function (b) {
      //use b in some fashion.

      // Just return a value to define the module export.
      // This example returns an object, but the module
      // can return a function as the exported value.
      return {};
    }));
  ```
* [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) inside of a css/sass/less file
* image url in a stylesheet (url(...)) or html (<img src=...>) file.

## ES2015 modules vs CommonJS

* ES2015 modules 有可能是异步的
* 从 v8.5.0 开始, [node --experimental-modules](https://github.com/nodejs/node/blob/master/doc/api/esm.md) 可以支持 ES2015 modules

> [webpack1 module system](http://webpack.github.io/docs/motivation.html#module-system-styles)
>
> [webpack 模块 by toobug](https://webpack.toobug.net/zh-cn/chapter2/)