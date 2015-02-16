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
    this.changeWiki(this.getParams().name);
  },
  componentWillReceiveProps: function() {
    this.changeWiki(this.getParams().name);
  },
  componentDidUpdate: function(prevProps, prevState) {
    $(".post").toc();
  },
  changeWiki: function(name) {
    var tmp = {};
    $.get(this.props.url, function(list) {
      if (this.isMounted()) {
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
