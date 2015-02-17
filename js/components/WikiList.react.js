'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link,
    List = require('../mixins/list');

var ListBlog = React.createClass({
  getDefaultProps: function() {
    return {
      list: {}
    };
  },
  render: function () {
    var rawMarkup = converter.makeHtml(this.props.list.content.toString().slice(0,200));
    return (
      <div class="article">
        <h2><Link to='wiki' params={{name: this.props.list.path}}>{this.props.list.title}</Link></h2>
        <span class="date">
            {this.props.list.date}
        </span>
        <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <Link to='wiki' params={{name: this.props.list.path}}>浏览全文...</Link>
      </div>
    );
  }
});

module.exports = React.createClass({
  mixins: [ List ],
  getDefaultProps: function() {
    return {
      url: '/dist/wiki.json',
      type: 'wiki'
    };
  },
  render: function () {
    var rawMarkup,
        listDom = this.state.data.map(function(list) {
          return <ListBlog list={list} />;
        });
    return (
      <div id="blog">
          <div className="container">
              <div className="post">
                {listDom}  
              </div>
              <div className="list">
                  <div className="list-container">
                  </div>
              </div>
          </div>
      </div>
    );
  }
});
