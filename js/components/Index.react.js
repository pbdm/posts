'use strict';

var Actions = require('../actions/Actions');

var Index = React.createClass({

  getInitialState: function() {
    return {
      blog: [],
      wiki: []
    };
  },

  componentDidMount: function() {
    this.flag = 0 ;
    this.getListData('blog');
    this.getListData('wiki');
  },

  getListData: function(type) {
    var temp;
    var url = 'dist/' + type + '.json';
    Actions.togglePopover('showLoader');
    $.get(url, function(data) {
      if (this.isMounted()) {
        if (!_.isObject(data)) {
          data = JSON.parse(data);
        }
        temp = this.state;
        temp[type] = data;
        this.setState(temp);
        this.flag ++ ;
        this.flag == 2 ?  Actions.togglePopover('hideLoader') : '';
      }
    }.bind(this));
  },

  render: function () {
    var wikiDom = this.state.wiki.map(function(result, key){
      return <li key={key}><a href={'#/wiki/'+ result.path}>{result.title}</a></li>
    });
    var blogDom = this.state.blog.map(function(result, key){
      return <li key={key}><a href={'#/blog/'+ result.path}>{result.title}</a></li>
    });
    return (
      <div className='container'>
        <ul>
          <h2>Blogs</h2>
          {blogDom}
        </ul>
        <ul>
          <h2>Wikis</h2>
          {wikiDom}
        </ul>
      </div>
    );
  }
});

module.exports = Index;
