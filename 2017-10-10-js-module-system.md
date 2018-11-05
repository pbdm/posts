# Javascript 模块系统

* `<script>` tag
* [ES2015 modules](ECMAScript Modules)(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) (`import`, `export`)
  * 与 CommonJS 不同, ES2015 modules 有可能是异步的
* [CommonJS](http://www.commonjs.org/specs/modules/1.0/): synchronous (`require`, `module.exports`)
* [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md): asynchronous require(`define`)
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
    // ...
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

> [webpack Module](https://webpack.js.org/concepts/modules/#what-is-a-webpack-module)

## ES2015 modules

### in node

* 从 node v8.5.0 开始, [node --experimental-modules](https://github.com/nodejs/node/blob/master/doc/api/esm.md) 可以支持 ES2015 modules
  * 注意: 文件一定要是 `.mjs` 的
  * 如果要使用原来的 `.js` 文件, 需要使用 [Loader hooks](https://nodejs.org/api/esm.html#esm_loader_hooks)
  > [Node 9下import/export的丝般顺滑使用](https://github.com/ChenShenhai/blog/issues/24)

### in browsers

* 使用方法: `<script type="module" src="example.js"/>`, 这样引用的 js 里就可以使用 `import 了`
* strict mode is turned on by default
* 默认是 defer 的
* 多次引用也只会执行一次
* 跨域引用的模块必须支持 CORS
* safari module 引用的 js 是拿不到别的 js 里的全局变量的, 除非别的 js 里的全局变量主动挂到 winodw 上
> [ECMAScript modules in browsers by Jake Archibald](https://jakearchibald.com/2017/es-modules-in-browsers/)
>
> [ES6 Modules in Depth](https://ponyfoo.com/articles/es6-modules-in-depth)
