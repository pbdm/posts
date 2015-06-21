import Actions from '../actions/Actions';

let tmpl = {
  wiki: '',
  blog: ''
}

let getListData = (type) => {
  
  $.get(`dist/${type}.json`, (data) => {
    tmpl[type] = getListTmpl(type, data);
    if (tmpl.wiki && tmpl.blog) {
      Actions.updateTemplate(render(tmpl.blog, tmpl.wiki));
      NProgress.done();
    }
  });
};

let render = (blog = '', wiki = '') => {
  return `
    <div className='container'>
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
  
  onLoad: () => {
    NProgress.start();
    getListData('blog');
    getListData('wiki');
  }
};
