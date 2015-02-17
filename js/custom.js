"use strict";

var scrollEventType;
(PBDm.whichBrowser().firefox) ? scrollEventType = "DOMMouseScroll": scrollEventType = "mousewheel";

// sidebarfix
PBDm.affix();

// navtop
// whichBrowser().ie ? '' : navTop();
//responsive menu
PBDm.responsiveMenu();

(function($) {
  // head-animation
  // $("#head-animation").headAnimation({
  //  'ratio': -50
  // });
  // toc
  //$(".post").toc();

  // back to top
  var $btt = $("#back-to-top");
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $btt.css("opacity", 1);
    } else {
      $btt.css("opacity", 0);
    }
  });
  $btt.click(function() {
    $("html, body").animate({
        scrollTop: 0
      },
      500);
  });
}(jQuery));


