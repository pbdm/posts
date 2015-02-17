'use strict';

var DuoShuo = React.createClass({
  componentDidMount: function() {
    window.duoshuoQuery = {
      short_name: "pbdm"
    };
    debugger;
    var ds = document.createElement("script");
    ds.type = "text/javascript";
    ds.async = true;
    ds.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//static.duoshuo.com/embed.js";
    ds.charset = "UTF-8";
    eval(document.getElementsByTagName("head")[0].appendChild(ds));
  },
  render: function () {
    return (
      <div class="ds-thread" data-thread-key="/wiki/Links" data-title="Links" data-url="请替换成文章的网址"></div>
    );
  }
});

module.exports = DuoShuo;
