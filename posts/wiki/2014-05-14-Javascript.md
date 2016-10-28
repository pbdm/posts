## Tips

* Firefox获取body元素和Chrome有所不同 `root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body
`

* [JavaScript获取DOM元素位置和尺寸大小](http://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html)

* `splice()` 方法与 `slice()` 方法的作用是不同的，`splice()` 方法会直接对数组进行修改,并返回被删除元素, `slice()`不改变原数组

* `for in` 会把原型里的东西都遍历出来,只有用`hasOwnProperty`多判断一遍, `for`就不会了,还是多用for吧

* 复制数组:对于webkit, 使用`concat`; 其他浏览器, 使用`slice`

* 在变量前面加`!!` 可以强制转换boolean

## let
for循环头部的let声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量

## 复制数组
* var.slice(0)
* var.concat();

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

    <!--[if lt IE 7]>
      <div id="warning_ie6" style="text-align: center; color:red">
        您使用的是本网站不再支持的IE6浏览器，为了更好的访问，请升级至新版浏览器。
        <span style="cursor: pointer" onclick='document.getElementById("warning_ie6").parentNode.removeChild(document.getElementById("warning_ie6"))'>关闭</span>
      </div>
    <![endif]-->

## iPad Touch事件
* [集合贴](http://m.oschina.net/blog/88086)
* [苹果官方文档](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)

## 事件绑定
### 事件捕获顺序
当一个页面元素包含子元素节点的时候，他在处理在其身上的绑定事件的时候，采用先执行捕获阶段的事件，再执行冒泡阶段的事件
> http://blog.segmentfault.com/fishenal/1190000000470398
> http://yujiangshui.com/javascript-event/

### [阻止超链接跳转](http://www.suchso.com/projecteactual/javascript-event-up-stopPropagation-cancelBubble.html)
[jQuery:](http://blog.csdn.net/woshixuye/article/details/7422985)

`return false`： 同时调用以下两种

`e.stopPropagation()`： 阻止事件冒泡 (对`live`绑定的事件没有作用)

`e.preventDefault()`： 阻止事件默认行为

    $('#a0').click(function(){  
      return false;  
    });  
    $("span").click(function (e){
      e.stopPropagation();
    });

[protorype:](http://stackoverflow.com/questions/1399613/disable-link-with-the-prototype-observe-method)

    $('link').observe('click', function(e) { e.stop(); });

## 闭包(Closure)
内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures


## 防抖动和节流阀
* `throttle` 保证 X 毫秒内至少执行一次
* `Debounce` 把多个顺序地调用合并成一次
> http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/

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
* 一个新对象被创建。它继承自foo.prototype.
* 构造函数 foo 被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new foo 等同于 new foo(), 只能用在不传递任何参数的情况。
* 如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象，ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new

## markdown to graph parsers by javascript
* [flowchart.js](flowchart.js.org)
* [Authentication Sequence](https://www.websequencediagrams.com)
* [js-sequence-diagrams by bramp](https://bramp.github.io/js-sequence-diagrams/)

