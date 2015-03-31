'use strict';

var Loader = React.createClass({

  render: function() {
    if (!this.props.visible) return null;
    return (
      <div className="backdrop">
        <i className="fa fa-spinner fa-2x" />
      </div>
    );
  }

});

module.exports = Loader;
