'use strict'

var Top = React.createClass({
  render: function () {
    return (
      <nav>
        <div className="wrapper">
          <div className="responsive-nav">
            <i className="fa fa-list-ul fa-2x"></i>
          </div>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#wiki">Wiki</a></li>
            <li><a href="#football">Football</a></li>
            <li><a href="#about">About me</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Top;
