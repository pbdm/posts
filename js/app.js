import '../css/style.less';
import Home from './components/Home';
import Post from './components/Post';
import NotFound from './components/NotFound';
import { isPromise } from './lib/util'

class App {
  constructor() {

    this.rootElement = document.getElementById('app');
    this.switcher(window.location.hash);

    window.addEventListener('hashchange', () => {
      this.switcher(window.location.hash);
    });

  }

  render(page) {
    this.clean();
    return page.created && page.created().then((data) => {
      return this.append(data);
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
