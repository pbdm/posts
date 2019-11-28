# JS 语法

## for

* `for in` 会把原型里的东西都遍历出来, 只有用`hasOwnProperty`多判断一遍才不会, `for` 不会
* for 循环头部的 let 声明会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明。 随后的每个迭代都会使用上一个迭代结束时的值在初始化这个变量

## 闭包(Closure)

内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。
> [mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Closures)

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

## 动态执行

* `eval`: evaluates a string as a JavaScript expression within the current execution scope and can access local variables.
* `new Function()`: parses the JavaScript code stored in a string into a function object, which can then be called. It cannot access local variables because the code runs in a separate scope.

* eval 天生可以访问局部作用域
* new Function() 不能访问局部作用域
* 如果间接的使用 eval()，比如通过一个引用来调用它，而不是直接的调用 eval 。 从 ECMAScript 5 起，它工作在全局作用域下，而不是局部作用域中。

> [以 eval() 和 new Function() 执行JavaScript代码](https://www.jianshu.com/p/db7ec7b51933)
>
> [Are eval() and new Function() the same thing?](https://stackoverflow.com/questions/4599857/are-eval-and-new-function-the-same-thing)