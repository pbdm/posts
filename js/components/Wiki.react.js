'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link,
    Post = require('../mixins/post');

module.exports = React.createClass({
  mixins: [ Post ],
  getDefaultProps: function() {
    return {
      url: '/dist/wiki.json'
    };
  },
  render: function () {
    var rawMarkup = converter.makeHtml(this.state.content.toString()),
        listDom = this.state.list.map(function(list) {
          return <li><Link to='wiki' params={{name: list.path}}>{list.title}</Link></li>;
        });
    return (
      <div id="wiki">
        <div className="container">
          <h1>{this.state.data.title}</h1>
          <div className="post" dangerouslySetInnerHTML={{__html: rawMarkup}} />
          <div className="list">
            <div className="list-container">
              <ul>
                {listDom}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
