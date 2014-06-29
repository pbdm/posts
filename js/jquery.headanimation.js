;(function ($) {
  "use strict";
  function hideHead(arg) {
    arg.children("div").each(function() {
      $(this).css("z-index", -1)
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
              $this.children(".top-left").css("z-index", 0);
            } else if (e.clientX < headRight) {
              $this.children(".top-center").css("z-index", 0);
            } else {
              $this.children(".top-right").css("z-index", 0);
            }
          } else if (e.clientY < headBottom) {
            if (e.clientX < headLeft) {
              $this.children(".center-left").css("z-index", 0);
            } else if (e.clientX < headRight) {
              $this.children(".center-center").css("z-index", 0);
            } else {
              $this.children(".center-right").css("z-index", 0);
            }
          } else {
            if (e.clientX < headLeft) {
              $this.children(".bottom-left").css("z-index", 0);
            } else if (e.clientX < headRight) {
              $this.children(".bottom-center").css("z-index", 0);
            } else {
              $this.children(".bottom-right").css("z-index", 0);
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