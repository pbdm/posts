"use strict";

var scrollEventType;
(whichBrowser().firefox) ? scrollEventType = "DOMMouseScroll" : scrollEventType = "mousewheel";

affix();

whichBrowser().ie ? '' : navTop();

(function($) {
	//head-animation
	$("#head-animation").headAnimation({
		'ratio': -50
	});
	$(".post").toc();
  $("#slide-show").slideshow();
}(jQuery));