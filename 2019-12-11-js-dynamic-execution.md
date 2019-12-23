# JS 动态执行

## eval()

* [将传入的字符串当做 JavaScript 代码进行执行(evaluate), 并返回代码执行后的返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)
  * 返回值
    * 参数是字符串
      * 返回最后一个表达式的值
    * 参数不是字符串
      * 将参数原封不动地返回 (`new String("2 + 2")`)

## new Function()

* Function 构造函数创建一个新的 Function 对象, 直接调用此构造函数可用动态创建函数

## eval() vs new Function()

* **`eval()` 可以访问局部作用域, `new Function()` 不能访问局部作用域**
  * 由于 `eval()` 访问局部作用域, 意味着第三方代码可以看到某一个 `eval()` 被调用时的作用域
  * 任意一个 eval 的使用都会强制浏览器进行冗长的变量名称查找, 以确定变量在机器代码中的位置并设置其值, 所以 eval 的效率很低
* 从 ECMAScript 5 起, 如果间接的使用 `eval()`(`var geval = eval`), 则它工作在全局作用而不是局部作用域.
  * 所以 `geval(xxx)` 类似于 `Function(xxx)()`

> [Are eval() and new Function() the same thing?](https://stackoverflow.com/questions/4599857/are-eval-and-new-function-the-same-thing)
