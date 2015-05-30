'use strict';

// require('./plugins/jquery.slideshow');
// require('./plugins/jquery.headanimation');

require('./plugins/jquery.toc');

var Index    = require('./components/Index.react');
var NotFound = require('./components/NotFound.react');
var About    = require('./components/About.react');
var Football = require('./components/Football.react');
var Post = require('./components/Post.react');

var Top = require('./components/Top.react');
var Bottom = require('./components/Bottom.react');
var Loader = require('./UIs/Loader.react');

var App =  React.createClass({

  getInitialState: function() {
    return {
      nowShowing: 'index',
      name: ''
    };
  },

  componentDidMount: function() {
    var scope = this;
    var router = Director.Router({
      '/': () => { scope.setState({'nowShowing': 'index'});},
      '/about': () => { scope.setState({'nowShowing': 'about'});},
      '/football': () => { scope.setState({'nowShowing': 'football'});},
      '/blog/:name': (name) => {
        scope.setState({
          nowShowing: 'blog',
          name: name
        });
      },
      '/wiki/:name': (name) => {
        scope.setState({
          nowShowing: 'wiki',
          name: name
        });
      },
      '/local/:name': (name) => {
        scope.setState({
          nowShowing: 'local',
          name: name
        });
      }
    });
    router.init('/');
    NProgress.done();
  },

  render: function () {
    var handler;
    switch (this.state.nowShowing) {
      case 'index': 
        handler =  <Index />;
        break;
      case 'about': 
        handler =  <About />;
        break;
      case 'football': 
        handler =  <Football />;
        break;
      case 'blog':
        handler = <Post type={this.state.nowShowing} name={this.state.name} /> 
        break;
      case 'wiki': 
        handler = <Post type={this.state.nowShowing} name={this.state.name} />
        break;
      case 'local': 
        handler = <Post type={this.state.nowShowing} name={this.state.name} />
        break;
      default:
        handler =  <NoteFound />;
    }
    return (
      <div>
        <Top/>
        <div id="header">
          <div className="container">
            <a className="logo" href="/">琥珀草</a>
          </div>
        </div>           
        <div className="content" id={this.state.nowShowing}>
          {handler}
        </div>
        <Bottom/>
        <div id="back-to-top">top</div>
        <Loader />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));
 
require('./custom');
