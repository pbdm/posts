
# JS 函数

* 坑: [箭头函数并不暴露 arguments 对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_arguments)

## 闭包(Closure)

[内部函数总是可以访问其所在的外部函数的作用域，即使在其外部函数被返回(寿命终结)了之后](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)

## IIFE

[立即执行的函数表达式(immediately-invoked-function-expression)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/#iife)

```javascript
(function(){
    //code
}());

(function(){
    //code
})();
```

```javascript
for (var i = 0; i < 5; i++){
  setTimeout(function(){
    console.log(i)
  }, 1000)
}
// 1秒后同时输出 5, 5, 5, 5, 5

for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i)
    }, i * 1000)
  })(i)
}
// 每间隔一秒输出 0, 1, 2, 3, 4

// for 循环头部的 let 声明会给每一次循环的变量一个单独的块级作用域
for(let i = 0; i < 5; i++){
  setTimeout(function(){
    console.log(i)
  }, i * 1000)
}
// 每间隔一秒输出 0, 1, 2, 3, 4
```

## this

* `function(){}`: 调用函数时使用的引用决定了函数执行时刻的 this 值
* `() => {}`: 永远指向外层 this

## globalThis

stage3: [globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 可以获取全局对象(通常为 window, self 或者 global)

此特性曾经在提案时命名为 global，但有些网站会因此运行不正常，所以改名为 globalThis

## 尾调用

* 尾调用优化(proper tail calls, PTC)
  * 运行过程中当不再用到外层函数的内部变量时, 删除外层函数的调用栈, 只保留内层函数的调用帧
  * 2019-12-18: 目前只有 safari 严格模式下[支持](http://kangax.github.io/compat-table/es6/#test-proper_tail_calls_(tail_call_optimisation)), 其他浏览器的支持还有争论

*  [STC](https://github.com/tc39/proposal-ptc-syntax): Syntactic Tail Call, 大意是在语法上标识出优化逻辑

* 尾递归优化: **递归之所以能写出比循环可读性更高的代码是因为递归隐含了一个栈, 而用循环实现的时候需要手动维护一个栈导致代码丑且长, 但是尾递归优化恰好就是那个不需要这个栈的特殊情况**

```javascript
// 符合人类思维的阶乘
function factorial(n) {
  if (n === 1) return 1;
	// 这里每次都要保留外部函数的 n 变量
  return n * factorial(n - 1);
}

// 理论上尾调优化后(PTC)的阶乘, 2019-12-18: 只有 safari 严格模式下才支持...
function factorial(n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

// 使用蹦床(trampoline)优化, 和 redux 里的 redux-thunk 很像
// 如果 f 是函数就一直调用, 直到返回不是函数为止, 等于是把递归调用栈换成了循环
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }  
  return f;
}
function factorial(n, total = 1) {
  if (n === 1) return total;
  // 1*5*4*3*2
  return factorial.bind(null, n - 1, n * total);
}
trampoline(factorial(5)) // 120
```

> [尾递归为啥能优化？ by brambles](https://zhuanlan.zhihu.com/p/36587160)
>
> [尾递归的后续探究](https://imweb.io/topic/5a244260a192c3b460fce275)
>
> [Excuse me？这个前端面试在搞事！](https://zhuanlan.zhihu.com/p/25407758)
>
> [破解前端面试（80% 应聘者不及格系列）：从 闭包说起](https://zhuanlan.zhihu.com/p/25855075)
