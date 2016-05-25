* Firefox获取body元素和Chrome有所不同 `root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body
`
* [JavaScript获取DOM元素位置和尺寸大小](http://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html)
* `splice()` 方法与 `slice()` 方法的作用是不同的，`splice()` 方法会直接对数组进行修改,并返回被删除元素, `slice()`不改变原数组
* `for in` 会把原型里的东西都遍历出来,只有用`hasOwnProperty`多判断一遍, `for`就不会了,还是多用for吧...
* 复制数组:对于webkit, 使用`concat`; 其他浏览器, 使用`slice`

## ES2015
for循环头部的let声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量

### Promise

#### 状态
* Pending (进行中)
* Resolved (已完成,Fulfilled)
* Rejected (已失败)

#### 状态改变
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

## 强制转换boolean
在变量前面加`!!`

## iPad Touch事件
* [集合贴](http://m.oschina.net/blog/88086)
* [苹果官方文档](https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html)

## 事件绑定
### 事件捕获顺序
当一个页面元素包含子元素节点的时候，他在处理在其身上的绑定事件的时候，采用先执行捕获阶段的事件，再执行冒泡阶段的事件
> http://blog.segmentfault.com/fishenal/1190000000470398
> http://yujiangshui.com/javascript-event/

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

##

* `throttle` 保证 X 毫秒内至少执行一次
* `Debounce` 把多个顺序地调用合并成一次
> http://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/

## Ajax in jQuery
调用的文件：

    <div>
        <?php echo isset($_POST['limit'])?$_POST['limit']:""; ?>
    </div>
    <div id="time">
    <?php
        echo isset($_POST['time'])?$_POST['time']:"";
        print date("Y-m-d H:i:s");
    ?>
    </div>

### 普通的Ajax调用脚本`jQuery.ajax()`

    $(document).ready(function() {
        $("#change").click(function(){
            htmlobj = $.ajax({
                url:"/code/Ajax-jQuery/time.php",
                async:false
            });
            $("#content").html(htmlobj.responseText);
        });
    });

### `Ajax.load()`
通过对`jQuery.ajax()`进行封装以方便使用的一个方法，通过AJAX请求从服务器加载数据，并把返回的数据放置到指定的元素中，另外例子中的`#time`可以选定要返回的元素不要和事件方法`load()`弄混了

    $(document).ready(function(){
        $("#change_load").click(function(){
            $("#content_load").load(
                "/code/Ajax-jQuery/time.php #time",
                {limit: 25,time: "time:"},
                function(responseText,status,xhr) {
                  console.log(xhr.statusText);
                  console.log(status);
                  console.log(responseText);
                });
        });
    });

### `jQuery.get`和`jQuery.post`
使用GET或POST方式来进行异步请求
### jQuery trigger
根据绑定到匹配元素的给定的事件类型执行所有的处理程序和行为

    $(document).ready(function() {
        $("#change").click(function(){
            $("#content").html(new Date().getSeconds());
        });
        $("#change_bis").click(function(){
            $("#change").trigger("click");
        });
    });

###[jquery Ajax IE下出错](http://www.cnblogs.com/bingzisky/archive/2012/01/11/2319066.html)

    function BuyDish(did, dnum) {
        var data = { "did": did, "dnum": dnum };
        $.ajax({
            url: '<%=Url.Action("BuyDish", "member")%>',
            data: data,
            type: "GET",
            cache:false,//因为jQuery在IE下有缓存，所以要把这个属性设置成false，要不不能重复使用这个功能，FF下一切正常
            async:true,
            success: function (msg) {
                var da = msg.split("|");
                $("#totalCount").text(da[0].toString());
                $("#totalPrice").text(da[1].toString());
            }
        });
    }

* 当jQuery调用Ajax的返回值为JSON时，要求很严格，没有像`Prototype`(evalJSON)那样修正JSON

> [qleelulu's blog](http://www.cnblogs.com/qleelulu/archive/2008/04/21/1163021.html)

> [jQuery中文文档](http://www.css88.com/jqapi-1.9)

> [jQuery官方文档](http://api.jquery.com)

##Find event handlers
`$(node).data("events")`或`$._data(node, "events" )`
> http://segmentfault.com/q/1010000000446492
> http://stackoverflow.com/questions/12214654/jquery-1-8-find-event-handlers
> http://www.it165.net/pro/html/201404/12749.html
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
