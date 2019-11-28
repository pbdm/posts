class: center, middle

# React hooks

---

## 什么是 Hook

* 16.8 版本推出的新特性

```javascript
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

---

## 动机

* 跨组件复用stateful logic(包含状态的逻辑)十分困难
* 复杂的组件难以理解
* 用户和机器都对 Class 的写法难以理解

???

* 一个简单的 useState 的 count + 1 例子
* 添加修改 title 功能(useEffect)
* 添加修改 window.innerWidth 例子(resize listener)
* 虽然貌似加一个类似的生命周期也可以解决这个功能, 所以在 cdm 做了多个 effect 时更清晰
* 举一个通过 custom hooks 公用逻辑里的例子
