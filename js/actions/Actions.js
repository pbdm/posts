'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {

  togglePopover: function(type) {
    AppDispatcher.dispatch({
      actionType: type
    });
  },

  updateTemplate: function(tmpl) {
    AppDispatcher.dispatch({
      actionType: 'updateTemplate',
      content: tmpl,
    });
  }

};

module.exports = Actions;
