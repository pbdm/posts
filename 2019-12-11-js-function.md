
# JS 函数

## 闭包(Closure)

[内部函数总是可以访问其所在的外部函数的作用域，即使在其外部函数被返回（寿命终结）了之后](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)

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
for (var i = 5; i > 0; i--){
  setTimeout(function(){
    console.log(i)
  }, 1000)
}
// 0, 0, 0, 0, 0
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i)
    }, i * 1000)
  })(i)
}
// 5, 4, 3, 2, 1
// for 循环头部的 let 声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量
for(let i = 5; i > 0; i--){
  setTimeout(function(){
    console.log(i)
  }, i * 1000)
}
// 5, 4, 3, 2, 1
```

## this

* `function(){}`: 调用函数时使用的引用决定了函数执行时刻的 this 值
* `() => {}`: 永远指向外层 this

## globalThis

stage3: [globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 可以获取全局对象(通常为 window, self 或者 global)

此特性曾经在提案时命名为 global，但有些网站会因此运行不正常，所以改名为 globalThis

## 尾调用优化(proper tail calls, PTC)

运行过程中当不再用到外层函数的内部变量时, 删除外层函数的调用栈, 只保留内层函数的调用帧

2019-12-18: 目前只有 safari 严格模式下[支持](http://kangax.github.io/compat-table/es6/#test-proper_tail_calls_(tail_call_optimisation)), 其他浏览器的支持还有争论, 于是有另一套[STC proposal](https://github.com/tc39/proposal-ptc-syntax), 大意是在语法上控制优化逻辑

> [尾递归的后续探究](https://imweb.io/topic/5a244260a192c3b460fce275)
>
> [Excuse me？这个前端面试在搞事！](https://zhuanlan.zhihu.com/p/25407758)
>
> [破解前端面试（80% 应聘者不及格系列）：从 闭包说起](https://zhuanlan.zhihu.com/p/25855075)