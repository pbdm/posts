import Actions from '../actions/Actions';

let query = {};

let getPostData = () => {
  $.get(query.url, (list) => {
    let tmp = list.filter( (n) => { 
      return n.path == query.name;
     });
    $.get(tmp[0].fullpath, (content) => {
      Actions.updateTemplate(render(query, content, list)); 
      PBDm.affix();
      $(".post").toc();
      $('pre code').each( (i, block) => {     
        hljs.highlightBlock(block);
      });
      NProgress.done();
    });
   
  });
};

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
      <div class='post'>
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
    NProgress.start();
    getPostData();
  },

  setQuery: (params) => {
    query = params;
    query.url = `dist/${params.page}.json`;
  }
};