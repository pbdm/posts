;(function ($) {
  "use strict";
  $.fn.headAnimation = function(options) {
    var 
      $this = this,
      settings = $.extend({
        'ratio': 50
      }, options);
    
    function hideHead() {
      $("#head-animation > div").each(function() {
        $(this).hide();
      });
    }

    return this.each(function () {
      var
        headTop    = this.offsetTop,
        headMid    = this.offsetTop + this.clientHeight/2,
        headBottom = this.clientHeight + this.offsetTop,
        headLeft   = this.offsetLeft,
        headCenter = this.offsetLeft + this.clientWidth/2,
        headRight  = this.clientWidth + this.offsetLeft,
        myX,
        myY;
      hideHead();
      $("#head-animation .center-center").show();
      $(document).mousemove(function(e) {
        myX = (e.clientX - headCenter) / settings.ratio;
        myY = (e.clientY - headMid) / settings.ratio;
        $this.css({
          "transform"         : "translate(" + myX + "px," + myY + "px)",
          "-webkit-transform" : "translate(" + myX + "px," + myY + "px)",
          "-ms-transform"     : "translate(" + myX + "px," + myY + "px)",
          "-moz-transform"    : "translate(" + myX + "px," + myY + "px)",
          "-o-transform"      : "translate(" + myX + "px," + myY + "px)",
        });
        hideHead();
        if (e.clientY < headTop) {
          if (e.clientX < headLeft) {
            $("#head-animation .top-left").show();
          } else if (e.clientX < headRight) {
            $("#head-animation .top-center").show();
          } else {
            $("#head-animation .top-right").show();
          }
        } else if (e.clientY < headBottom) {
          if (e.clientX < headLeft) {
            $("#head-animation .center-left").show();
          } else if (e.clientX < headRight) {
            $("#head-animation .center-center").show();
          } else {
            $("#head-animation .center-right").show();
          }
        } else {
          if (e.clientX < headLeft) {
            $("#head-animation .bottom-left").show();
          } else if (e.clientX < headRight) {
            $("#head-animation .bottom-center").show();
          } else {
            $("#head-animation .bottom-right").show();
          }
        }
      });
    });
  }
})(jQuery);