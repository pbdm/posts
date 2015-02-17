'use strict'

module.exports = React.createClass({
  render: function () {
    return (
      <nav>
        <div className="wrapper">
          <div className="responsive-nav">
            <i className="fa fa-list-ul fa-2x"></i>
            <div className="nav-info" ng-hide="dialogIsHidden" ng-controller="dateCtrl" my-current-time on-close="hideDialog()"></div>
          </div>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#bloglist">Blog</a></li>
            <li><a href="#wiki/links">Wiki</a></li>
            <li><a href="#football">Football</a></li>
            <li><a href="#about">About me</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});
