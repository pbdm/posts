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
    if (this.context.router.getCurrentParams().name) {
      this.getPostData(this.context.router.getCurrentParams().name);
    } else {
      this.getListData(this.props.type);
    }
  },

  componentWillReceiveProps: function() {
    this.setState(this.setInitState);
    if (this.context.router.getCurrentParams().name) {
      this.getPostData(this.context.router.getCurrentParams().name);
    } else {
      this.getListData(this.props.type);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    PBDm.affix();
    $(".post").toc();
    $('pre code').each(function(i, block) {     
      hljs.highlightBlock(block);
    });
  },

  getListData: function(name) {
    var key,
        flag = 0,
        Store = [],
        url;
    switch (name) {
      case 'blog':
        url = 'dist/' +  name + '.json';
      case 'wiki':
        url = 'dist/' +  name + '.json';
    }
    Actions.togglePopover('showLoader');
    $.get(url, function(data) {
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

  getPostData: function(name) {
    var tmp = {};
    Actions.togglePopover('showLoader');
    $.get(this.props.url, function(list) {
      if (this.isMounted()) {
        if (!_.isObject(list)) {
          list = JSON.parse(list);
        }
        tmp = _.filter(list, function(n) {
          return n.path == name;
        }); 
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
