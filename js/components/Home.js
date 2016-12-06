import BasePage from './BasePage';
import Config from '../../config';

export default class Home extends BasePage {

  constructor() {
    super();
  }

  renderList(data) {
    let template = '';
    data.map ((value)=> {
      template += `<li><a href='#${decodeURIComponent(value.fullpath)}'>${value.title}</a></li>`
    });
    return template;
  }

  fetchPostList() {
    return `
      <h2>wiki</h2>
      ${this.renderList(posts.wiki)}
      <h2>blog</h2>
      ${this.renderList(posts.blog)}
    `
  }
    
  created() {
    return Promise.resolve(this.fetchPostList());
  }

}

