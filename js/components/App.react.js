'use strict';

var RouteHandler = ReactRouter.RouteHandler,
    Top = require('./Top.react'),
    Bottom = require('./Bottom.react'),
    Loader = require('./Loader.react');

var App =  React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    window.toggleLoader = this.toggleLoader;
    return {
      showLoader: false 
    };
  },
  toggleLoader: function() {
    this.setState({ showLoader: !this.state.showLoader });
  },
  render: function () {
    return (
      <div>
        <Top/>
        <div id="header">
          <div className="container">
            <a className="logo" href="/">琥珀草</a>
          </div>
        </div>
               
        <div className="content" id={this.context.router.getCurrentRoutes()[1].name}>
          <RouteHandler />
        </div>
        <Bottom/>
        <div id="back-to-top">top</div>
        <Loader visible={this.state.showLoader} />
      </div>
    );
  }
});

module.exports = App;
