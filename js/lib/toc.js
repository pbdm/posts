import { delHtmlTag, getScrollingElement } from './util';

// TODO add test code;

export default class Toc { 
  constructor(rootElement, headers, parentClass) {
    this.rootElement = rootElement;
    this.headers = headers || 'h2, h3, h4';
    this.parentClass = parentClass || 'toc';
    this.rootClassName = 'has-toc';
    this.listen = this.listen.bind(this);
    this.listenRaf = this.listenRaf.bind(this);
    // TODO add common function here(onload and onload component)
    // window.addEventListener('load', this.setToc.bind(this));
    this.setToc();
  }

  removeToc() {
    this.rootElement.classList.remove(this.rootClassName);
    window.removeEventListener('scroll', this.listenRaf);
  }

  setToc() {
    let childDoms = this.rootElement.querySelectorAll(this.headers);
    // sometimes we don't need toc
    if (childDoms && childDoms.length > 0) {
      this.tocContent = document.createElement('ul');
      const titleDom = document.createElement('span');
      titleDom.classList.add('title');
      titleDom.innerHTML = '文章目录';
      this.tocContent.appendChild(titleDom);
      this.tocContent.classList.add(this.parentClass);
      this.scrollArray = [];
      // must pust before count child offsetTop
      this.rootElement.classList.add(this.rootClassName);
      for (let childDom of childDoms) {
        // recode list position
        this.scrollArray.push(childDom.offsetTop)
        let tempDom = document.createElement('li');
        tempDom.innerHTML = delHtmlTag(childDom.innerHTML);
        tempDom.classList.add(`${this.parentClass}-${childDom.tagName.toLowerCase()}`);
        this.tocContent.appendChild(tempDom);
      }
      this.rootElement.appendChild(this.tocContent);
      window.addEventListener('scroll', this.listenRaf);
      this.listen();
    }
  }

  listenRaf() {
    window.requestAnimationFrame(this.listen);
  }

  listen() {
    const tocList = this.tocContent.getElementsByTagName('li');
    const scrollArray = this.scrollArray;
    let top = getScrollingElement().scrollTop + scrollArray[0] + 10;
    scrollArray.forEach((value, i) => {
      if ((top > scrollArray[i] && top <= scrollArray[i+1]) ||
        (i === tocList.length - 1 && top > scrollArray[i]) // for the last one
      ) {
        tocList[i].classList.add('on');
      } else {
        tocList[i].classList.remove('on');
      }
    })
  }
}

