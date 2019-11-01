# Typescript

* [中文文档](https://github.com/zhongsp/TypeScript)(有些生涩, 适合作为手册而不是教程)
* [这个教程](https://ts.xcatliu.com/)要比官方文档更好懂些(墙裂推荐...)

## Why to use

* 很多开源的项目都转到 TS(Vue3.0, ant-design), 即使只是为了看懂源码, 也需要去学习了...
* 写的时候可能会多写代码(但是有更良好的代码提示了), 但是维护的时候就香了
* 由 C# 之父 Anders Hejlsberg 发起

## Misc

* 最好不要写着写着就写成了 "anyscript"
* 严谨的来说, 当使用 this 的时候, 需要强制指定 this 的类型 (noImplicitThis)

## 特性(主要是与 Javascript 的对比)

* 基础
  * `any` 表示任何类型
  * `object` 比 `any` 更严格
  * `void` 多用于无返回值的函数
  * `never` 多用于错误处理和死循环?!用到的地方不会很多
* 更强大的类
  * `interface` 接口
    * `?`: 可选属性
    * `[propName: string]`: 任意属性
    * `readonly`: 只读属性
    * 函数类型接口可以定义函数的参数类型和返回值类型(TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它)
* 重载: 允许一个函数接受不同数量或类型的参数时，作出不同的处理
* Tuple 元组: 包含不同的类型元素的数组
* `enum` 枚举
* Generics 泛型: 在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
  * [泛型约束](https://ts.xcatliu.com/advanced/generics#fan-xing-yue-shu)
* 联合类型: 使用 `|` 分隔每个类型
  * 可以和 `type`(类型别名) 一起使用
  * 类型断言: `<类型>值` 或 `值 as 类型`
* 类型守卫: 一些表达式, 它们会在运行时检查以确保在某个作用域里的类型
  * `is`
  * `in`
  * `typeof`
  * `instanceof`
* 声明文件(.d.ts)
  * 用于书写第三方库
  * 推荐使用 `@types` 统一管理第三方库的声明文件
  * [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
  * 可以在[这里](https://microsoft.github.io/TypeSearch/)搜索需要的第三库声明文件
  * 可以在 `tsconfig.json` 中配置路径 (`compilerOptions`)
  * `declare`: 声明类型
    * namespace: 不建议在声明文件以外使用，推荐使用 ES6 的模块化方案
      * 用来表示全局变量是一个对象，包含很多子属性
    * `declare module` 扩展原有模块
  * `export` and `import` 用于导入和导出包里的类型
  * Triple-Slash: 三斜线指令: 不建议在声明文件以外使用
    * 用于不能使用 `import` 时的替代
    * `/// <reference types="jquery" />`
    * `types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖。
  * [这里](https://github.com/microsoft/TypeScript/tree/master/src/lib)可以看到所有内置对象的声明文件
    * 其实有的时候可以通过这个文件来反推 ECMAScript 都需要什么

## 工程

* tsconfig.js 的[定义](http://json.schemastore.org/tsconfig)

### 与 Webpack 一起工作

ts-loader vs awesome-typescript-loader
