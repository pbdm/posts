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
        <div className='post'>
          <h1>{this.getParams().name}</h1>
          <div dangerouslySetInnerHTML={{__html: rawMarkup}} />
          <DuoShuo name={this.getParams().name}/>
        </div>
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
