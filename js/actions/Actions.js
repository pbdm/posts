'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {

  updateTemplate: function(tmpl) {
    AppDispatcher.dispatch({
      actionType: 'updateTemplate',
      content: tmpl,
    });
  }

};

module.exports = Actions;
