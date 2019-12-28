# JS 迭代器

JavaScript 实现了 `Symbol.iterator` 作为 Iterator protocol(迭代协议)

```javascript
// iterator 伪代码
[Symbol.iterator] = function() {
  return {
    next: function() {
      return {
        value: xxx/undefined
        done: true/false
      }
    }
  }
};
// 举例
const numbersArray = [1, 2, 3];
// numbersArray.__proto__.Symbol.iterator
let iterator = numbersArray[Symbol.iterator]();
iterator.next(); // 输出 {value: 1, done: false}
iterator.next(); // 输出 {value: 2, done: false}
iterator.next(); // 输出 {value: 3, done: false}
iterator.next(); // 输出 {value: undefined, done: true}
```

* 可迭代对象的对象或者原型链上必须有 Symbol.iterator 的属性, 包括 `Array, Map, Set, String, TypedArray, arguments, NodeList`, 不包括 `Object`
  * 开脑洞的话可以在 Object.prototype 上基于 Generator 手写一个 Symbol.iterator

## 用于可迭代对象的语法

* `for of`
* spread operator(三个点...)
* 解构赋值(Destructuring assignment)

## 不用于可迭代对象的语法

* `for in`
  * 以任意顺序遍历一个对象的除Symbol以外的可枚举属性(`Object.getOwnPropertyDescriptor(obj, "key").enumerable === true`)
  * `for in` 会把原型链里的东西都遍历出来, 只有用`hasOwnProperty`多判断一遍才不会, `

```javascript
for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(`obj.${prop} = ${obj[prop]}`);
  }
}
```

## Generator(生成器对象)

`function* ()` 可以实例化出一个 iterator. 通过 next() 方法, 每次只会执行里面的 yield 语句, 其中传递给 next(param) 的参数值会被yield接收

Generator 有中断代码的特性, 于是可以帮助我们来控制异步代码的执行顺序

* [facebook's regenerator](http://facebook.github.io/regenerator/) 实现了 generator 函数到 ES5 函数的转换

> [从 for of 聊到 Generator by dendoink](https://juejin.im/post/5c40484bf265da61171cfb4d)
