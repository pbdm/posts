# 动画

* [Easing Functions Cheat Sheet](http://easings.net/)

## JS 动画

## CSS 动画

animation-fill-mode: forwards 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。

## React Native 动画

* [Easing](https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js): 不同的过度曲线, 可在 `Animate.timing()` 中设置, js 实现可扩展。

* [Animated](http://facebook.github.io/react-native/docs/animated.html):
  * `let animatedValue = annew Animated.Value(0)`: 构造函数， 创建初始值
  * `Animated.timing(animatedValue, {toValue, duration, easing, delay})`: 推动一个值按照一个过渡曲线(Easing)而随时间变化
  * `Animated.decay()`: 推动一个值以一个初始的速度和一个衰减系数逐渐变为0
  * `Animated.spring(animatedValue, {toValue, frication, tension, speed})`: Spring animation based on [Rebound](http://facebook.github.io/rebound/) and [Origami](http://origami.design/)
  * `useNativeDriver`: Uses the native driver when true. Default false

  * `Animated.parallel(arrayOfAnimations)`: 同时开始动画数组里的全部动画
  * `Animated.sequence()`: 按顺序开始
  ![Animated.sequence](https://camo.githubusercontent.com/9b3b0b92845fadae9cbc6a063db6518d10a182bd/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a4b514450566578673579767a73585a5f5267314767672e676966)
  * `Animated.stagger(arrayOfAnimations)`: 同时执行（重叠）
  ![Animated.stagger](https://cdn-images-1.medium.com/max/1600/1*JpcaEIiX4YKmOHJgvZlszg.gif)

  * `AnimatedValue.interpolate()`: input ranges to map to different output ranges

* [LayoutAnimation](http://facebook.github.io/react-native/docs/animations.html#layoutanimation-api)
  * Automatically animates views to their new positions when the next layout happens(布局变化的时候自动触发动画)
  * 在 setState 前调用即可

* Shadow Props(for box-shadow)

> [详解 React Native 动画 by dwqs](https://github.com/dwqs/blog/issues/41)
>
> [ReactNative动画研究与实践 by Tw93](https://zhuanlan.zhihu.com/p/21301314)

## lottie

> [lottie json 的定义](https://github.com/airbnb/lottie-web/tree/master/docs/json)