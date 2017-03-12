import BasePage from './base';

export default class Header extends BasePage {

  constructor() {
    super();
    this.header = `
      <div class='header'>
        <a href="#"><img class='avatar' src='/img/touch-icon.png' alt="pb" /></a>
        <a class='name' href="http://gravatar.com/pbdm915">琥珀草</a>
      </div>
    `;
  }

  renderList(key, data) {
    let template = '';
    const files = data.files;
    if (files) {
      template = `<div class='title'>${key}</div>`;
      files.map ((value)=> {
        template += `<li><a href='#${decodeURIComponent(value.fullpath)}'>${value.title}</a></li>`
      });
    }
    return template;
  }

  fetchPostList() {
    let template = '';
    template += this.header;
    Object.keys(posts).reverse().map((key)=> {
        template += `<div class='post-list'>
          ${this.renderList(key, posts[key])}
        </div>`
    });
    return template;
  }
    
  created() {
    return Promise.resolve(this.fetchPostList());
  }

}


