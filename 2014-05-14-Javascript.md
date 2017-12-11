# Javascript

## Tips

* [Debugging Node.js with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

* Firefox获取body元素和Chrome有所不同 `root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body`

* [JavaScript获取DOM元素位置和尺寸大小](http://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html)

* `for in` 会把原型里的东西都遍历出来, 只有用`hasOwnProperty`多判断一遍才不会, `for`就不会了,还是多用for吧

* ~~在变量前面加`!!` 可以强制转换boolean~~(感觉这个在语义理解上并不可取)

* for循环头部的let声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量

* [`new Array()` 和 `Array()`是一样的](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.1)

* [querystring function from nodejs](https://nodejs.org/dist/latest-v6.x/docs/api/querystring.html)

## 复制数组

* 从性能角度来说, 对于webkit, 使用`concat`; 其他浏览器, 使用`slice`
* var.slice(0)
* var.concat();

* `splice` 与 `slice` 的作用是不同的，`splice` 会直接对数组进行修改, 并返回被删除元素, `slice`不改变原数组

> [Alon's blog, 通过对比的方式梳理](http://jinlong.github.io/2017/02/04/javascript-array-methods-mutating-vs-non-mutating/#more)

## 删除元素

如需删除 HTML 元素，必须首先获得该元素的父元素

一个判断过旧版本提示的示例：

```html
<!--[if lt IE 7]>
  <div id="warning_ie6" style="text-align: center; color:red">
    您使用的是本网站不再支持的IE6浏览器，为了更好的访问，请升级至新版浏览器。
    <span style="cursor: pointer" onclick='document.getElementById("warning_ie6").parentNode.removeChild(document.getElementById("warning_ie6"))'>关闭</span>
  </div>
<![endif]-->
```

## 防抖动和节流阀

* `throttle` 保证 X 毫秒内有且执行执行一次
* `Debounce` 把多个顺序地调用合并成一次

> [Alon's Blog](http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

## 闭包(Closure)

内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。
> [mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)

## new 操作符

当代码 new foo(...) 执行时：

* 一个新对象被创建。它继承自foo.prototype。
* 构造函数 foo 被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new foo 等同于 new foo(), 只能用在不传递任何参数的情况。
* 如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象，ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。

> [mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

## pingback(打点)

* [Navigator.sedBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)

### 利用图片

把 img 变量用闭包封闭起来，便能解决请求丢失的问题

```javascript
var report = (function() {
  var imgs = [];
  return function( src ){
    var img = new Image();
    imgs.push( img );
    img.src = src;
  }
})();
```

## 古典oo

> [javascript oo 实现 by purplebamboo](http://purplebamboo.github.io/2014/07/13/javascript-oo-class/)

## Decorator

2016-12-17: Still in draft...

A decorator is

* an expression
* that evaluates to a function
* that takes the target, name, and decorator descriptor as arguments
* and optionally returns a decorator descriptor to install on the target object

Types:

* simple class decorator
* class decorator
* class function decorator, 和hoc有类似的参数

> [decorator proposal](https://github.com/wycats/javascript-decorators)
>
> [babel](https://babeljs.io/docs/plugins/transform-decorators/#example-simple-class-decorator)
>
> [taobaofed](http://taobaofed.org/blog/2015/11/16/es7-decorator/)
>
> [Decorators in ES7 by 小丁](http://www.liuhaihua.cn/archives/115548.html)

## 数据属性 vs 访问器属性

```javascript
// 数据属性
Object.defineProperty(person, 'name', {
  writable: true, // 是否能更改属性的值
  configurable: true, //能否通过delete删除属性或者修改属性,能否将属性修改为访问器属性
  enumerable: true, // 能否通过for in,  Object.keys 循环返回属性
  value: 'Nicholas' // 默认为undefined
})

// 访问器属性
Object.defineProperty(book, 'year', {
  configurable: true, //能否通过delete删除属性或者修改属性,能否将属性修改为访问器属性
  enumerable: true, // 能否通过for in, Object.keys 循环返回属性
  // 在读取属性时调用的函数
  get: function() {
    return this._year;
  },
  // 在写入属性时调用的函数
  set: function(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
})

```

## IntersectionObserver

监视某个元素是否滚动进了浏览器窗口的可视区域

[polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill)

## MutationObserver

监视 DOM 树的变化

## angular

* ionic

## 文件和二进制的操作

* [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob): (Binary Large Object): `new Blob(实际数据的数组, 数据类型)`
* [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 继承自 Blob, 扩展了更多的对象的属性
  * [Creating a Blob from a base64 string in JavaScript](https://www.npmjs.com/package/b64-to-blob)
    > [so](https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript)
  * [image (blob, dataURL, canvas)转换](https://chiayilai.com/image-%E5%90%84%E7%A8%AE%E5%9E%8B%E6%85%8B%E8%BD%89%E6%8F%9Bblob-dataurl-canvas-in-javascript/)
* URL 用于生成指向File对象或Blob对象的URL
  * 利用URL对象，在网页插入图片: `img.src = window.URL.createObjectURL(files[i])`
* FileReader 用来读取 Blob 和 File 内的内容, 为异步操作
  * `readAsDataURL()` 返回一个基于Base64编码的data-uri对象
  * `readAsText` 返回文本字符串
* FileList
  * 因为安全原因, input 框里的 FileList 不能用 js 改变
* [FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects): 组装发送`XMLHttpRequest`请求的键值对
  * 增加一个字段： `formData.append('file', blob, 'text.txt')`
* [Javascript: Uploading a file… without a file](https://stackoverflow.com/a/22858914/2307918)

> [文件和二进制的操作 by ruanyifeng](http://javascript.ruanyifeng.com/htmlapi/file.html)
>
> [Using files from web applications](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications)

## Fetch

* [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)
* [Abortable fetch](https://developers.google.com/web/updates/2017/09/abortable-fetch?utm_source=feed&utm_medium=feed&utm_campaign=updates_feed)

## Jsbridge

* scheme
  * 使用 iframe 避免重复点击后前面的 location.href 不生效
* 直接注入全局变量

## JSPacker

> [by dean.edwars](http://dean.edwards.name/packer/)
>
> [js 不可读化处理](https://www.zhihu.com/question/28468459)

## IIFE

[immediately-invoked-function-expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife)

## history

> [ruanyifeng](http://javascript.ruanyifeng.com/bom/history.html)

## Proxy

Proxy 对象可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截.

`Proxy(target, handler)` 是一个构造函数，target 是被代理的对象，handler 是声明了各类代理操作的对象，最终返回一个代理对象.

* Reflect: Reflect对象的方法与 Proxy 的 handlers 对象的方法一一对应。这就让 handlers 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，我们总可以在Reflect上获取默认行为
* 貌似比通过修改访问器属性(`Object.defineProperty`)来修改 get 和 set 更高端?!

### 用处

* 剥离验证逻辑
* 添加私有属性
* 记录对象访问
* 给出提示信息或是阻止特定操作
> [6种ES6 proxies的使用案例 by loveky](http://www.zcfy.cc/article/6-compelling-use-cases-for-es6-proxies-888.html)

## others

[date-fns vs moment.js](https://github.com/date-fns/date-fns/issues/275#issuecomment-26493418)
