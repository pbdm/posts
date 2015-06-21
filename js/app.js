import Store from './stores/Store';
import Actions from './actions/Actions';

import Bottom from'./components/Bottom';
import Top from './components/Top';

import './plugins/jquery.toc';
// require('./plugins/jquery.slideshow');
// require('./plugins/jquery.headanimation');

import gravatar from '../json/gravatar.json';

let Path = Pathjs.pathjs;
let page;

Store.addChangeListener(function(){
  render ({ tmpl : Store.getTemplate() });
});

let components = {
  home: require('./components/Home'),
  about: require('./components/About'),
  football: require('./components/Football'),
  post: require('./components/Post'),
  notfound: require('./components/NotFound')
}

let render = (params, name) => {
  params.setQuery ? params.setQuery({
    page: page,
    name: name
  }) : '';
  var template = `
    ${Top}
    <div id="header">
      <div class="container">
        <a class="logo" href="/">琥珀草</a>
      </div>
    </div>           
    <div class="content" id=${page}>
      ${params.tmpl}
    </div>
    ${Bottom}
    <div id="back-to-top">top</div>
  `;
  document.getElementById('app').innerHTML = template;
  params.onLoad ? params.onLoad() : '';
  PBDm.responsiveMenu();
  PBDm.btt();
  PBDm.gravatar(gravatar); 
  NProgress.done();
}

Path.map("#/about").to(function() {
  page = 'about';
  render(components.about);
});

Path.map("#/").to(function() {
  page = 'home';
  render(components.home);
});

Path.map("#/football").to(function() {
  page = 'football';
  render(components.football);
});

Path.map("#/wiki/:name").to(function() {
  page = 'wiki';
  render(components.post, this.params.name);
});

Path.map("#/blog/:name").to(function() {
  page = 'blog';
  render(components.post, this.params.name);
});

Path.map("#/local/:name").to(function() {
  page = 'local';
  render(components.post, this.params.name);
});

Path.rescue(() => {
  page = 'notfound'
  render(components.notfound);

});

Path.root("#/");

Path.listen();
