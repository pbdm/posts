'use strict';

var List = require('../UIs/List.react');
var Post = require('../UIs/Post.react');
var Request = require('../mixins/request');

var Content = React.createClass({
  mixins: [ Request ],

  render: function () {
    if (this.context.router.getCurrentParams().name) {
      return (
        <Post type={this.type} content={this.state.content} list={this.state.list} name={this.context.router.getCurrentParams().name} />
      );
    } else {
      return (
        <List type={this.type} data={this.state.list}/>
      );
    }
  }
});

module.exports = Content;
