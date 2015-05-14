'use strict';

// require('./plugins/jquery.slideshow');
// require('./plugins/jquery.headanimation');
require('./plugins/jquery.toc');

var Route         = ReactRouter.Route,
    DefaultRoute  = ReactRouter.DefaultRoute,
    NotFoundRoute = ReactRouter.NotFoundRoute;
 

var App      = require('./components/App.react'),
    Index    = require('./components/Index.react'),
    NotFound = require('./components/NotFound.react'),
    Content  = require('./components/Content.react'),
    Cv       = require('./components/Cv.react'),
    About    = require('./components/About.react'),
    Football = require('./components/Football.react'),
    Tq       = require('./components/Tq.react');

var routes = (
  <Route handler={App}>
    <DefaultRoute name="index"    handler={Index} />
    <Route        name="blog"     handler={Content} path="blog/?:name?" />
    <Route        name="wiki"     handler={Content} path="wiki/?:name?" />
    <Route        name="cv"       handler={Cv} />
    <Route        name="tq"       handler={Tq} />
    <Route        name="about"    handler={About} />
    <Route        name="football" handler={Football} />
    <NotFoundRoute                handler={NotFound} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

require('./custom');
