'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link,
    List = require('../UIs/List.react'),
    Post = require('../UIs/Post.react');
    Request = require('../mixins/request');

var Blog = React.createClass({
  mixins: [ Request ],
  getDefaultProps: function() {
    return {
      url: '/dist/wiki.json',
      type: 'wiki'
    };
  },
  render: function () {
    if (this.context.router.getCurrentParams().name) {
      return (
        <Post content={this.state.content} list={this.state.list} name={this.context.router.getCurrentParams().name} />
      );
    } else {
      return (
        <List type={this.props.type} data={this.state.list}/>
      );
    }
  }
});

module.exports = Blog
