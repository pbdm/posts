'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link;

var Post = React.createClass({

  getDefaultProps: function() {
    return {
      content: '',
      list: [],
      name: '',
      type: ''
    };
  },

  render: function () {
    var rawMarkup = converter.makeHtml(this.props.content.toString()),
        listDom = this.props.list.map(function(list, key) {
          return <li key={key}><Link to={this.props.type} params={{name: list.path}}>{list.title}</Link></li>;
        }.bind(this));
    return (
     <div className="container">
       <div className='post'>
         <h1>{this.props.name}</h1>
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
