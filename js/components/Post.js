import marked from 'marked';
import BasePage from './BasePage';
import Config from '../../config';
import 'whatwg-fetch'

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
    return fetch(`${Config.API}/${this.type}/${this.file}`)
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

