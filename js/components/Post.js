import Actions from '../actions/Actions';

let query = {};

let getPostList = () => {
  PBDm.get(query.url, (list) => {
    let tmp = list.filter( (n) => {
      return n.path == query.name;
     });
    tmp.length > 0 ? getPostDetail(tmp, list) : postNotFound();
  });
};

let getPostDetail = (tmp, list) => {
  PBDm.get(tmp[0].fullpath, (content) => {
    Actions.updateTemplate(render(query, content, list));
    PBDm.affix();
    // $(".post").toc();
    for (let block of document.querySelectorAll('pre code')) {
      hljs.highlightBlock(block);
    }
    NProgress.done();
  });
};

let postNotFound = () => {
  Actions.updateTemplate(`
    <div class="container">
      文章不存在
    </div>
  `);
  NProgress.done();
}

let getListTmpl = (type, data) => {
  let template = '';
  data.map ((result)=> {
    template += `<li><a href='#/${type}/${result.path}'>${result.title}</a></li>`
  });
  return template;
};

let render = (query, content, list) => {
  return `
    <div class="container">
      <div class='post typo'>
        <h1>${decodeURIComponent(query.name)}</h1>
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

  onLoad: () => {
    getPostList();
  },

  setQuery: (params) => {
    query = params;
    query.url = `dist/${params.page}.json`;
  }
};
