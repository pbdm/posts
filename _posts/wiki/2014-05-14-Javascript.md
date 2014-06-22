---
layout: wiki
published: true
category: wiki
---

* [jsPerf - JavaScript performance playground](http://jsperf.com)

## 删除元素
如需删除 HTML 元素，必须首先获得该元素的父元素

一个判断过旧版本提示的示例：

    <!--[if lt IE 7]>
      <div id="warning_ie6" style="text-align: center; color:red">
        您使用的是本网站不再支持的IE6浏览器，为了更好的访问，请升级至新版浏览器。
        <span style="cursor: pointer" onclick='document.getElementById("warning_ie6").parentNode.removeChild(document.getElementById("warning_ie6"))'>关闭</span>
      </div>
    <![endif]-->

##强制转换boolean
在前面加两个感叹号`!!`

##iPad Touch事件
* [集合贴](http://m.oschina.net/blog/88086)
* [苹果官方文档](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)

##事件绑定
###事件捕获顺序
当一个页面元素包含子元素节点的时候，他在处理在其身上的绑定事件的时候，采用先执行捕获阶段的事件，再执行冒泡阶段的事件
> http://blog.segmentfault.com/fishenal/1190000000470398

### [阻止超链接跳转](http://www.suchso.com/projecteactual/javascript-event-up-stopPropagation-cancelBubble.html)
#### [jQuery](http://blog.csdn.net/woshixuye/article/details/7422985)
`return false`： 同时调用一下两种

`e.stopPropagation()`： 阻止事件冒泡 (对`live`绑定的事件没有作用)

`e.preventDefault()`： 阻止事件默认行为

    $('#a0').click(function(){  
      return false;  
    });  
    $("span").click(function (e){
      e.stopPropagation();
    });

#### [protorype](http://stackoverflow.com/questions/1399613/disable-link-with-the-prototype-observe-method)
    $('link').observe('click', function(e) { e.stop(); });

##[闭包(Closure)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)
内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

##`splice()` 方法与 `slice()` 方法的作用是不同的，splice() 方法会直接对数组进行修改
`splice()` 返回被删除元素 
