# Decorator

## 标准进程

* 2016-12-17: [Still in draft(Stage 2)](https://github.com/wycats/javascript-decorators/blob/master/README.md)
  * A decorator is
    * an expression
    * that evaluates to a function
    * that takes the target, name, and decorator descriptor as arguments
    * and optionally returns a decorator descriptor to install on the target object
* 2019-12-09: Stage 2
  * 但是貌似已经改得和 Draft 时[不太一样了](https://github.com/tc39/proposal-decorators#how-does-this-proposal-compare-to-other-versions-of-decorators)
* [Decorator proposal in TC39](https://github.com/tc39/proposal-decorators)

## 实现

* [@babel/plugin-proposal-decorators(Babel legacy decorators)](https://babeljs.io/docs/plugins/transform-decorators/#example-simple-class-decorator)
  * Simple class decorator
  * Class decorator
  * Class function decorator, 和 HOC 有类似的参数
* [Decorators in Typescript](https://www.tslang.cn/docs/handbook/decorators.html)
  * 2019-12-10: 需要启用 `experimentalDecorators`, 可用于
    * 类
    * 方法
      * 参数: target, key, descriptor
    * 访问器(get, set)
    * 属性
    * 参数
