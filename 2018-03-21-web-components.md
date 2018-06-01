# Web Components

## Custom Elements

* Custom Elements vs HTMLUnknownElement

```javascript
document.createElement('username') instanceof HTMLUnknownElement;    // 返回值是true
document.createElement('user-name') instanceof HTMLUnknownElement;    // 返回值是false
// 更多的:
document.createElement('div') instanceof HTMLDivElement; // true
document.createElement('span') instanceof HTMLSpanElement; // true
```

> [HTMLUnknownElement与HTML5自定义元素的故事 by 张鑫旭](http://www.zhangxinxu.com/wordpress/2018/03/htmlunknownelement-html5-custom-elements/)