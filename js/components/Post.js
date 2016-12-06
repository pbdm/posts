import marked from 'marked';
import BasePage from './BasePage';

export default class Post extends BasePage {

  constructor(type, file) {
    super();
    this.type = type;
    this.file = file;
  }

  b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  fetchPostDetail() {
    return fetch(`https://api.github.com/repos/pbdm/pbdm.github.com/contents/posts/${this.type}/${this.file}?ref=master`)
      .then(response => response.json()).then((data) => {
        return `
          ${marked(this.b64_to_utf8(data.content))}
        `
      });
  }

  created() {
    return this.fetchPostDetail();
  }
}

