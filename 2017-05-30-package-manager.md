# 包管理工具

## npm

* cnpm
* n vs nvm
  * n 改变版本的时候对应的全局模块不会改变
  * nvm 需要修改环境变量
* [UNPKG](https://unpkg.com)(cdn for npm)
* [npm version(Bump a package version)](https://docs.npmjs.com/cli/version)
  > [npm version source code](https://github.com/npm/npm/blob/latest/lib/version.js)
* `npm link module-name`: 使全局的模块可以在当前目录执行

### update packages

* [npm update](https://docs.npmjs.com/cli/update) 根据 package.json 里的版本号自动升级, 并会修改 package.json
* [npm-check](https://www.npmjs.com/package/npm-check)
* [现阶段 package-lock.json 暂时不推荐使用](http://harttle.land/2017/11/30/npm-package-lock.html)

### 一些好用的包

* [chokidar](https://www.npmjs.com/package/chokidar): 相比 fs.watch 可以监听整个目录
* [rimraf](https://www.npmjs.com/package/rimraf): 全平台支持删除文件
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) xml to js for node

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
