import marked from 'marked';
import PBDm from '../function';

let query = {};

let getPostList = (render) => {
  let list = posts[query.page];
  let tmp = list.filter( (n) => {
    return n.path === query.name;
    });
  tmp.length > 0 ? getPostDetail(tmp, list, render) : postNotFound(render);
};

const getPostDetail = (tmp, list, render) => {
  PBDm.get(tmp[0].fullpath, (content) => {
    let tmpl = renderContent(query, content, list);
    render ({ tmpl : tmpl });
    PBDm.affix();
    PBDm.toc(document.getElementById('post-content'), document.getElementById('toc'));

    // highlight
    for (let block of document.querySelectorAll('pre code')) {
      hljs.highlightBlock(block);
    }
    NProgress.done();
  });
};

const postNotFound = (render) => {
  let tmpl = `
    <div class="container">
      文章不存在
    </div>
  `;
  render ({ tmpl : tmpl });
  NProgress.done();
}

const renderContent = (query, content, list) => {
  return `
    <div class="container">
      <div class='post typo'>
        <h1 class='title'>${decodeURIComponent(query.name)}</h1>
        <div id='post-content'>${marked(content)}</div>
      </div>
      <div class='list'>
        <div class='list-container'>
          <div id='toc'></div>
        </div>
      </div>
    </div>
  `;
};

module.exports = {
  tmpl: '',

  onLoad: (render) => {
    getPostList(render);
  },

  setQuery: (params) => {
    query = params;
    query.url = `dist/${params.page}.json`;
  }
};
