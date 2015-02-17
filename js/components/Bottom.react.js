'use strict'

var Bottom = React.createClass({
  componentDidMount: function() {
    this.getData();
  },
  getData: function() {
    // http://cn.gravatar.com/630014a2c794d879d6041d84808e3ceb.json
    $.get('json/gravatar.json', function(data) {
      if (this.isMounted()) {
        if (!_.isObject(data)) {
          data = JSON.parse(data);
        }
        PBDm.gravatar(data);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <footer>
        <div className="container">
          <div className="friend-links column">
            <h2>友情链接</h2>
            <a href="http://www.rockimba.com/" target='_blank'>Rock</a>
            <a href="#">某人</a>
          </div>
          <div className="vcard">
            <div className=" column">
              <h2>联系我</h2>
              <a title="Weibo" className="url accounts_weibo" rel="me"><i className="fa fa-weibo"></i></a>
              <a title="Twitter" className="accounts_twitter url" rel="me"><i className="fa fa-twitter-square"></i></a>
              <a title="Facebook" className="accounts_facebook url" rel="me"><i className="fa fa-facebook-square"></i></a>
              <a title="Google+" className="accounts_google url" rel="me"><i className="fa fa-google-plus-square"></i></a>
              <a title="Linkedin" className="accounts_linkedin url" rel="me"><i className="fa fa-linkedin-square"></i></a>
              <a title="Github" className="accounts_github url" rel="me"><i className="fa fa-github-square"></i></a>
              <a title="Email" className="email"><i className="fa fa-envelope-square"></i></a>
            </div>
            <a className="fn"></a>© 2012 - 2014 | Powered by <a href="http://facebook.github.io/react/" target='_blank'>React</a>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Bottom;
