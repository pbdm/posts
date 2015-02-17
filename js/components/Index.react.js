'use strict';

var Index = React.createClass({
  componentDidMount: function() {
   jQuery("#slide-show").slideshow();
  },
  render: function () {
    return (
      <div>
        <div id="slide-show">
          <div className="slide" id="slide-1"></div>
          <div className="slide" id="slide-2"></div>
          <div className="container">
            <span className="left arrow"><i className="fa fa-chevron-left"></i>
                  </span>
            <span className="right arrow"><i className="fa fa-chevron-right"></i>
                  </span>
          </div>
        </div>
        {/*<!--     <div id="head-animation">
              <div className="top-left"></div>
              <div className="top-center"></div>
              <div className="top-right"></div>
              <div className="center-left"></div>
              <div className="center-right"></div>
              <div className="bottom-left"></div>
              <div className="bottom-center"></div>
              <div className="bottom-right"></div>
              <div className="center-center"></div>
          </div> -->*/}
      </div>
    );
  }
});

module.exports = Index;
