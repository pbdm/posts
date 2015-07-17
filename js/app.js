import Store from './stores/Store';
import Actions from './actions/Actions';

import Bottom from'./components/Bottom';
import Top from './components/Top';

// import './plugins/jquery.toc';

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
  NProgress.start();
  params.onLoad ? params.onLoad() : '';
  PBDm.responsiveMenu();
  // PBDm.btt();
  PBDm.gravatar(gravatar);
}

let switcher = (hash) => {
  let hashArray = hash.split('/');
  switch (hashArray[1]) {
    case (''):
      page = 'home';
      render(Home);
      break;
    case 'about':
      page = 'about';
      render(About);
      break;
    case 'football':
      page = 'football';
      render(About);
      break;
    case 'wiki':
      page = 'wiki';
      render(Post, hashArray[2]);
      break;
    case 'blog':
      page = 'blog';
      render(Post, hashArray[2]);
      break;
    case 'local':
      page = 'local';
      render(Post, hashArray[2]);
      break;
    default:
      page = 'notfound'
      render(NotFound);
  }
}

window.addEventListener('hashchange', () => {
  switcher(window.location.hash);
});

window.location.hash ? switcher(window.location.hash) : window.location.hash = '#/';

Store.addChangeListener(function(){
  render ({ tmpl : Store.getTemplate() });
});
