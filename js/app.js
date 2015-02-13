'use strict';

var React         = require('react'),
    Router        = require('react-router'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute;
 

var App      = require('./components/App.react'),
    Index    = require('./components/Index.react'),
    NotFound = require('./components/NotFound.react'),
    Blog     = require('./components/Blog.react'),
    Wiki     = require('./components/Wiki.react'),
    Cv       = require('./components/Cv.react'),
    About    = require('./components/About.react'),
    Football = require('./components/Football.react');

var routes = (
  <Route handler={App}>
    <DefaultRoute name="index"    handler={Index} />
    <Route        name="blog"     handler={Blog} />
    <Route        name="wiki"     handler={Wiki} />
    <Route        name="cv"       handler={Cv} />
    <Route        name="about"    handler={About} />
    <Route        name="football" handler={Football} />
    <NotFoundRoute                handler={NotFound} />
  </Route>
);



Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
