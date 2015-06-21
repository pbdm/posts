'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _isShowLoader = false;

var _template = '';

var Store = Object.assign({}, EventEmitter.prototype, {

  getLoaderState: function() {
    return _isShowLoader;
  },

  getTemplate: function() {
    return _template;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'showLoader':
      _isShowLoader = true;
      break;
    case 'hideLoader':
      _isShowLoader = false;
      break;
    case 'updateTemplate':
      _template = action.content;
      break;
  }
  
  Store.emitChange();
  
});

module.exports = Store;
