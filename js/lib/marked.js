import marked from 'marked';

const renderer = new marked.Renderer();

renderer.code = (code, lang) => {
  const highlighted = hljs.highlightAuto(code).value;
  return `<pre><code class="hljs">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

export default marked;
