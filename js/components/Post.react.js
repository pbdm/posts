'use strict';

var Actions = require('../actions/Actions');

var Post = React.createClass({

  getDefaultProps: function() {
    return {
      name: '',
      type: ''
    };
  },

  getInitialState: function() {
    return this.setInitState();
  },

  setInitState: function() {
    return {
      content: '',
      list:    []
    };
  },

  componentDidMount: function() {
    this.url = 'dist/' + this.props.type + '.json';
    this.getPostData();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.setInitState);
    this.url = 'dist/' + nextProps.type + '.json';
    this.getPostData();
  },

  componentDidUpdate: function(prevProps, prevState) {
    PBDm.affix();
    $(".post").toc();
    $('pre code').each(function(i, block) {     
      hljs.highlightBlock(block);
    });
  },

  getPostData: function() {
    var tmp = {};
    Actions.togglePopover('showLoader');
    $.get(this.url, function(list) {
      if (this.isMounted()) {
        if (!_.isObject(list)) {
          list = JSON.parse(list);
        }
        tmp = _.filter(list, function(n) {
          return n.path == this.props.name;
        }.bind(this)); 
        $.get(tmp[0].fullpath, function(content) {
          if (this.isMounted()) {
            this.setState({
              content: content,
              list: list
            }, function() {
              Actions.togglePopover('hideLoader');
            });
          }
        }.bind(this));
      } else {

      }
    }.bind(this));
  },

  render: function () {
    var rawMarkup = marked(this.state.content.toString()),
        listDom = this.state.list.map(function(list, key) {
          return <li key={key}>
                    <a href={'#/' + this.props.type + '/'+ list.path}>{list.title}</a>
                 </li>;
        }.bind(this));
    return (
     <div className="container">
       <div className='post'>
         <h1>{decodeURIComponent(this.props.name)}</h1>
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
  }
});

module.exports = Post;
