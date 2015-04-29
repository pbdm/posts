'use strict';

var Store = require('../stores/Store');

var Loader = React.createClass({

  getLoaderState: function() {
    return {
      isShowLoader: Store.getLoaderState()
    };
  },

  getInitialState: function() {
    Store.addChangeListener(this._onChange);
    return this.getLoaderState()
  },

  _onChange: function() {
    this.setState(this.getLoaderState());
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },

  render: function() {
    if (!this.state.isShowLoader) return null;
    return (
      <div className="backdrop">
        <i className="fa fa-spinner fa-2x" />
      </div>
    );
  },

});

module.exports = Loader;
