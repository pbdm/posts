// table of content
;(function ($) {
  "use strict";
  var methods = {
    init: function(options) {
      var 
        $t,
        $c,
        $a,
        $li,
        $ul = $('<ul/>').attr("id", "toc");

      this.children(":header").each(function(){       
        $t = $(this).prop("tagName").toLowerCase();
        $c = $(this).text();
        $(this).attr("id",$c);
        $a = $('<a/>').attr('href', "#" + $c).text($c);
        $li = $('<li/>').addClass("toc-" + $t).append($a);
        $ul.append($li);
      });
      $(".list-container").prepend($ul);
    },
  };
  $.fn.toc = function(options) {
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