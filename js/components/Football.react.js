'use strict';

var DuoShuo = require('./DuoShuo.react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      football: '/json/football.json'
    };
  },
  componentDidMount: function() {
    var parent = document.getElementsByClassName("team")[0];
    jQuery.get(this.props.football, function(data) {
      if (this.isMounted()) {
        for (var i in data.teams) {
          PBDm.drawPlayGround(parent, data.meazza, data.m, data.teams[i]);
        }
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div className="container">
        <div id="football">
          <div className="team" playground>
          </div>
        </div>
      <DuoShuo />
      </div>
    );
  }
});
