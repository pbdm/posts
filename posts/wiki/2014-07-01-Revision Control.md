## Git
* `git add -i`: 一个好使的add代码到`缓存区(Index)`的工具
* `git log --name-status` 查看文件修改列表
* `git log -1` 查看最后一个提交
* `git branch -r` Display a list of remote branches

###打补丁
`git diff` 创建补丁

`git apply` 打补丁

`git apply --index` 打补丁(hash必须正确)

`git apply -R` 还原补丁

### [`reset` and `revert`](http://my.oschina.net/MinGKai/blog/144932)
`git reset –mixed id`是将git的HEAD变了（也就是提交记录变了），但文件并没有改变，（也就是working tree并没有改变）。

`git reset –soft id` 实际上，是git reset –mixed id 后，又做了一次git add

`git reset –herd id` 是将git的HEAD变了，文件也变了。

`git revert`与`git reset`最大的不同是，`git revert` 仅仅是撤销某次提交。

## SVN
* 批量删除文件
`svn status|grep ! |awk '{print $2}'|xargs svn del`
* 批量添加文件
`svn status|grep ? |awk '{print $2}'|xargs svn add`