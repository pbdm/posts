# JS 运算

## 数字

### 取整

```javascript
// floor向下取整. 比 parseInt 语义上更好, 严格的来说 parseInt 的第一个参数应该是字符串类型的
Math.floor(0.20); // 0
Math.floor(0.90); // 0
Math.floor(-0.90); // -1
Math.floor(-0.20); // -1
// round四舍五入
Math.round(0.2) // 0
Math.round(0.9) // 1
Math.round(-0.9) // -1
Math.round(-0.2) // 0
// ceil向上取整
Math.ceil(0.2) // 1
Math.ceil(0.9) // 1
Math.ceil(-0.9) // 0
Math.ceil(-0.2) // 0
```

## 数组

* 复制数组
  * 从性能角度来说, 对于 webkit, 使用 `concat`; 其他浏览器, 使用 `slice`
  * var.slice(0)
  * var.concat();
  
* `splice` 与 `slice` 的作用是不同的，`splice` 会直接对数组进行修改, 并返回被删除元素, `slice`不改变原数组

* **坑**: [chrome 里 `Array.prototype.sort()` 当个数大于 10 的时候如果排序函数不完整会出现错误](https://stackoverflow.com/questions/23076776/sorting-an-array-of-more-than-10-objects-in-chrome)
  
  * 这个不能算是 chrome(v8) 的 bug, 因为标准里规定是要把 sort 函数写完整的...( elements that compare equal do not necessarily remain in their original order)
  * [chrome 70(v8.7.0) 的排序算法更 stable 了](https://twitter.com/mathias/status/1036626116654637057)
  
  ```javascript
  function itemSorter() {
    return -1;
  }
  ["a", "b","c", "d", "e", "f", "g", "h", "i", "j", "k"].sort(itemSorter)
  // ["a", "c", "d", "e", "b", "g", "h", "i", "j", "k", "f"]
  ```

> [Alon's blog, 通过对比的方式梳理数组方法](http://jinlong.github.io/2017/02/04/javascript-array-methods-mutating-vs-non-mutating/#more)
