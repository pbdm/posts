import marked from 'marked';
import PBDm from '../function';

let query = {};

let getPostList = (render) => {
  // PBDm.get(query.url, (list) => {
    let list = posts[query.page];
    let tmp = list.filter( (n) => {
      return n.path === query.name;
     });
    tmp.length > 0 ? getPostDetail(tmp, list, render) : postNotFound(render);
    // });
};

const getPostDetail = (tmp, list, render) => {
  PBDm.get(tmp[0].fullpath, (content) => {
    let tmpl = renderContent(query, content, list);
    render ({ tmpl : tmpl });
    PBDm.affix();
    // $(".post").toc();
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

const getListTmpl = (type, data) => {
  let template = '';
  data.map ((result)=> {
    template += `<li><a href='#${type}/${result.path}'>${result.title}</a></li>`
  });
  return template;
};

const renderContent = (query, content, list) => {
  return `
    <div class="container">
      <div class='post typo'>
        <h1 class='title'>${decodeURIComponent(query.name)}</h1>
        <div>${marked(content)}</div>
      </div>
      <div class="list">
        <ul>
          ${getListTmpl(query.page, list)}
        </ul>
        <div class="list-container">
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
