# Web 内存

由于很容易被用户感知, 所以内存问题十分重要. 主要分为以下三种

* 内存泄露(memory leak): 随着时间的延长使用的内存越来越多(无法回收)导致性能越来越差
* 内存膨胀(memory bloat): 内存占用过多导致页面性能一直很差. 比如用 [react-virtualized](https://github.com/bvaughn/react-virtualized) 来解决的长列表问题
* 频繁的垃圾回收(garbage collection)时的脚本暂停执行导致页面出现延迟或者经常暂停

## 垃圾回收(garbage collection)

老的 IE6, 7 使用引用计数, 有循环引用的问题

### V8 的做法

* 不能被 GC roots 遍历到的对象都将被内存回收. GC roots 可以包括 Window, Global, DOM 树
* [这篇文章](https://v8.dev/blog/trash-talk)详细的介绍了 V8 通过 Orinoco 项目所做的 GC 优化([中文翻译](https://zhuanlan.zhihu.com/p/55917130))
* 新生代(Young Generation)使用 Scavenge 垃圾回收器
  
  * 采用 **Cheney** 算法: 将内存的空间分为两个部分, 同一时刻只有一个空间处于使用中. 使用中的叫做 `To-Space`, 不被使用的叫做`From-Space`. 分配对象时先在 `From-Space` 分配, 垃圾回收时检查 `From-Space`的存活对象, 清理非存活对象, 将存活对象复制到 `To-Space`. 复制后空间身份发生对调
* 新生代中的对象会在满足以下条件后被晋升到老生代
  * 第二次从 `from space` 复制到 `to space`
  * 当要从 `from space`复制一个对象到 `to space`时，`to space` 已经使用了超过25%
* 老生代(Old Generation)使用 Full Mark-Compact 垃圾回收器
  
* 默认使用普通的 **Mark-Sweep** (标记-清除): 直接清除不使用的内存, 会带来内存不连续的问题. 所以当空间不足的时候会使用**Mark-Compact** (标记-整理):  清除前将活动对象向内存空间一侧移动, 并清除另一侧.
  
* Scavenge 复制活着的对象, Mark-Sweep 清除死的对象. 活对象在新生代中只占较少部分, 死对象在老生代中只占较少部分, 这就是两种回收方式都能高效处理的原因

* 根据代际假说, 大多数对象在内存中存在的时间都很短, 因此可以直接在新生代里就处理了

* 黑魔法:

  * 并行(Parallel)垃圾回收: 垃圾回收的时候多个线程参与

  ![](https://v8.dev/_img/trash-talk/05.svg)

  * 增量(Incremental)垃圾回收: 主线程间歇性的去做少量的垃圾回收,  类似 React Fiber 的思路

    ![](https://v8.dev/_img/trash-talk/06.svg)

  *  [Concurrent marking(并发标记)](https://v8.dev/blog/concurrent-marking): 通过辅助线程使标记与应用程序尽量同时执行, 避免应用逻辑的暂停

    ![](https://v8.dev/_img/trash-talk/07.svg)

|          |                  新生代                  |                    老生代                    |
| :------: | :--------------------------------------: | :------------------------------------------: |
|   算法   |                Scavenger                 |                标记-清除/整理                |
| 内存占用 | 32位系统大小为 16MB, 64位系统大小为 32MB | 32位系统大小为 700MB , 64位系统大小为 1400MB |
| 存活时间 |                   较短                   |               较长或常住的对象               |

|              | 标记-清除  | 标记-整理  |    Scavenger     |
| :----------: | :--------: | :--------: | :--------------: |
|     速度     |     中     |     慢     |        快        |
|   空间开销   | 少(无碎片) | 少(有碎片) | 双倍空间(无碎片) |
| 是否移动对象 |     否     |     是     |        是        |

## Chrome Task Manager(任务管理器)

打开 More tools > Task manager 可以看到一些基本的内存使用信息

![memory](https://raw.githubusercontent.com/pbdm/img/master/20170221143208_Vs5TPC_Screenshot.jpeg)

* Memory(Memory Footprint): 原生内存, 如果此值正在增大, 说明正在创建 DOM 节点
* JavaScript Memory: JS 堆(heap), 如果 live 数字在增大, 要么是正在创建新对象, 要么是现有对象正在增长

## Chrome Performance

~~旧版 Chrome 叫 Timeline~~. 使用 Performance 调试的时候, 最好在开始和结束 recording 之前点击 Collect garbage 按钮来强制执行内存回收, 以便更好的观察内存泄露情况. 如果 JS 堆大小或节点大小不断增大, 则可能存在内存泄漏, 比如[这个例子](http://pbdm.cc/playground/performance/memory/performance-grow.html). 分析后截图如下

![memory](https://raw.githubusercontent.com/pbdm/img/master/20170221152537_WdxCMR_Screenshot.jpeg)

## Chrome Memory

* 通过 Summary 视图查看大概情况
* 通过 Comparison 视图 比较两次之间的不同查抄泄露的对象
* 通过 Containment 视图查看应用的对象结构的"俯瞰视图"

### Heap Snapshots

detached 的定义:

* 不存在页面的 DOM tree 中
* 仍然有 javascript 逻辑引用(比如一些事件的绑定)

DOM node 想要被内存回收, 必须同时满足以下的条件:

* 不存在页面的 DOM tree 中
* 没有 javascript 逻辑引用

所以如果 DOM node 是 detached 的, 就会造成内存泄露

[一个产生 detached 的代码示例](http://pbdm.cc/playground/performance/memory/heap-detached.html). 分析后截图如下

![memory](https://raw.githubusercontent.com/pbdm/img/master/20170221171504_D1ICtM_Screenshot.jpeg)

* 老版本的显示有颜色高亮提示
  * 黄色: 存在 Javascript 的直接引用
  * 红色: 不存在 Javascript 的直接引用
* Shallow Size(浅层大小): 该对象直接占用内存
* Retained Size(保留大小): 该对象直接占用内存(Shallow Size) + 该对象引用的对象所占用的内存, 当该对象被删除后, GC roots 就无法遍历到这部分内存了
* `@` 字符后面的数字是对象的唯一 ID

### Allocation instrumentation on timeline

~~旧版 Chrome 叫 Allocation Timelines~~. 定期(50ms)拍摄 Heap Snapshots, 可以从时间线的角度查看内存的使用情况

* 蓝色竖线表示在时间线最后对象仍然存活

* 灰色竖线表示对象已在时间线期间分配, 但曾对其进行过垃圾回收(因此不会再下面的面板出现?)

这里有一个[例子](http://pbdm.cc/playground/performance/memory/timeline-grow.html), 分析后截图如下

![memory](https://raw.githubusercontent.com/pbdm/img/master/20170222092032_lNAh7a_Screenshot.jpeg)

### Allocation sampling

~~旧版 Chrome 叫 Allocation Profile~~, 可以从函数调用栈的角度来查看内存使用情况
![memory](https://raw.githubusercontent.com/pbdm/img/master/20170222092633_m0jsDG_Screenshot.jpeg)

## 常见内存泄露原因

### 意外的全局变量

```javascript
function foo(arg) {
  // 如果不在严格模式下, bar 就永远变成了全局变量
  bar = "some text";
}
```

### 无效的 DOM 引用

```javascript
const button = document.getElementById('button');
function click(){
	button.click();
}
function removeImage() {
  // 虽然这里移除了 button, button 变量的引用仍然在内存当中
  document.body.removeChild(document.getElementById('button'));
}
```

### 未销毁的定时器

```javascript
setInterval(function() { ... }, 1000);
```

### 事件监听未移除

```javascript
var element = document.getElementById('button');
element.addEventListener('click', onClick);
//现代浏览器一旦观察到的对象变得无法访问就能回收观察者处理程序(即使侦听器没有被明确删除). 也就是说不用 removeEventListener 了(引用计数到标记清除的转变)
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
```

### [闭包](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)

因为其有权访问外部函数的变量

```javascript
(function(){
    var theThing = null
    var replaceThing = function () {
        var originalThing = theThing
        var unused = function () {
            if (originalThing)
                console.log("hi")
        }
        theThing = {
            longStr: new Array(1000000).join('*'),
            someMethod: function someMethod() {
                console.log('someMessage')
            }
        };
    };
    setInterval(replaceThing,100)
})()
```

unused 是一个闭包, 因为它引用了自由变量 originalThing, 虽然它被没有使用, 但 V8 引擎并不会把它优化掉, 因为 Javascript 里存在 eval 函数, 所以 v8 引擎并不会随便优化掉暂时没有使用的函数.

theThing 引用了 someMethod, someMethod 这个函数作用域隐式的和 unused 这个闭包共享一个闭包上下文. 所以someMethod 也引用了 originalThing 这个自由变量. 

引用链: GCHandler -> replaceThing -> theThing -> someMethod -> originalThing -> someMethod(old) -> originalThing(older)-> someMethod(older)

## 减小内存占用

* [慎用 CSS3 动画属性](https://www.w3cplus.com/animation/gpu-animation-doing-it-right.html)

## Tips

* 根据 V8 内存回收的机制, 对于 Javascript  开发者来说创建生命周期较短的对象的成本是非常低的, 但是对于生命周期较长的对象来说成本是比较高的
* 当 key 是对象的时候(主要是 DOM)考虑使用 WeakMap
* 使用 WeakSet

* 图片占用内存算法
  * RAM = 图宽 × 图高 × 4 (RGBA)
  * 比如分辨率为200 x 200 的图片, 内存占用大概为 200 × 200 × 4 = 160000 Byte = 160KB

> [内存管理 in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
>
> [解决内存问题 by Web Fundamentals (有些旧了, 里面 Chrome 的界面都已经变了)](https://developers.google.com/web/tools/chrome-devtools/memory-problems/)
>
> [常见的JavaScript内存泄露 by zhangsingsong](https://github.com/zhansingsong/js-leakage-patterns/blob/master/常见的JavaScript内存泄露/常见的JavaScript内存泄露.md)

