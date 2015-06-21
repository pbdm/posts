module.exports =  `
<footer>
  <div class="container">
    <div class="friend-links column">
      <h2>友情链接</h2>
      <a href="http://www.rockimba.com/" target='_blank'>Rock</a>
      <a href="#">某人</a>
    </div>
    <div class="vcard">
      <div class=" column">
        <h2>联系我</h2>
        <a title="Weibo" class="url accounts_weibo" rel="me"><i class="fa fa-weibo"></i></a>
        <a title="Twitter" class="accounts_twitter url" rel="me"><i class="fa fa-twitter-square"></i></a>
        <a title="Facebook" class="accounts_facebook url" rel="me"><i class="fa fa-facebook-square"></i></a>
        <a title="Google+" class="accounts_google url" rel="me"><i class="fa fa-google-plus-square"></i></a>
        <a title="Linkedin" class="accounts_linkedin url" rel="me"><i class="fa fa-linkedin-square"></i></a>
        <a title="Github" class="accounts_github url" rel="me"><i class="fa fa-github-square"></i></a>
        <a title="Email" class="email"><i class="fa fa-envelope-square"></i></a>
      </div>
      <a class="fn"></a>© 2012 - ${new Date().getFullYear()} | Powered by <a href="http://facebook.github.io/react/" target='_blank'>React</a>
    </div>
  </div>
</footer>
`;
