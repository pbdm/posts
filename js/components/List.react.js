'use strict';

var Actions = require('../actions/Actions');

var Toc = React.createClass({
  getDefaultProps: function() {
    return {
      list: {}
    };
  },
  render: function () {
    var rawMarkup = marked(this.props.content.toString().slice(0,200));
    return (
      <div className="article">   
        <h2>
           <a href={'#/' + this.props.type + '/'+ this.props.path}>{this.props.title}</a>
        </h2>
        <span className="date">
            {this.props.date}
        </span>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <a href={'#/' + this.props.type + '/'+ this.props.path}>浏览全文...</a>
      </div>
    );
  }
});

var List = React.createClass({

  getDefaultProps: function() {
    return {
      type: ''
    };
  },

  getInitialState: function() {
    return this.setInitState();
  },

  setInitState: function() {
    return {
      list: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.setInitState);
    this.url = 'dist/' + nextProps.type + '.json';
    this.getListData();
  },

  componentDidMount: function() {
    this.url = 'dist/' + this.props.type + '.json';
    this.getListData();
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

  render: function () {
    var rawMarkup,
        listDom = this.state.list.map(_.bind(function(list, key) {
          list.type = this.props.type;
          return <Toc key={key} {...list} />;
        }, this));
    return (
      <div className="container" id="list">
        {listDom}
      </div>
    );
  }
});

module.exports = List;
