'use strict';

var Football = React.createClass({
  getDefaultProps: function() {
    return {
      football: '/json/football.json'
    };
  },
  componentDidMount: function() {
    var parent = document.getElementsByClassName("team")[0];
    toggleLoader();
    $.get(this.props.football, function(data) {
      toggleLoader();
      if (this.isMounted()) {
        if (!_.isObject(data)) {
          data = JSON.parse(data);
        }
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
      </div>
    );
  }
});

module.exports = Football;
