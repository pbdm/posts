; (function($) {
  "use strict";
  var $slides, n, num, timer, settings;

  function change(m) {
    $slides.eq(n).css("opacity", 0);
    m ? n++ : n--;
    n > num ? n = 0 : "";
    n < 0 ? n = num : "";
    $slides.eq(n).css("opacity", 1);
  }

  function setTimer() {
    clearInterval(timer);
    timer = setInterval(function() {
        change(false);
      },
      settings.delay);
  }
  var methods = {
    init: function(options) {
      var defaults = {
        "delay": 5000
      };
      settings = $.extend({},
        defaults, options);
      $slides = this.children(".slide");
      num = $slides.length - 1;
      n = num;

      this.children(".slide").each(function() {
        $(this).css("opacity", 0);
      });
      change(false);

      this.find(".left").click(function() {
        change(true);
        setTimer();
      });
      this.find(".right").click(function() {
        change(false);
        setTimer();
      });
      setTimer();
    },
  };
  $.fn.slideshow = function() {
    var method = arguments[0];
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.headanimation");
    }
  };
})(jQuery);

