# Regular Expression

## 重复限定符

用于匹配前导字符 x 次

* `+`:     x>=1
  * ex: `ph+p`:`php` `phhhp` `phhhhhhp`
* `*`:     x>=0
* `?`:     x=0 or x=1
* `{n}`:   x=n
* `{n,}`:  x>=n
* `{n,m}`: n<=x<=m

## 元字符

* `.`:  匹配除换行符以外的任意字符
* `\d`: 匹配数字, 等价于字符组[0-9]
* `\w`: 匹配字母, 数字, 下划线
* `\s`: 匹配任意的空白符(包括制表符,空格,换行等)
* `\b`: 匹配单词开始或结束的位置
* `^`:  匹配行首(表示从开头开始匹配)
* `$`:  匹配行尾(一般加在模式的字符串尾巴上，表示从尾巴开始匹配)

## 反义元字符

* `\D`:   匹配非数字的任意字符, 等价于[^0-9]
* `\W`:   匹配除字母,数字,下划线之外的任意字符
* `\S`:   匹配非空白的任意字符
* `\B`:   匹配非单词开始或结束的位置
* `[^x]`: 匹配除x以外的任意字

## 字符组

* `[...]`: 匹配中括号内字符之一. 如: [xyz] 匹配字符 x, y 或 z.
  * 如果中括号中包含元字符, 则元字符降级为普通字符, 不再具有元字符的功能, 如 [+.?] 匹配 加号, 点号或问号.
* `[^...]`: 匹配任何未列出的字符,. 如: [^x] 匹配除x以外的任意字符.

## 多选结构

* `|`: 表示两者中的一个. 如: a|b 匹配a或者b字符.

## 其他

* `()`: 括号常用来界定重复限定符的范围, 以及将字符分组. 如: (ab)+ 可以匹配abab..等, 其中 ab 便是一个分组.
* `\`:  转义字符通常 \ * + ? | { [ ( ) ] }^ $ . # 和 空白 这些字符都需要转义.

## 操作符的运算优先级

识别正则的技巧也是按照优先级由上往下识别

* \ 转义符
* (), (?:), (?=), [] 圆括号或方括号
* *, +, ?, {n}, {n,}, {n,m} 限定符
* ^, $ 位置
* | “或” 操作

## 贪婪模式

默认情况下, 所有的限定词都是贪婪模式, 表示尽可能多的去捕获字符; 而在限定词后增加`?`, 则是非贪婪模式, 表示尽可能少的去捕获字符

## 捕获性分组

通常由一对小括号加上子表达式组成. 捕获性分组会创建反向引用, 每个反向引用都由一个编号或名称来标识, js中主要是通过 $+编号 或者 \+编号 表示法进行引用

## 复杂用法

* 分组
* 引用
* 零宽断言

## 举例

* `.*` 前导任意字符0个或多个

## Javascript

使用 Extended Regular Expression 风格的正则表达式

* javascript 里的修饰符
  * `g` (全文查找)
  * `i` (忽略大小写查找)
  * `m` (多行查找)
  * `y` (ES6新增的粘连修饰符) 不同之处在于, g修饰符只要剩余位置中存在匹配即可, 而y修饰符确保匹配必须从剩余的第一个位置开始
  * `u` (ES6新增) 提供了对正则表达式添加4字节码点的支持

* RegExp

> [Regexper - 将正则表达式转化为图形工具](http://www.regexper.com)