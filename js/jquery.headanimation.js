;(function ($) {
  "use strict";
  function hideHead(arg) {
    arg.children("div").each(function() {
      $(this).hide();
    });
  }
  var methods = {
    init: function(options) {
      var $this = this;
      return this.each(function () {
        var
          headTop    = this.offsetTop,
          headMid    = this.offsetTop + this.clientHeight/2,
          headBottom = this.clientHeight + this.offsetTop,
          headLeft   = this.offsetLeft,
          headCenter = this.offsetLeft + this.clientWidth/2,
          headRight  = this.clientWidth + this.offsetLeft,
          myX,
          myY,
          defaults = {
            'ratio': 50
          },
          settings = $.extend({}, defaults, options);
        hideHead($this);
        $this.children(".center-center").show();
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
          hideHead($this);
          if (e.clientY < headTop) {
            if (e.clientX < headLeft) {
              $this.children(".top-left").show();
            } else if (e.clientX < headRight) {
              $this.children(".top-center").show();
            } else {
              $this.children(".top-right").show();
            }
          } else if (e.clientY < headBottom) {
            if (e.clientX < headLeft) {
              $this.children(".center-left").show();
            } else if (e.clientX < headRight) {
              $this.children(".center-center").show();
            } else {
              $this.children(".center-right").show();
            }
          } else {
            if (e.clientX < headLeft) {
              $this.children(".bottom-left").show();
            } else if (e.clientX < headRight) {
              $this.children(".bottom-center").show();
            } else {
              $this.children(".bottom-right").show();
            }
          }
        });
      });
    },
  };
  $.fn.headAnimation = function(options) {
    var method = arguments[0];
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method ) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.headanimation');
    }
  }
})(jQuery);