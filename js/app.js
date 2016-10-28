import '../css/style.less';
import Home from './components/Home';
import Post from './components/Post';
import NotFound from './components/NotFound';

let page;

let render = (params, name) => {
  params.setQuery && params.setQuery({
    page: page,
    name: name
  });
  document.getElementById('app').innerHTML = `${params.tmpl}`;
  params.onLoad && params.onLoad(render);
}

let switcher = (hash) => {
  hash = hash.replace("#", "");
  let hashArray = hash.split('/');
  hashArray[0] = hashArray[0] || 'home';
  switch (hashArray[0]) {
    case ('home'):
      page = 'home';
      render(Home);
      break;
    case 'wiki':
      page = 'wiki';
      render(Post, hashArray[1]);
      break;
    case 'blog':
      page = 'blog';
      render(Post, hashArray[1]);
      break;
    default:
      page = 'notfound'
      render(NotFound);
  }
}

switcher(window.location.hash);

// 直接在浏览器改变hash
window.addEventListener('hashchange', () => {
  switcher(window.location.hash);
});

// 点击链接改变hash
document.addEventListener('click', (e) => {
  let url = e.target.href;
  if (url && url.indexOf(location.origin) !== -1) {
    history.pushState('' , '', e.target.href);
    switcher(window.location.hash);
    e.preventDefault();
  }
})
