"use strict";

var scrollEventType;
(whichBrowser().firefox) ? scrollEventType = "DOMMouseScroll" : scrollEventType = "mousewheel";

// sidebarfix
affix();

// navtop
// whichBrowser().ie ? '' : navTop();

//responsive menu
var navList = document.querySelector("nav .wrapper > ul");
var navMenu = document.getElementsByClassName("fa-list-ul")[0];
navMenu.addEventListener ('click',function() {
  if (getComputedStyle(navList)['height'] == "1px") {
    navList.style.height = "auto";
  } else {
    navList.style.height = "1px";
  }
});

(function($) {
	// head-animation
	// $("#head-animation").headAnimation({
	// 	'ratio': -50
	// });

  // toc
	$(".post").toc();
  
  // slideshow
  $("#slide-show").slideshow();

  // back to top
  var $btt = $('#back-to-top');
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $btt.css("opacity", 1);
    } else {
      $btt.css("opacity", 0);
    }
  });
  $btt.click(function(){
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
}(jQuery));