import markdown from '../lib/markdown';
import BasePage from './base';
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
          ${markdown.render(data)}
        `
      });
  }

  created() {
    return this.fetchPostDetail();
  }

  mounted(element) {
    setGraph();
    // TODO init toc in constructor?
    this.toc = new Toc(element);
  }

  beforeDestroy() {
    this.toc.removeToc();
  }
}

