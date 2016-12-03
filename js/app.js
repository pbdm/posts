import '../css/style.less';
import Home from './components/Home';
import Post from './components/Post';
import NotFound from './components/NotFound';

class App {
  constructor() {

    this.rootElement = document.getElementById('app');
    this.switcher(window.location.hash);

    // 直接在浏览器改变hash
    window.addEventListener('hashchange', () => {
      this.switcher(window.location.hash);
    });

    // 点击链接改变hash
    document.addEventListener('click', (e) => {
      let url = e.target.href;
      if (url && url.indexOf(location.origin) !== -1) {
        history.pushState('' , '', e.target.href);
        this.switcher(window.location.hash);
        e.preventDefault();
      }
    })
  }

  render(page) {
    this.clean();
    page.created && page.created().then((data) => {
      this.append(data);
    });
  }

  clean() {
    this.rootElement.innerHTML = '';
    this.rootElement.classList.add('loading');
  }

  append(content) {
    this.rootElement.innerHTML = content;
    this.rootElement.classList.remove('loading');
  }

  switcher(hash) {
    hash = hash.replace("#", "");
    let hashArray = hash.split('/');
    hashArray[0] = hashArray[0] || 'home';
    switch (hashArray[0]) {
      case 'home':
        this.render(new Home());
        break;
      case 'posts':
        this.render(new Post(hashArray[1], hashArray[2]));
        break;
      default:
        this.render(NotFound);
    }
  }
}

new App();
