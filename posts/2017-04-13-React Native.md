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
* [lelandrichardson/react-primitives](https://github.com/lelandrichardson/react-primitives)

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

* [react-navigation](https://github.com/react-community/react-navigation)
  * StackNavigator
  * TabNavigator
  * DrawerNavigator
* [aksonov/react-native-router-flux](https://github.com/aksonov/react-native-router-flux)(大家 api 变得都好快，所以这哥们自己写了一个统一的？！)
* [react-native-navigation](https://github.com/wix/react-native-navigation)(use native)
* [airbnb/native-navigation](https://github.com/airbnb/native-navigation)(use native)
* NavigatorIOS(use native)
* ~~Navigator~~(deprecated in 0.44)

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

详见[动画](2017-08-11-animation.md)

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

### Other libs not mention in doc

* [ART](https://github.com/facebook/react-native/tree/master/Libraries/ART)：绘制矢量图形, 但和 svg 的用法不一样, 所以需要用[react-native-svg](https://github.com/react-native-community/react-native-svg)在外面包一下
  * react js 实现：[react-art](https://github.com/facebook/react/tree/master/packages/react-art)
* DeviceEventEmitter
* UIManager

## 第三方组件

* [react-native-elements](https://github.com/react-native-training/react-native-elements)
* react-native-vector-icons
* react-native-smart-pull-to-refresh-listview
* react-native-tableview
* [lottie-react-native](https://github.com/airbnb/lottie-react-native): 动画库

> [native.directory](https://native.directory/)

## 崩溃收集

* packager(metro-bundler)里的的 error-guard.js 定义了 ErrorUtils
* ErrorUtils.setGlobalHandler(ExceptionsManager.handleException) => Libraries/Core/InitializeCore.js
* 当错误发生时，会调用 ErrorUtils.reportFatalError(同时红屏)
  * ExceptionsManager.handleException

## Source Code Structure(0.46.4)

- 在 npm 发布后的目录内
  * Libaries: 基本 和 ios 的实现
    * Components js 层组件实现
    * Utilities some apis
    * Experimental
      * SwipeableListView
    * Core
      * InitializeCore.js 初始化
    * ReactNative
      * YellowBox.js 警告框, overwrited console.warn
  * React: iOS 部分
  * ReactAndroid: Android 部分
  * ReactCommon: C/C++ 层的实现
    * yoga: Facebook 的跨平台 CSS 布局系统， c/c++ 实现
  * local-cli: cli
    * server
      * util
        * debuggerWorker.js 调试工具使用的 service worker, 使用 postMessage 发布 json 通知 native 如何渲染
  * scripts
    * react-native-xcode.sh RNTester/js/RNTesterApp.ios.js, and config xip.io if needed
  * package.json 里面的8个 test script 是用于 [Dockerfile Tests](https://github.com/facebook/react-native/blob/v0.46.4/DockerTests.md)的
- 不在 npm 发布后的目录内
  * RNTester: showcases
    * use `http://xip.io/` for device debug
  * circle.yml: 使用 circle 做持续集成
  * scripts
    * publish-npm.js: publish RN to npm，运行在 circleCI 下

## publish

* ~brew cask install android-sdk~
* ~brew cask install android-ndk~

## cli

* `bundle`: 默认打包
* `unbundle`: android unbundle means create separated files. ios unbundle means create a big file contains mapping table and codes. It is slow for iOS to load multiple small files

> [UNBUNDLING REACT NATIVE UNBUNDLE by Eric Rozell](https://ericroz.wordpress.com/2017/02/24/unbundling-react-native-unbundle/)

## metro-bundler

[The JavaScript bundler for React Native](https://github.com/facebook/metro-bundler), 这里以 v0.7.4 为标准

* 使用 [lerna](https://github.com/lerna/lerna) 管理发布, 使用 npm run build 的时候只是做了一些 flow 的转换，然后复制到build 目录中, npm publish 的时候没有发布 src 目录是因为 `.npmignore` 里配置了

从 `node local-cli/cli.js bundle --entry-file RNTester/js/RNTesterApp.ios.js --bundle-output test.js` 开始打包

- local-cli/cli.js (确认 node 版本， 设置 babel,)
  - local-cli/cliEntry.js
    - local-cli/bundle/bundle.js
      - local-cli/bundle/buildBindle.js

从下面开始进入 metro-bundler 了

- packagerInstance = new Server(options), Server 有 buildBundle 函数， 将在下面的 buildBundle 函数那运行
- outputBundle.build = require('metro-bundler/build/shared/output/bundle').buildBundle; // 这里面应该就是打包的逻辑了

命令行里的 config 放在了 `local-cli/core` 和 `local-cli/util/Config.js`
bundle 的参数放在了 `local-cli/bundle/bundleCommandLineArgs.js`

`local-cli/bundle/output` 在 v0.45后被[移到](https://github.com/facebook/react-native/commit/bea7659762a14b3f30562e98fd6931d6eaa7d6bf)了 `metro-bundler/src/shared/output`

打包完成后的 jsbundle 结构:

* 头部
* `metro-bundler/Resolver/polyfills`
* __d 开头的 模块们
* require(188) InitializeCore (Libraries/Core/InitializeCore.js)
* require(0) 入口模块

![打包完成后的结构](http://techshow.ctrip.com/wp-content/uploads/2016/11/42.png)

### 分包：

* 以Common.js文件为入口打出一个common.android.bundle基础包，并在生成基础包时将打包过程中的ModuleId的关联关系记录到common.json文件中
* 以业务的index.js文件为入口, 用步骤一生成的common.json为基础过滤common.js中存在的module后生成business.js文件。 并为每个不同的业务分配一个业务模块起始的startId 以此进行业务隔离

> [携程 RN 分包方案](http://techshow.ctrip.com/archives/1459.html)
>
> [广发手机证劵App rn 分包](https://zhuanlan.zhihu.com/p/27422107)
