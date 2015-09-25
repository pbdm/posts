let tmpl = {
  wiki: '',
  blog: ''
}

let getListData = (type, render) => {

  PBDm.get(`dist/${type}.json`, (data) => {
    tmpl[type] = getListTmpl(type, data);
    if (tmpl.wiki && tmpl.blog) {
      let content = renderContent(tmpl.blog, tmpl.wiki);
      render ({ tmpl : content });
      NProgress.done();
    }
  });
};

let renderContent = (blog = '', wiki = '') => {
  return `
    <div class='container'>
      <ul>
        <h2>Blogs</h2>
        ${blog}
      </ul>
      <ul>
        <h2>Wikis</h2>
        ${wiki}
      </ul>
    </div>
  `;
};

let getListTmpl = (type, data) => {
  let template = '';
  data.map ((result)=> {
    template += `<li><a href='#/${type}/${result.path}'>${result.title}</a></li>`
  });
  return template;
};

module.exports = {
  tmpl: '',

  onLoad: (render) => {
    getListData('blog', render);
    getListData('wiki', render);
  }
};
