'use strict';

var converter = new Showdown.converter(),
    Link = ReactRouter.Link;

module.exports = React.createClass({
  mixins: [ ReactRouter.State ],
  getInitialState: function() {
    return {
      content: '',
      date:    '',
      title:   '',
      list:    []
    };
  },
  componentDidMount: function() {
    this.changeWiki(this.getParams().name);
  },
  componentWillReceiveProps: function() {
    this.changeWiki(this.getParams().name);
  },
  changeWiki: function(name) {
    var listTmp = [],
        key;
    $.get('/dist/wiki.json', function(list) {
      if (this.isMounted() && list[name]) {
        $.get(list[name].fullpath, function(content) {
          for (key in list) {
            listTmp.push(list[key]);
          }
          if (this.isMounted()) {
            this.setState({
              content: content,
              title: list[name].title,
              date:  list[name].date,
              list: listTmp
            });
          }
        }.bind(this));
      } else {
        
      }
    }.bind(this));
  },
  render: function () {debugger;
    var rawMarkup = converter.makeHtml(this.state.content.toString()),
        listDom = this.state.list.map(function(list) {
          return <li><Link to='wiki' params={{name: list.path}}>{list.title}</Link></li>;
        });
    return (
      <div id="wiki">
        <div className="container">
          <h1>{this.state.title}</h1>
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
