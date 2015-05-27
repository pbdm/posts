'use strict';

var Actions = require('../actions/Actions');

module.exports = {

  getInitialState: function() {
    return this.setInitState();
  },

  setInitState: function() {
    return {
      content: '',
      data:    {},
      list:    []
    };
  },

  componentDidMount: function() {
    this.url = 'dist/' + this.props.type + '.json';
    this.queryData();
  },

  queryData: function() {
    if (this.props.name) {
      this.getPostData();
    } else {
      this.getListData();
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState(this.setInitState);
    this.url = 'dist/' + nextProps.type + '.json';
    this.queryData();
  },

  componentDidUpdate: function(prevProps, prevState) {
    PBDm.affix();
    $(".post").toc();
    $('pre code').each(function(i, block) {     
      hljs.highlightBlock(block);
    });
  },

}
