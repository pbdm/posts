import marked from '../lib/marked';
import BasePage from './BasePage';
import Config from '../../config';
import { get } from '../lib/util';

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
    return get(`${Config.API}/${this.type}/${this.file}`)
      .then((data) => {
        return `
          ${marked(data)}
        `
      });
  }

  created() {
    return this.fetchPostDetail();
  }
}

