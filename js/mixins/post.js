'use strict';

module.exports = {
  mixins: [ ReactRouter.State ],
  getInitialState: function() {
    return {
      content: '',
      data:    {},
      list:    []
    };
  },
  componentDidMount: function() {
    this.getData(this.getParams().name);
  },
  componentWillReceiveProps: function() {
    this.getData(this.getParams().name);
  },
  componentDidUpdate: function(prevProps, prevState) {
    PBDm.affix();
    $(".post").toc();
    $('pre code').each(function(i, block) {     
      hljs.highlightBlock(block);
    });
  },
  getData: function(name) {
    var tmp = {};
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
            });
          }
        }.bind(this));
      } else {

      }
    }.bind(this));
  },
}
