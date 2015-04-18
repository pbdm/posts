'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link,
    List = require('./List.react'),
    Post = require('../mixins/post');

var Wiki = React.createClass({
  mixins: [ Post ],
  getDefaultProps: function() {
    return {
      url: '/dist/wiki.json'
    };
  },
  render: function () {
    var rawMarkup, listDom;
    if (this.context.router.getCurrentParams().name) {
      rawMarkup = converter.makeHtml(this.state.content.toString()),
      listDom = this.state.list.map(function(list, key) {
        return <li key={key}><Link to='wiki' params={{name: list.path}}>{list.title}</Link></li>;
      });
      return (
        <div className="container">
          <div className="post">
            <h1>{this.context.router.getCurrentParams().name}</h1>
            <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
          </div>
          <div className="list">
            <ul>
              {listDom}
            </ul>
            <div className="list-container">
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <List type="wiki"/>
      );
    }
  }
});

module.exports = Wiki;
