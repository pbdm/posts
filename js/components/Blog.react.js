'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link,
    Post = require('../mixins/post');

var Blog = React.createClass({
  mixins: [ Post ],
  getDefaultProps: function() {
    return {
      url: '/dist/blog.json'
    };
  },
  render: function () {
    var rawMarkup = converter.makeHtml(this.state.content.toString()),
        listDom = this.state.list.map(function(list, key) {
          return <li key={key}><Link to='blog' params={{name: list.path}}>{list.title}</Link></li>;
        });
    return (
      <div className="container">
        <div className="post" dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <div className="list">
          <div className="list-container">
            <ul>
              {listDom}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Blog
