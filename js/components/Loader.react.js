'use strict';

var Loader = React.createClass({
  getInitialState: function() {
    window.toggleLoader = this.toggleLoader;
    return {
      showLoader: false 
    };
  },
  toggleLoader: function() {
    this.setState({ showLoader: !this.state.showLoader });
  },
  render: function() {
    if (!this.state.visible) return null;
    return (
      <div className="backdrop">
        <i className="fa fa-spinner fa-2x" />
      </div>
    );
  }

});

module.exports = Loader;
