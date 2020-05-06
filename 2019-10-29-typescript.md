# Typescript

* [官方文档](https://www.typescriptlang.org/docs/home.html)
* [中文文档](https://www.tslang.cn/docs/home.html)(有些生涩, 适合作为手册而不是教程)
* [这个教程](https://ts.xcatliu.com/)要比官方文档更好懂些(墙裂推荐...)
* [Tips in 深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/tips/stringBasedEmuns.html)
* 从 3.7 开始[支持](Optional Chaining) `Optional Chaining`
* JS 的新特性进展得那么慢([比如 Decorator](https://github.com/tc39/proposal-decorators#why-is-decorators-taking-so-long)), 感觉TS快要成事实标准了, 文档什么的也都更齐备

## Why to use

* 很多开源的项目都转到 TS(Vue3.0, ant-design), 即使只是为了看懂源码, 也需要去学习了...
* 写的时候可能会多写代码(但是有更良好的代码提示了), 但是维护的时候就香了
* 由 C# 之父 Anders Hejlsberg 发起

## 特性(主要是与 Javascript 的对比)

* 基础
  * `any` 表示任何类型
  * `object` 比 `any` 更严格
  * `void` 多用于无返回值的函数
  * `never`
    * 多用于错误处理和死循环
    * 有的时候定义类型有问题的时候也会出现 never, 这个时候就要注意了
* 更强大的类
  * `interface` 接口
    * `?`: 可选属性
    * `[propName: string]`: 任意属性
    * `readonly`: 只读属性
    * 函数类型接口可以定义函数的参数类型和返回值类型(TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它)
* 重载: 允许一个函数接受不同数量或类型的参数时，作出不同的处理
* Tuple 元组: 包含不同的类型元素的数组
* `enum` 枚举
* Generics 泛型`<T>`: 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
  * [泛型约束](https://ts.xcatliu.com/advanced/generics#fan-xing-yue-shu)
  * [在定义异步请求的时候很有用](https://jkchao.github.io/typescript-book-chinese/typings/generices.html#%E9%85%8D%E5%90%88-axios-%E4%BD%BF%E7%94%A8)
* 交叉类型: 使用 `&` 分隔每个类型, 类似 `mixins`
* 联合类型: 使用 `|` 分隔每个类型
  * 可以和 `type alias`(类型别名, 使用 type 关键字) 一起使用
* 类型断言: `<类型>值` 或 `值 as 类型`
  * [类型断言被认为是有害的](https://jkchao.github.io/typescript-book-chinese/typings/typeAssertion.html#%E7%B1%BB%E5%9E%8B%E6%96%AD%E8%A8%80%E8%A2%AB%E8%AE%A4%E4%B8%BA%E6%98%AF%E6%9C%89%E5%AE%B3%E7%9A%84)
* 类型守卫: 一些表达式, 它们会在运行时检查以确保在某个作用域里的类型
  * `is`
  * `in`
  * `typeof`
  * `instanceof`
* `infer`
* 声明文件(.d.ts)
  * 用于书写第三方库
  * 推荐使用 `@types` 统一管理第三方库的声明文件
    * [第三方维护的声明文件库](https://github.com/DefinitelyTyped/DefinitelyTyped)
  * [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
  * 可以在[这里](https://microsoft.github.io/TypeSearch/)搜索需要的第三库声明文件
  * 可以在 `tsconfig.json` 中配置路径 (`compilerOptions`)
  * `declare`: 声明类型
    * namespace: 不建议在声明文件以外使用，推荐使用 ES6 的模块化方案
      * 用来表示全局变量是一个对象，包含很多子属性
    * `declare module` 扩展原有模块z
  * `export` and `import` 用于导入和导出包里的类型
  * Triple-Slash: 三斜线指令: 不建议在声明文件以外使用
    * 用于不能使用 `import` 时的替代
    * `/// <reference types="jquery" />`
    * `types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖。
  * [这里](https://github.com/microsoft/TypeScript/tree/master/src/lib)可以看到所有内置对象的声明文件
    * 其实有的时候可以通过这个文件来反推 ECMAScript 都需要什么

## 工程

* tsconfig.js 的[定义](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  * [Schema](http://json.schemastore.org/tsconfig)
  * [compilerOptions](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
    * strict: 严格模式
      * 实在不行可通过 `// @ts-ignore` 隐藏错误
      * noImplicitAny 标志是 false(默认值)时， 如果编译器无法根据变量的用途推断出变量的类型，它就会悄悄的把变量类型默认为 any。

### 与 Webpack 一起工作

~~ts-loader vs awesome-typescript-loader~~
直接[使用](http://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#babel) babel 吧

### node.js

* ts-node
* ts-node-dev
  
## Misc

* 最好不要写着写着就写成了 "anyscript"
* 严谨的来说, 当使用 this 的时候, 需要强制指定 this 的类型 (noImplicitThis)
* interface vs type alias(类型别名)
  * 根据开闭原则(尽可能的使在添加新功能的时候容易扩展, 并且不修改源码), 能用 interface 尽量用 interface
  * 尽量保持一致
  * ~~type alias 不能被继承或者实现~~
    * 可以使用交叉类型(&)达到相同的目的
* 关于 Object.keys 的使用, 也许需要[用到](https://stackoverflow.com/questions/52856496/typescript-object-keys-return-string) `keyof`, `typeof`

```javascript
type arrayCardType = 'rank' | 'subject' | 'pics';
// 不能这么写
interface A {
  [key: arrayCardType]: string;
}
// 但可以这么写
type ss = {
  [key in arrayCardType]: string;
};
```

> [Interfaces vs. Type Aliases, (2019-11-19: 注意中文文档还未更新2.7的信息)](https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases)

* [Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkt) 可以方便的用来创建一个类似对象的结构
