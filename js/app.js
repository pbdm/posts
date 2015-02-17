'use strict';

window.React       = require('react');
window.ReactRouter = require('react-router');
window.$ = window.jQuery = require('jquery');
window._ = require('lodash');
window.PBDm = require('./function');

require('./plugins/jquery.slideshow');
//require('./plugins/jquery.headanimation');
require('./plugins/jquery.toc');

var Route         = ReactRouter.Route,
    DefaultRoute  = ReactRouter.DefaultRoute,
    NotFoundRoute = ReactRouter.NotFoundRoute;
 

var App      = require('./components/App.react'),
    Index    = require('./components/Index.react'),
    NotFound = require('./components/NotFound.react'),
    Blog     = require('./components/Blog.react'),
    Wiki     = require('./components/Wiki.react'),
    Cv       = require('./components/Cv.react'),
    About    = require('./components/About.react'),
    Football = require('./components/Football.react'),
    List     = require('./components/List.react');

var routes = (
  <Route handler={App}>
    <DefaultRoute name="index"    handler={Index} />
    <Route        name="blog"     handler={Blog} path="blog/:name" />
    <Route        name="wiki"     handler={Wiki} path="wiki/:name" />
    <Route        name="list"     handler={List} path="list/:name" />
    <Route        name="cv"       handler={Cv} />
    <Route        name="about"    handler={About} />
    <Route        name="football" handler={Football} />
    <NotFoundRoute                handler={NotFound} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

require('./custom');
