* [JavaScript获取DOM元素位置和尺寸大小](http://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html)
* `splice()` 方法与 `slice()` 方法的作用是不同的，splice() 方法会直接对数组进行修改
`splice()` 返回被删除元素
* `for in` 会把原型里的东西都遍历出来,只有用`hasOwnProperty`多判断一遍, `for`就不会了,还是多用for吧...

## ES6
for循环头部的let声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量

## 删除元素
如需删除 HTML 元素，必须首先获得该元素的父元素

一个判断过旧版本提示的示例：

    <!--[if lt IE 7]>
      <div id="warning_ie6" style="text-align: center; color:red">
        您使用的是本网站不再支持的IE6浏览器，为了更好的访问，请升级至新版浏览器。
        <span style="cursor: pointer" onclick='document.getElementById("warning_ie6").parentNode.removeChild(document.getElementById("warning_ie6"))'>关闭</span>
      </div>
    <![endif]-->

## 强制转换boolean
在变量前面加`!!`

## iPad Touch事件
* [集合贴](http://m.oschina.net/blog/88086)
* [苹果官方文档](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)

## 事件绑定
### 事件捕获顺序
当一个页面元素包含子元素节点的时候，他在处理在其身上的绑定事件的时候，采用先执行捕获阶段的事件，再执行冒泡阶段的事件
> http://blog.segmentfault.com/fishenal/1190000000470398

### [阻止超链接跳转](http://www.suchso.com/projecteactual/javascript-event-up-stopPropagation-cancelBubble.html)
#### [jQuery](http://blog.csdn.net/woshixuye/article/details/7422985)
`return false`： 同时调用以下两种

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

## [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/)
[注释 by purplebamboo](http://purplebamboo.github.io/2014/07/13/javascript-oo-class/)

    /* Simple JavaScript Inheritance
     * By John Resig http://ejohn.org/
     * MIT Licensed.
     */
    // Inspired by base2 and Prototype
    (function(){
      //initializing是为了解决我们之前说的继承导致原型有多余参数的问题。当我们直接将父类的实例赋值给子类原型时。是会调用一次父类的构造函数的。所以这边会把真正的构造流程放到init函数里面，通过initializing来表示当前是不是处于构造原型阶段，为true的话就不会调用init。
      //fnTest用来匹配代码里面有没有使用super关键字。对于一些浏览器`function(){xyz;}`会生成个字符串，并且会把里面的代码弄出来，有的浏览器就不会。`/xyz/.test(function(){xyz;})`为true代表浏览器支持看到函数的内部代码，所以用`/\b_super\b/`来匹配。如果不行，就不管三七二十一。所有的函数都算有super关键字，于是就是个必定匹配的正则。
      var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

      // The base Class implementation (does nothing)
      // 超级父类
      this.Class = function(){};

      // Create a new Class that inherits from this class
      // 生成一个类，这个类会具有extend方法用于继续继承下去
      Class.extend = function(prop) {
        //保留当前类，一般是父类的原型
        //this指向父类。初次时指向Class超级父类
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        //开关 用来使原型赋值时不调用真正的构成流程
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
          // Check if we're overwriting an existing function
          //这边其实就是很简单的将prop的属性混入到子类的原型上。如果是函数我们就要做一些特殊处理
          prototype[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
            (function(name, fn){
              //通过闭包，返回一个新的操作函数.在外面包一层，这样我们可以做些额外的处理
              return function() {
                var tmp = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                // 调用一个函数时，会给this注入一个_super方法用来调用父类的同名方法
                this._super = _super[name];

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                //因为上面的赋值，是的这边的fn里面可以通过_super调用到父类同名方法
                var ret = fn.apply(this, arguments);  
                //离开时 保存现场环境，恢复值。
                this._super = tmp;

                return ret;
              };
            })(name, prop[name]) :
            prop[name];
        }

        // 这边是返回的类，其实就是我们返回的子类
        function Class() {
          // All construction is actually done in the init method
          if ( !initializing && this.init )
            this.init.apply(this, arguments);
        }

        // 赋值原型链，完成继承
        Class.prototype = prototype;

        // 改变constructor引用
        Class.prototype.constructor = Class;

        // 为子类也添加extend方法
        Class.extend = arguments.callee;

        return Class;
      };
    })();
