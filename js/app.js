import Bottom from'./components/Bottom';
// import Top from './components/Top';

import Home from './components/Home';
import About from './components/About';
import Football from './components/Football';
import Post from './components/Post';
import NotFound from './components/NotFound';

let page;

let render = (params, name) => {
  params.setQuery && params.setQuery({
    page: page,
    name: name
  });
  var template = `
    <div id="header">
      <div class="container">
        <a class="logo" href="#/">琥珀草</a>
      </div>
    </div>
    <div class="content" id=${page}>
      ${params.tmpl}
    </div>
    ${Bottom}
    <a class='scroll' href="#top" id="back-to-top">top</div>
  `;
  document.getElementById('app').innerHTML = template;
  NProgress.start();
  params.onLoad && params.onLoad(render);
  // PBDm.responsiveMenu();
  PBDm.btt();
  PBDm.anchorScroll();
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
      render(Football);
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
