import PBDm from '../function';

let tmpl = {
  wiki: '',
  blog: ''
}

let getListData = (type, render) => {
  tmpl[type] = getListTmpl(type, posts[type]);
  if (tmpl.wiki && tmpl.blog) {
    let content = renderContent(tmpl.blog, tmpl.wiki);
    render ({ tmpl : content });
    NProgress.done();
  }
};

let renderContent = (blog = '', wiki = '') => {
  return `
    <div class='container'>
      <ul>
        <h2>Wiki</h2>
        ${wiki}
      </ul>
      <ul>
        <h2>Blog</h2>
        ${blog}
      </ul>
    </div>
  `;
};

let getListTmpl = (type, data) => {
  let template = '';
  data.map ((result)=> {
    template += `<li><a href='#${type}/${result.path}'>${result.title}</a></li>`
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
