'use strict';

var converter = new Showdown.converter({extensions: ['table']}),
    Link = ReactRouter.Link;

var Toc = React.createClass({
  getDefaultProps: function() {
    return {
      list: {}
    };
  },
  render: function () {
    var rawMarkup = converter.makeHtml(this.props.content.toString().slice(0,200));
    return (
      <div className="article">
        <h2><Link to={this.props.type} params={{name: this.props.path}}>{this.props.title}</Link></h2>
        <span className="date">
            {this.props.date}
        </span>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <Link to={this.props.type} params={{name: this.props.path}}>浏览全文...</Link>
      </div>
    );
  }
});

var List = React.createClass({

  getDefaultProps: function() {
    return {
      type: '',
      data: []
    };
  },

  render: function () {
    var rawMarkup,
        listDom = this.props.data.map(_.bind(function(list, key) {
          list.type = this.props.type;
          return <Toc key={key} {...list} />;
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
