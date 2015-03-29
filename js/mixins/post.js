'use strict';

module.exports = {
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      content: '',
      data:    {},
      list:    []
    };
  },
  componentDidMount: function() {
    if (this.context.router.getCurrentParams().name) {
      this.getData(this.context.router.getCurrentParams().name);
    }
  },
  componentWillReceiveProps: function() {
    if (this.context.router.getCurrentParams().name) {
      this.getData(this.context.router.getCurrentParams().name);
    }
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
