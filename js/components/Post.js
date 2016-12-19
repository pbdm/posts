import marked from '../lib/marked';
import BasePage from './BasePage';
// import Config from '../../config';
import { get } from '../lib/util';
import { setGraph } from '../lib/graph';
import Toc from '../lib/toc';

export default class Post extends BasePage {

  constructor(type, file) {
    super();
    this.type = type;
    this.file = file;
  }

  fetchPostDetail() {
    return get(`/posts/${this.type}/${this.file}`)
      .then((data) => {
        return `
          ${marked(data)}
        `
      });
  }

  created() {
    return this.fetchPostDetail();
  }

  mounted(root) {
    setGraph();
    // TODO init toc in constructor?
    this.toc = new Toc(root.rootElement);
  }

  beforeDestroy() {
    this.toc.removeToc();
  }
}

