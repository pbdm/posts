# 游戏引擎

## Cocos Creator(CCC)

* 貌似是基于 electron 的
* [用户手册](https://docs.cocos.com/creator/manual/zh/)
  * [完全和 cocos2d-x 是两个项目了](https://docs.cocos.com/creator/manual/zh/getting-started/cocos2d-x-guide.html#1-%E5%85%B8%E5%9E%8B%E8%AF%AF%E5%8C%BA)
  * [示例项目](https://docs.cocos.com/creator/manual/zh/getting-started/support.html#%E6%BC%94%E7%A4%BA%E5%92%8C%E8%8C%83%E4%BE%8B%E9%A1%B9%E7%9B%AE)
  * [脚本开发指南](https://docs.cocos.com/creator/manual/zh/scripting/)
* [API](https://docs.cocos.com/creator/api/zh/)
  * [cc模块](https://docs.cocos.com/creator/api/zh/modules/cc.html)
* [资源加载逻辑](https://oedx.github.io/2019/03/14/brief-analysis-of-the-cocoscreator-engine-resource-loading-and-release-principle/)
* [微信小游戏资源管理](https://docs.cocos.com/creator/manual/zh/publish/publish-wechatgame.html#%E5%B0%8F%E6%B8%B8%E6%88%8F%E7%8E%AF%E5%A2%83%E7%9A%84%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86)
  * 设置 `REMOTE_SERVER_ROOT`, 在打成微信包后可以在 `wx-downloader` 内找到处理逻辑

### 继承树

* cc.Object
  * cc._BaseNode
    * cc.Node
      * cc.Scene
      * cc.PrivateNode
  * cc.Component
    * cc.AudioSource
    * cc.RenderComponent
      * cc.Mask
      * cc.Sprite
      * cc.Label
      * cc.Graphics
      * cc.ParticleSystem
    * cc.Button
      * cc.Toggle
    * cc.Camera
    * cc.TiledMap
    * cc.TiledLayer
    * cc.TiledObjectGroup
    * cc.TiledTile
    * cc.Animation
    * cc.Layout
    * cc.ScrollView
      * cc.PageView
    * cc.PageViewIndicator
    * cc.ProgressBar
    * cc.RichText
    * cc.Scrollbar
    * cc.Slider
    * cc.ToggleContainer
    * cc.WebView
    * cc.Collider
      * cc.BoxCollider
      * cc.CircleCollider
    * cc.LabelOutline
    * cc.MotionStreak
    * cc.RigidBody
    * cc.Joint
      * cc.RopeJoint
      * cc.MouseJoint
      * cc.MotorJoint
  * cc.RawAsset
    * cc.Asset
      * cc.ParticleAsset
      * cc.JsonAsset
      * cc.BufferAsset
      * cc.AnimationClip
      * cc.AudioClip
      * cc.TextAsset
      * cc.Prefab
      * cc.Texture2D
        * cc.RenderTexture
      * cc.SceneAsset
      * cc.SpriteAtlas
      * cc.SpriteFrame
      * cc.TiledMapAsset
      * cc.Font
        * cc.TTFFont
        * cc.BitmapFont
          * cc.LabelAtlas
      * cc.TypeScript
      * cc.CoffeeScript
      * cc.DragonBonesAsset
* cc.EventTarget
  * cc.Game
  * cc.SystemEvent
  * cc.Director
* cc.Action
  * cc.FiniteTimeAction
* cc.Pipeline
  * cc.loader
* cc.Scheduler
* cc.ValueType
  * cc.Color
  * cc.Rect
  * cc.Vec2
  * cc.Mat4
  * cc.Quat
* cc.Event

### 源码

* [2.0 in github](https://github.com/cocos-creator/engine)
  * cocos2d: 核心代码
    * core
      * components: 组件
      * load-pipeline: 加载逻辑
      * mesh: 网格渲染
      * renderer: 核心渲染引擎
      * value-types: 应该是给 GLSL 用的
    * actions: [动作](https://docs.cocos.com/creator/manual/zh/scripting/action-list.html)
    * animation: 动画
    * audio: 音频
    * compression: 压缩工具
    * particle: [用来读取 粒子资源 数据，并且对其进行一系列例如播放，暂时，销毁等操作](https://docs.cocos.com/creator/manual/zh/components/particle-system.html)
    * renderer
    * tilemap [TiledMap（地图）用于在游戏中显示 TMX 格式的地图](https://docs.cocos.com/creator/manual/zh/components/tiledmap.html)
    * videoplayer: [视频](https://docs.cocos.com/creator/manual/zh/components/videoplayer.html)
    * webview: [网页组件](https://docs.cocos.com/creator/manual/zh/components/webview.html)
  * gulp: 打包逻辑代码
  * index.js: 入口
  * predefine.js: 全局变量设置
* [weapp-adapter](https://github.com/cocos-creator-packages/weapp-adapter)(基于 finson 的改的)

## Cocos2d-x

### cocos2d-html5

* `https://github.com/cocos2d/cocos2d-x` 的 web 目录下为[源码](https://github.com/cocos2d/cocos2d-html5)

## Layabox

* `Layabox` 是知名引擎提供商，旗下 `LayaAir` 引擎是全平台次世代3D引擎
* 源码是用 actionscript 写的

### LayaAir IDE

* 基于 vscode

## Tiny.js

[官网](http://tinyjs.net/)
