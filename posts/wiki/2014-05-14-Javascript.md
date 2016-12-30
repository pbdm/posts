# Javascript

## Tips

* Firefox获取body元素和Chrome有所不同 `root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body`

* [JavaScript获取DOM元素位置和尺寸大小](http://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html)

* `for in` 会把原型里的东西都遍历出来,只有用`hasOwnProperty`多判断一遍, `for`就不会了,还是多用for吧

* 复制数组:对于webkit, 使用`concat`; 其他浏览器, 使用`slice`

* ~~在变量前面加`!!` 可以强制转换boolean~~(感觉这个在语义理解上并不可取)

* for循环头部的let声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量

## 复制数组

* var.slice(0)
* var.concat();

* `splice()` 方法与 `slice()` 方法的作用是不同的，`splice()` 方法会直接对数组进行修改,并返回被删除元素, `slice()`不改变原数组

## Promise

### 状态

* Pending (进行中)
* Resolved (已完成,Fulfilled)
* Rejected (已失败)

### 状态改变

* Pending -> Resolved
* Pending -> Rejected

`then(res,rej)`为状态改变时的回调函数, 并返回一个新的Promise实例
`Promise.prototype.catch`方法是`then(null, rejection)`的别名

> [ruanyifeng](http://es6.ruanyifeng.com/#docs/promise)

## 删除元素

如需删除 HTML 元素，必须首先获得该元素的父元素

一个判断过旧版本提示的示例：

```
<!--[if lt IE 7]>
  <div id="warning_ie6" style="text-align: center; color:red">
    您使用的是本网站不再支持的IE6浏览器，为了更好的访问，请升级至新版浏览器。
    <span style="cursor: pointer" onclick='document.getElementById("warning_ie6").parentNode.removeChild(document.getElementById("warning_ie6"))'>关闭</span>
  </div>
<![endif]-->
```

## 事件

* `EventTarget.addEventListener`: 绑定事件
* `EventTarget.removeEventListener`: 解绑事件
* `EventTarget.dispatchEvent`: 派发事件, 返回值取决于派发的事件里是否执行了`preventDefault`;

### 事件执行顺序

![](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)
> [W3C](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

当一个页面元素包含子元素节点的时候，他在处理在其身上的绑定事件的时候，采用先执行捕获阶段的事件，再执行冒泡阶段的事件
> [yujiangshui](http://yujiangshui.com/javascript-event/)

### 常用的event的参数

* `type`: 事件名称
* `target`: 事件触发的目标节点
* `currentTarget`: 事件绑定的节点
* `bubbles`: 是否在冒泡阶段触发
* `stopPropagation()`: 阻止事件冒泡
* `stopImmediatePropagation()`: 阻止事件冒泡的同时, 阻止针对同一目标节点的相同事件
* `preventDefault()`:  阻止事件默认行为, 比如`<a>`上`click`的跳转, `touchstart`, `touchmove`的滚动
* `cancelable`: 是否可以通过`preventDefault`来禁用
* `pageX`和 `pageY`: 事件触发时点击点相对于页面的坐标
* `isTrusted`: 事件是否由用户真实操作触发

### 事件对象

* `Event`

> [MDN - Event的继承关系](https://developer.mozilla.org/en-US/docs/Web/API/Event)

可用`dispatchEvent`派发, 常用的继承自`Event`的对象:

* `MouseEvent`
* `TouchEvent`
* `CustomEvent`: 比父类`Event`有更高的自定义性

### 有关性能

* `addEventListener`函数在新的标准里第三个参数有所变化: `target.addEventListener(type, listener[, options])`

> [Passive event listeners](https://zhuanlan.zhihu.com/p/24555031)

~~### 点穿~~

### iPhone(iPad) Touch事件

* [集合贴](http://m.oschina.net/blog/88086)
* [苹果官方文档](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)

## 防抖动和节流阀

* `throttle` 保证 X 毫秒内至少执行一次
* `Debounce` 把多个顺序地调用合并成一次

> [Alon's Blog](http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

## 闭包(Closure)

内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。
> [mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)

## html转译字符

```
function htmlEncode(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
function htmlDecode(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.innerHTML;
}
```

## new操作符

当代码 new foo(...) 执行时：

* 一个新对象被创建。它继承自foo.prototype。
* 构造函数 foo 被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new foo 等同于 new foo(), 只能用在不传递任何参数的情况。
* 如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象，ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。

> [mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

## markdown to graph parsers by javascript

* [flowchart.js](flowchart.js.org)
* [Authentication Sequence](https://www.websequencediagrams.com)
* [js-sequence-diagrams by bramp](https://bramp.github.io/js-sequence-diagrams/)

## 利用图片上报打点数据

把 img 变量用闭包封闭起来，便能解决请求丢失的问题

```
var report = (function() {
  var imgs = [];
  return function( src ){
    var img = new Image();
    imgs.push( img );
    img.src = src;
  }
})();
```

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

