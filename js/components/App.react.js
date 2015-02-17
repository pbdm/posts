'use strict';

var RouteHandler = ReactRouter.RouteHandler,
    Top = require('./Top.react'),
    Bottom = require('./Bottom.react');

module.exports = React.createClass({
  mixins: [ ReactRouter.State ],
  render: function () {
    return (
      <div>
        <Top/>
        <div id="header">
          <div className="container">
            <a className="logo" href="/">琥珀草</a>
          </div>
        </div>
        <div className="content" id={this.getRoutes()[1].name}>
          <RouteHandler />
        </div>
        <Bottom/>
        <div id="back-to-top">top</div>
      </div>
    );
  }
});
