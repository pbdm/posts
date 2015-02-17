'use strict';

var BlogStore = require('../stores/BlogStore');
var WikiStore = require('../stores/WikiStore');

module.exports = {
  mixins: [ ReactRouter.State ],
  getInitialState: function() {
    return {
      data:    []
    };
  },
  componentDidMount: function() {
    this.getList();
  },
  componentDidUpdate: function(prevProps, prevState) {
    $(".post").toc();
  },
  getList: function(name) {
    var key,
        flag = 0,
        Store;  
    switch (this.props.type) {
      case 'blog':
        Store = BlogStore;
      case 'wiki':
        Store = WikiStore;
    }

    $.get(this.props.url, function(data) {
      if (this.isMounted()) {
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
                    data: Store.getAll()
                  });
                }
              }
            }.bind(this));
          }.bind(this)());
        }
      }
    }.bind(this));
  },
}
