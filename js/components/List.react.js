'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link;

var Toc = React.createClass({
  getDefaultProps: function() {
    return {
      list: {},
      type: ''
    };
  },
  render: function () {
    var rawMarkup = converter.makeHtml(this.props.list.content.toString().slice(0,200));
    return (
      <div className="article">
        <h2><Link to={this.props.type} params={{name: this.props.list.path}}>{this.props.list.title}</Link></h2>
        <span className="date">
            {this.props.list.date}
        </span>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <Link to={this.props.type} params={{name: this.props.list.path}}>浏览全文...</Link>
      </div>
    );
  }
});

var List = React.createClass({
  getInitialState: function() {
    return {
      data:    []
    };
  },
  getDefaultProps: function() {
    return {
      type: ''
    };
  },
  componentDidMount: function() {
    this.getData(this.props.type);
  },
  componentWillReceiveProps: function() {
    this.getData(this.props.type);
  },
  componentDidUpdate: function(prevProps, prevState) {
    PBDm.affix();
    $(".post").toc();
    $('pre code').each(function(i, block) {     
      hljs.highlightBlock(block);
    });
  },
  getData: function(name) {
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
    toggleLoader();
    $.get(url, function(data) {
      toggleLoader();
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
                    data: Store
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
        listDom = this.state.data.map(_.bind(function(list, key) {
          return <Toc key={key} list={list} type={this.props.type}/>;
        }, this));
    return (
      <div className="container" id="list">
        {listDom}
        {/*
        <div className="list">
          <div className="list-container">
          </div>
        </div>
        */}
      </div>
    );
  }
});

module.exports = List;
