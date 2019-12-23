# JS 原型

* `Object.prototype.constructor` 返回创建实例对象的 Object 构造函数的引用
  * 也就是说所有继承自 Object 的对象都可以使用这个
* `__proto__` vs `prototype` vs `Object.getPrototypeOf()`
  * `prototype` 是构造函数才有的属性
  * `__proto__` 是实例对象有的属性, 指向构造函数的 prototype
    * `obj.__proto__ === obj.constructor.prototype`
    * `Object.getPrototypeOf(obj) === obj.__proto__`
    * [Object.prototype.__proto__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)已废弃, 建议只使用 `Object.getPrototypeOf()`  

## Object.create

当代码 `var obj = Object.create(parent)` 执行时

* `obj.__proto__ === parent`
  * 一个新对象被创建, 使用现有的对象来提供新创建的对象的 `__proto__`

## new 操作符

当代码 var obj = new parent() 执行时

* `obj.__proto__ === parent.prototype`
  * 一个新对象被创建, 它继承自 parent.prototype
* 构造函数 parent 被执行. 执行的时候, 相应的传参会被传入, 同时上下文(this)会被指定为这个新实例.
  * new parent 等同于 new parent(), 只能用在不传递任何参数的情况
* 如果构造函数返回了一个"对象", 那么这个对象会取代整个 new 出来的结果. 如果构造函数没有返回对象, 那么new出来的结果为步骤1创建的对象
  * ps: 一般情况下构造函数不返回任何值, 不过用户如果想覆盖这个返回值, 可以自己选择返回一个普通对象来覆盖. 当然, 返回数组也会覆盖, 因为数组也是对象.

> [mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

```javascript
// Object, Function 都是由 Function 创建的, 包括 Function 自己
Function.constructor === Function
Function.__proto__ === Function.prototype
Object.constructor === Function
Object.__proto__ === Function.prototype

// Function.prototype 继承自  Object.prototype
Function.prototype.__proto__ === Object.prototype
// Function.prototype 由 Function 构造
Function.prototype.constructor === Function

var F = function(){}
// 函数的 constructor 自然是 Function
F.__proto__ === Function.prototype
F.constructor === Function
// constructor 方法返回创建实例对象的构造函数的引用
F.prototype.constructor === F

var o = {}
o.__proto__ === Object.prototype
// 凭空出来的所有的源头, 不重要...
Object.prototype.__proto__ === null

```

> [JavaScript 内置对象与原型链结构 by harttle, 里面有张图很清晰](https://harttle.land/2015/09/21/js-prototype-chain.html)
>
> [javascript oo 实现 by purplebamboo(古典 oo)](http://purplebamboo.github.io/2014/07/13/javascript-oo-class/)

## instanceof

语法: object instance of constructor`

用来检测 constructor.prototype 是否存在于参数 object 的原型链上

一些特例:

```javascript
"a string" instanceof String === false
true instanceof Boolean === false
0 instanceof Number === false
```
