import markdown from 'markdown-it';

const md = markdown({
  highlight: function (code, lang) {
    const highlighted = hljs.highlightAuto(code).value;
    if (lang === 'seq') {
      return '<div class="seq">'+code+'</div>';
    } else if (lang === 'flow') {
      return '<div class="flow">'+code+'</div>';
    } else {
      return `<pre><code class="hljs">${highlighted}</code></pre>`;
    }
  }
});

export default md;
