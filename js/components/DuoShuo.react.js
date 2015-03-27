'use strict';

var DuoShuo = React.createClass({
  componentDidMount: function() {
    window.duoshuoQuery = {
      short_name: "pbdm"
    };
    var ds = document.createElement("script");
    ds.type = "text/javascript";
    ds.async = true;
    ds.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//static.duoshuo.com/embed.js";
    ds.charset = "UTF-8";
    eval(document.getElementsByTagName("head")[0].appendChild(ds));
  },
  render: function () {
    return (
      <div className="ds-thread" data-thread-key={this.props.name} data-title={this.props.name} data-url={this.props.name}></div>
    );
  }
});

module.exports = DuoShuo;
