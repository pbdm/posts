# 动画

* [Easing Functions Cheat Sheet](http://easings.net/)

## JS 动画

## CSS 动画

* transition: 定义过渡
  * transition-property: 应用 transition 属性的名称: all, transfrom, margin-right, width, none......
  * transition-duration: transition 所需的时间: 0s, 3s, 3ms......
  * transition-timing-function: transition的状态变化节奏: ease, ease-in, ease-out, ease-in-out, linear......
  * transition-delay: transition 效果开始作用之前需要等待的时间: 0s, 3s, 3ms......
  * 可以利用 `transitionend` 事件监听 transition 完成

> [使用 CSS transitions by MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

* animation(需要与 keyframes 配合), 比 transition 更灵活
  * animation-name: 指定应用的一系列动画，每个名称代表一个由 `@keyframes`定义的动画序列
  * animation-duration: 动画周期的时长: 0s, 3s, 3ms......
  * animation-timing-function: 每一动画周期中执行的节奏: ease, ease-in, ease-out, ease-in-out, linear......
  * animation-delay: 动画开始之前需要等待的时间: 0s, 3s, 3ms......
  * animation-iteration-count: 动画在结束前运行的次数: 1, 2, 2.3, infinite......
  * animation-direction: 指示动画是否反向播放: normal | reverse | alternate | alternate-reverse
  * animation-fill-mode: none | forwards | backwards | both
    * forwards: 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义)
  * [@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)

* transform(不属于动画范畴, 但是经常和动画一起用, 所以写到这里了): 修改CSS视觉格式模型的坐标空间
  * [transform-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin): 更改一个元素变形的原点, 
    * 可以有 x, y, z 轴三个参数
    * 像 left 这种的属于简写, 等于 0%, center 等于 50%
    * 默认应该是在元素中心

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
