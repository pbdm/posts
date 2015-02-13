'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div id="who">
            <div className="intro-image">
                <h2>我是谁</h2>
            </div>
            <div clsss="intro-acticle">
                <h3>职业</h3>
                码农
                <h3>个人介绍</h3>
                1986年(好老啊)出生于江西, 2012年毕业于巴黎第七大学计算机专业, 目前在平安健康做前端....
                <h3>兴趣爱好</h3>
                堆代码, 看球
            </div>
        </div>
        <div id="inter">
            <div className="intro-image">
                <h2>国际米兰</h2>
            </div>
            <p>
                我是国际米兰的忠实伪球迷(内拉......), 和很多其他的内拉一样, 因为大罗而喜欢国米, 然后是雷科巴, 萨内蒂, 师奶~~
            </p>
        </div>
    </div>
    );
  }
});
