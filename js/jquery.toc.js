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
        scrollTop = [],
        top,
        index,
        $ul = $('<ul/>').attr("id", "toc");

      this.find(":header").each(function(){       
        $t = $(this).prop("tagName").toLowerCase();
        $c = $(this).text();
        $(this).attr("id",$c);
        $a = $('<a/>').attr('href', "#" + $c).text($c);
        $li = $('<li/>').addClass("toc-" + $t).append($a);
        $ul.append($li);
        scrollTop.push($(this).offset().top);
      });
      $(".list-container").prepend($ul);

      //auto scroll
      length = scrollTop.length;
      $(window).scroll(function(){
        top = $(window).scrollTop() + 50;
        for(var i=0;i<length;i++){
          if(top <= scrollTop[i]){
            index = i;
            break;
          }
        }
        $('#toc li').removeClass('on');
        if(top >= scrollTop[0]){
          $('#toc li').eq(index - 1).addClass('on');
        }
      });
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