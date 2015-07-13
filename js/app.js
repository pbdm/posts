import Store from './stores/Store';
import Actions from './actions/Actions';

import Bottom from'./components/Bottom';
import Top from './components/Top';

import './plugins/jquery.toc';

import gravatar from '../json/gravatar.json';

import Home from './components/Home';
import About from './components/About';
import Football from './components/Football';
import Post from './components/Post';
import NotFound from './components/NotFound';

let Path = Pathjs.pathjs;
let page;

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
}

Path.map("#/about").to(function() {
  page = 'about';
  render(About);
});

Path.map("#/").to(function() {
  page = 'home';
  render(Home);
});

Path.map("#/football").to(function() {
  page = 'football';
  render(Football);
});

Path.map("#/wiki/:name").to(function() {
  page = 'wiki';
  render(Post, this.params.name);
});

Path.map("#/blog/:name").to(function() {
  page = 'blog';
  render(Post, this.params.name);
});

Path.map("#/local/:name").to(function() {
  page = 'local';
  render(Post, this.params.name);
});

Path.rescue(() => {
  page = 'notfound'
  render(NotFound);

});

Path.root("#/");

Path.listen();

Store.addChangeListener(function(){
  render ({ tmpl : Store.getTemplate() });
});
