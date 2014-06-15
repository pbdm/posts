"use strict";
(function($) {
	//Affix for posts list sidebar
	if ($(".post").length > 0) {
		var 
			postsTop = $(".post-list").offset().top - 10,
			$posts = $(".post-list-container"),
			postsWidth = $posts.width();
		window.onscroll = function(){
			if ($(window).scrollTop() > postsTop) {
				$posts.addClass("fixed")
				$posts.css("width",postsWidth);
			} else {
				$posts.removeClass("fixed")
				$posts.removeAttr("style");
			}
		}
	}
	//head-animation
	$("#head-animation").headAnimation({
		'ratio': -50
	});
}(jQuery));