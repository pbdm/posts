# Revision Control

* [AngularJS commit conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)

## Git

* [Git官网的中文文档](http://git-scm.com/book/zh)
* [Git教程 by 廖雪峰](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
* [git 使用简易指南](http://www.bootcss.com/p/git-guide/)
* [git 参考手册](http://gitref.org/zh/)
* [Git Cheatsheet • NDP Software](http://ndpsoftware.com/git-cheatsheet.html)
* [根据 commit 自动生成 changelog](https://div.io/topic/2221)
* [submodule is link, subtree is copy](https://stackoverflow.com/questions/31769820/differences-between-git-submodule-and-subtree)

* `git add -i`: 一个好使的add代码到`缓存区(Index)`的工具
* `git add -p` 分块提交到缓存区
* `git checkout -p` 多用于在提交前移除所有新的调试代码
* `git log --name-status` 查看文件修改列表
* `git log -1` 查看最后一个提交
* `git log --all --full-history -- <path-to-file>` [查找某个删除的文件 log](https://stackoverflow.com/questions/7203515/git-how-to-search-for-a-deleted-file-in-the-project-commit-history)
* `git log --follow` 追踪移动过的文件的 log
* `git branch -r` Display a list of remote branches
* `git cherry-pick [commit id]` 将某个commit合并了当前分支
* `git commit --amend --author="Author Name <email@address.com>"` 修改提交人
* `git push origin --delete <branchName>` 删除远程分支
* `git clone http://www.exemple.w --depth=1` 只获取最后提交的 clone
  * `git pull --unshallow` 拿回所有的提交
* `git stash show -p stash@{2}` 查看 stash 详情
* [修改提交作者和邮箱](http://i.dotidea.cn/2015/04/git-amend-author/)
* [tell Git to ignore everything except a subdirectory](https://stackoverflow.com/questions/5533050/gitignore-exclude-folder-but-include-specific-subfolder)
* [Git飞行规则(Flight Rules)](https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-cn.md)
* [安全地回滚远程分支 by Harttle Land](http://harttle.land/2018/03/12/reset-origin-without-force-push.html)
* `git diff HEAD@{yesterday}` `git diff HEAD@{'2010-01-01 12:00:00'}` `git diff HEAD@{'2 months ago'}` 查看固定时间提交之后的修改

> [更方便的用命令行将 git 和 github 结合](https://github.com/github/hub)
>
> [在 git 分支名上使用 slash](https://stackoverflow.com/a/6065944/2307918)

### tig

`r` The refs view, Displays the branches, remotes and tags in the repository.

### config

`core.ignorecase` 是否忽略大小写(如果先前已经存在大小写不同, 本地需要 git mv 才能改变远程的大小写状态...)

[includeIf](https://git-scm.com/docs/git-config#_conditional_includes)在需要配置不同的 git 身份的时候很有用啊...(2.13后支持)

### 打补丁

`git diff` 创建补丁

`git apply` 打补丁

`git apply --index` 打补丁(hash必须正确)

`git apply -R` 还原补丁

### [`reset` and `revert`](http://my.oschina.net/MinGKai/blog/144932)

（默认方式）`git reset –mixed id`是将git的HEAD变了（也就是提交记录变了），但文件并没有改变，（也就是working tree并没有改变）。

`git reset –soft id` 实际上，是git reset –mixed id 后，又做了一次git add

`git reset –hard id` 是将git的HEAD变了，文件也变了。

`git revert`与`git reset`最大的不同是，`git revert` 仅仅是撤销某次提交。

* 如果已经推到远程了还是不要在用`reset`了, 否则需要 `git push -f`,如果同一时间有其他人的提交,则有风险

* 要撤销一串提交可以用 <commit1>..<commit3>(撤销的是 commit 2 和 3) 语法 ex:`git revert --no-commit f7742cd..551c408`,

* [Reverting a Git Merge](https://mijingo.com/blog/reverting-a-git-merge)

### Proxy

`git config --global http.proxy http://127.0.0.1:1080`

`git config --global --unset-all https.proxy`

`git config --local --add http.proxy ""`

## SVN

* 批量删除文件

`svn status|grep ! |awk '{print $2}'|xargs svn del`

* 批量添加文件

`svn status|grep ? |awk '{print $2}'|xargs svn add`

