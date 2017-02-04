import BasePage from './BasePage';
// import Config from '../../config';

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
    let template = '';
    const num = Object.keys(posts).length;
    const percentNum = Math.trunc(100/num);
    Object.keys(posts).map((key)=> {
      template += `<div class='post-list' style='width: ${percentNum}%'>
        <h2>${key}</h2>
        ${this.renderList(posts[key])}
      </div>`
    });
    return template;
  }
    
  created() {
    return Promise.resolve(this.fetchPostList());
  }

}

