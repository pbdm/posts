'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {

  togglePopover: function(type) {
    AppDispatcher.dispatch({
      actionType: type
    });
  }

};

module.exports = Actions;
