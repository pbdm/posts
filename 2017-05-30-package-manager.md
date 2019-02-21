# JS 包管理工具

## npm

* cnpm
* n vs nvm
  * n 改变版本的时候对应的全局模块不会改变
  * nvm 需要修改环境变量
* [UNPKG](https://unpkg.com)(cdn for npm)
* [npm version(Bump a package version)](https://docs.npmjs.com/cli/version)
  > [npm version source code](https://github.com/npm/npm/blob/latest/lib/version.js)
* `npm link module-name`: 使全局的模块可以在当前目录执行
  * 同时在当前开发的模块内 [npm link](https://docs.npmjs.com/cli/link.html) 也可以方便开发依赖包
* `npm unlink`: aliases of `npm uninstall`

> [用Node.js开发一个Command Line Interface (CLI)](https://zhuanlan.zhihu.com/p/38730825)

* `npm publish`

### update packages

* [npm update](https://docs.npmjs.com/cli/update) 根据 package.json 里的版本号自动升级, 并会修改 package.json
* [npm-check](https://www.npmjs.com/package/npm-check)
* [现阶段 package-lock.json 暂时不推荐使用](http://harttle.land/2017/11/30/npm-package-lock.html)

### 一些好用的包

* [chokidar](https://www.npmjs.com/package/chokidar): 相比 fs.watch 可以监听整个目录
* [rimraf](https://www.npmjs.com/package/rimraf): 全平台支持删除文件
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) xml to js for node
* [XMLDOM](https://github.com/jindw/xmldom): 符合 Web 标准的 DOMParser 对象实现
* [commander](https://github.com/tj/commander.js): 用于写 cli
  * 注意有两种模式
    * 一般模式不的 command 后面不能加第二个解释参数, 需要在 description 后加
    * [Git-style sub-commands](https://github.com/tj/commander.js#git-style-sub-commands): 需要在同级目录下生成 command-xxx
* [fkill](https://github.com/sindresorhus/fkill-cli): 杀进程的时候很有用
* [concurrently: 可以用来同时运行两个 watch](https://github.com/kimmobrunfeldt/concurrently)
  * [这里](https://github.com/mysticatea/npm-run-all/issues/10)有一些类似的包的列表

## Yarn

* [Yarn CLI](https://yarnpkg.com/lang/en/docs/cli/)
* [Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
  * `yarn install` 后, 会尽量的将 node_modules 放到根目录上去, 除非 packages 里的版本和根目录里的版本有冲突
  * Workspaces don’t have their own yarn.lock files, and the root yarn.lock contains all the dependencies for all the Workspaces
  * `yarn workspace <workspace_name> <command>` 可以在指定 workspace 目录下运行命令
  * 一般不允许直接将包安装在 root 的 `package.json` 里
* [Offline mirror](https://yarnpkg.com/blog/2016/11/24/offline-mirror/)
  * 存储一堆压缩后的包
  * `yarn install –offline` 可以保证全部本地安装

* [yarn.lock 添加了 integrity field](https://github.com/yarnpkg/yarn/pull/5042)
  * 貌似和 resolved 后的 hash 字段(从 npm 而来)相比, 一个是 sha512(integrity), 一个是 sha1(resolved)?!
