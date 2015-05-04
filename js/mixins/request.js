'use strict';

var Actions = require('../actions/Actions');

module.exports = {

  contextTypes: {
    router: React.PropTypes.func
  },

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
    this.setData();
    this.queryData();
  },

  setData: function() {
    this.type = this.context.router.getCurrentRoutes()[1].name;
    this.url = 'dist/' + this.type + '.json';
    this.name = this.context.router.getCurrentParams().name;
  },

  queryData: function() {
    if (this.name) {
      this.getPostData();
    } else {
      this.getListData();
    }
  },

  componentWillReceiveProps: function() {
    this.setState(this.setInitState);
    this.setData();
    this.queryData();
  },

  componentDidUpdate: function(prevProps, prevState) {
    PBDm.affix();
    $(".post").toc();
    $('pre code').each(function(i, block) {     
      hljs.highlightBlock(block);
    });
  },

  getListData: function() {
    var key,
        flag = 0,
        Store = [];
    Actions.togglePopover('showLoader');
    $.get(this.url, function(data) {
      if (this.isMounted()) {
        if (!_.isObject(data)) {
          data = JSON.parse(data);
        }
        for (key in data) {
          (function() {
            var tmp = data[key];
            $.get(tmp.fullpath, function(content) {
              if (this.isMounted()) {
                flag++;
                tmp.content = content;
                Store.push(tmp);
                if (flag == data.length) {
                  this.setState({
                    list: Store
                  }, function() {
                    Actions.togglePopover('hideLoader');
                  });
                }
              }
            }.bind(this));
          }.bind(this)());
        }
      }
    }.bind(this));
  },

  getPostData: function() {
    var tmp = {};
    Actions.togglePopover('showLoader');
    $.get(this.url, function(list) {
      if (this.isMounted()) {
        if (!_.isObject(list)) {
          list = JSON.parse(list);
        }
        tmp = _.filter(list, function(n) {
          return n.path == this.name;
        }.bind(this)); 
        $.get(tmp[0].fullpath, function(content) {
          if (this.isMounted()) {
            this.setState({
              content: content,
              data: tmp[0],
              list: list
            }, function() {
              Actions.togglePopover('hideLoader');
            });
          }
        }.bind(this));
      } else {

      }
    }.bind(this));
  }

}
