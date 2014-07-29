// slideshow
;(function ($) {
  "use strict";
  function change(n, l, m) {
    m ? n++ : n--;
    n > l ? n = 0 : '';
    n < 0 ? n = l : ''; 
    return n;
  }
  var methods = {
    init: function(options) {
      var 
        $this = this,
        $slides = $this.find(".slide"),
        num = $slides.length,
        n = num - 1;
      $this.children(".slide").each(function() {
        $(this).css("opacity", 0);
      });
      $slides.eq(n).css("opacity", 1);
      $this.find(".left").click(function(){
        $slides.eq(n).css("opacity", 0);
        n = change(n, num - 1, true);
        $slides.eq(n).css("opacity", 1);
      });
      $this.find(".right").click(function(){
        $slides.eq(n).css("opacity", 0);
        n = change(n, num - 1, false);
        $slides.eq(n).css("opacity", 1);
      });
    },
  };
  $.fn.slideshow = function(options) {
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