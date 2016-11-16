import BasePage from './BasePage';

export default class Home extends BasePage {

  constructor() {
    super();
  }

  renderList(data) {
    let template = '';
    data.map ((value)=> {
      template += `<li><a href='#${value.path}'>${value.name}</a></li>`
    });
    return template;
  }

  fetchFromGithub(type) {
    return fetch(`https://api.github.com/repos/pbdm/pbdm.github.com/contents/posts/${type}?ref=master`).then(response => response.json()).then((data) => {
      return data;
    });
  }

  fetchPostList() {
    return Promise.all([this.fetchFromGithub('wiki'), this.fetchFromGithub('blog')]).then((data) => {
      return `
      <h2>wiki</h2>
      ${this.renderList(data[0])}
      <h2>blog</h2>
      ${this.renderList(data[1])}
    `
    })  
  }
    
  created() {
    return this.fetchPostList();
  }

}

