import '../css/style.less';
import Post from './components/Post';
import NotFound from './components/404';
import Nav from './components/nav';
import { isPromise } from './lib/util';

class App {
  constructor() {
    this.BEFORE_DESTOY = 'beforeDestroy';
    this.listenList = [];
    const rootElement = document.getElementById('app');
    this.navElement = document.createElement('nav')
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('container');
    rootElement.appendChild(this.navElement);
    rootElement.appendChild(this.containerElement);
    this.switcher(window.location.hash);
    window.addEventListener('hashchange', () => {
      this.switcher(window.location.hash);
    });
    this.renderNav();
  }

  renderNav() {
    this.render(new Nav(), this.navElement);
  }

  renderContainer(page) {
    this.page = page;
    this.clean();
    this.render(page, this.containerElement);
  }

  listen(key, fn) {
    if (!this.listenList[key]) {
      this.listenList[key] = [];
    }
    this.listenList[key].push(fn);
  }

  trigger() {
    const key = Array.prototype.shift.call(arguments);
    const fns = this.listenList[key];
    if (fns && fns.length !==0) {
      for (let i = 0; i < fns.length; i++) {
        fns[i].apply(this.page, arguments);
      }
      fns.length = 0; // remove all fns once we call it
    }
  }

  render(page, element) {
    const pageValue = page.created();
    if (isPromise(pageValue)) {
      return pageValue.then((data) => {
        this.append(element, data);
        this.listen(this.BEFORE_DESTOY, page[this.BEFORE_DESTOY])
        page.mounted && page.mounted(element);
        return true;
      });
    } else {
      this.append(element, pageValue);
      return true;
    }
  }

  clean() {
    this.containerElement.innerHTML = '';
    this.containerElement.classList.add('loading');
  }

  append(element, content) {
    element.innerHTML = content;
    element.classList.remove('loading');
  }

  switcher(hash) {
    this.trigger(this.BEFORE_DESTOY);
    hash = hash.replace("#", "");
    let hashArray = hash.split('/');
    hashArray[0] = hashArray[0] || 'home';
    switch (hashArray[0]) {
      case 'home':
        this.renderContainer(new Post('', '2017-03-08-intro.md'));
        break;
      case 'posts':
        if (hashArray[2]) {
          this.renderContainer(new Post(hashArray[1], hashArray[2]));
        } else {
          this.renderContainer(new Post('', hashArray[1]));
        }
        break;
      default:
        this.renderContainer(new NotFound());
    }
  }
}

new App();
