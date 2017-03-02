import '../css/style.less';
import Home from './components/Home';
import Post from './components/Post';
import NotFound from './components/NotFound';
import Header from './components/header';

class App {
  constructor() {
    this.BEFORE_DESTOY = 'beforeDestroy';
    this.listenList = [];
    this.rootElement = document.getElementById('app');
    this.headerElement = document.getElementsByTagName('header')[0];
    this.switcher(window.location.hash);
    window.addEventListener('hashchange', () => {
      this.switcher(window.location.hash);
    });
    this.renderHeader();
  }

  renderHeader() {
    this.headerElement.innerHTML = Header;
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

  render(page) {
    this.page = page;
    this.clean();
    // TODO verify promise
    return page.created && page.created(this).then((data) => {
      this.append(data);
      this.listen(this.BEFORE_DESTOY, page[this.BEFORE_DESTOY])
      page.mounted && page.mounted(this);
      return true;
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
    this.trigger(this.BEFORE_DESTOY);
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
