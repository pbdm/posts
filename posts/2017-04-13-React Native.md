# React Native

## 坑

2017.4.13: 今天重新尝试 RN, 于是下午兴高采烈的从 [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) 玩起，可是发现在照着每一步做了之后， 起来的 app 一直 crash, 参见 [so](http://stackoverflow.com/questions/42610070/what-means-of-no-bundle-url-present-in-react-native),
查了3个小时， 发现是因为默认 terminal 启动的时候启动了tmux, 导致 packager server 没有启动。。。

## debug方法

* facebook/react-devtools for inspect elements

> [[React Native] Devtools can't find React within the Web Worker (help wanted) #229](https://github.com/facebook/react-devtools/issues/229#issuecomment-280081973)

## haste module system

> aka: @providesModule, a facebookism
>
> [Instruction in React contributing document](https://facebook.github.io/react/contributing/codebase-overview.html#custom-module-system)

react-web 的作者用 [node-haste](https://github.com/facebookarchive/node-haste/blob/master/src/index.js)(Archived) 改成了，[haste-resolver](https://github.com/yuanyan/haste-resolver/tree/master/src)
并包在了[haste-resolver-webpack-plugin](https://github.com/yuanyan/haste-resolver-webpack-plugin)中

貌似已经去中心化， 在各个使用它的项目中单独实现了, 但是 React [will Get rid of providesModule](https://github.com/facebook/react/issues/6336)

> [node-haste in metro-bundler](https://github.com/facebook/metro-bundler/tree/master/packages/metro-bundler/src/node-haste)
>
> [jest-haste-map](https://github.com/facebook/jest/tree/master/packages/jest-haste-map)
>
> [flegall/haste-map-webpack-resolver](https://github.com/flegall/haste-map-webpack-resolver)

## Native

* `JavaScriptCore`是webkit的一个重要组成部分，主要是对JS进行解析和提供执行环境
* [通信机制](http://blog.cnbang.net/tech/2698/)

* A native module is just an Objective-C class that implements the `RCTBridgeModule` protocol
* React Native bridge is asynchronous
* Linking Libraries

* Podfile: `gem install cocoapods`

## 三端统一

* [react-native-web](https://github.com/necolas/react-native-web)
* [taobaofed/react-web](https://github.com/taobaofed/react-web)
  * [HasteResolverPlugin](https://github.com/yuanyan/haste-resolver-webpack-plugin)在 webpack2 暂时跑不起来

## Performance

* List performance
* LayoutAnimation?
* setNativeProps: directly modify dom(只有rn默认提供的组件有这个方法) , 尽量少用
* [InteractionManager](http://facebook.github.io/react-native/releases/0.43/docs/interactionmanager.html)
  * allows long-running work to be scheduled after any interactions/animations have completed
  * 将比较耗时的异步操作放在这里面
* animation 不需要 setState, 直接使用内置 [api](http://facebook.github.io/react-native/releases/0.43/docs/animations.html) 就好

## Components and APIs

### base components

* Text(span)
* View(div)
* Image(img)

### Lists

* 可配合 RefreshControl 使用
* VirtualizedList
* FlatList: 简单的无限加载list
* SectionList: (FlatList with section(分组))
* ListView(li, ul)
  * 基于ScrollView
  * 所有数据并不一次立即渲染， 但是滚动过程中也不会删除
* ScrollView
  * 最烂的，适合简单的少量的元素
* react-native-sglistview(3rd part)
  * 上下滚动的时候清空不在区域内的cell, 但是保留了cell的根元素
  * 实现嵌套关系：SGListView -> ListView -> ScrollView -> View

### Navigation

* Navigator
* NavigatorIOS(use native)
* react-native-navigation(use native)
* react-navigation(use native)

### 小控件

* Modal
* SegmentedControlIOS(类似选择器， use native)
* Slider
* StatusBar
* Swtich
* TextInput
* ViewPagerAndroid(左右侧滑)
* Webview
* KeyboardAvoidingView
* TabBarIOS
* ToolbarAndroid

### Gesture Responder System

* wrappers
  * TouchableNativeFeedback (android only)
  * TouchableHighlight

  * TouchableOpacity
  * TouchableWithoutFeedback
* Responder Lifecycle
  * ask the view if it wants to become responder
    * onStartShouldSetResponder
    * onMoveShouldSetResponder
  * handlers can be called if the View returns true and attempts to become the responder
    * onResponderGrant
    * onResponderReject
  * handlers can be called if the view is responding
    * onResponderMove
    * onResponderRelease
    * onResponderTerminate
    * onResponderTerminationRequest
  * prevent the child from becoming responder
    * onStartShouldSetResponderCapture
    * onMoveShouldSetResponderCapture
* [PanResopnder](http://facebook.github.io/react-native/releases/0.43/docs/panresponder.html): 更抽象的一个封装, 基于 `InteractionManager`
  * Simply replace the word Responder with PanResponder in each of the typical onResponder* callbacks

> [docs](http://facebook.github.io/react-native/releases/0.43/docs/gesture-responder-system.html)
>
> [“指尖上的魔法” -- 谈谈React-Native中的手势 by jabez128](https://github.com/jabez128/jabez128.github.io/issues/1)

### bases APIS

* AppRegistry
* Linking
* StyleSheet
* Systrace: for debug

### 弹框与交互

* ActionSheetIOS:从屏幕底端弹出的选择框
* Alert
* AlertIOS
* ToastAndroid
* DatePickerAndroid
* TimePickerAndroid
* Share
* StatusBarIOS

### animation

* Easing
* Animated: useNativeDriver
* LayoutAnimation
* Shadow Props(for box-shadow)

### infos

* Geolocation
* AppState
* NetInfo
* PermissionsAndroid
* Settings
* AsyncStorage
* [Platform module](http://facebook.github.io/react-native/releases/0.43/docs/platform-specific-code.html#platform-module)

### image

* ImageEditor
* CameraRoll: needs RCTCameraRoll
* ImagePickerIOS
* ImageStore
* PixelRatio

### Native调用

* Vibration
* Clipboard
* Keyboard
* [requireNativeComponent](https://github.com/facebook/react-native/blob/v0.41.0/Libraries/ReactNative/requireNativeComponent.js): 引入native组件的方法
* NativeMethodsMixin
* PushNotificationIOS
* BackAndroid: 监听安卓回退按钮

## other third part components

* [react-native-elements](https://github.com/react-native-training/react-native-elements)
* react-native-vector-icons
* react-native-smart-pull-to-refresh-listview
* react-native-tableview
* [lottie-react-native](https://github.com/airbnb/lottie-react-native): 动画库

## Source Code Structure

* Libraries: 基本 js 层的实现
  * Components 组件实现
  * Utilities some apis
* ReactAndroid: Android 部分
* ReactCommon: C++ 层的实现
* local-cli: clis

* RNTester: showcases

### metro-bundler

The JavaScript bundler for React Native.
> [github](https://github.com/facebook/metro-bundler)