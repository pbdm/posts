import marked from 'marked';

const renderer = new marked.Renderer();

renderer.code = (code, lang) => {
  const highlighted = hljs.highlightAuto(code).value;
  if (lang === 'seq') {
    return '<div class="seq">'+code+'</div>';
  } else if (lang === 'flow') {
    return '<div class="flow">'+code+'</div>';
  } else {
    return `<pre><code class="hljs">${highlighted}</code></pre>`;
  }
};

marked.setOptions({ renderer });

export default marked;
