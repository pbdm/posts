"use strict";
(function($) {
	//Affix for posts list sidebar
	
		var posts_top = $(".post-list").offset().top;
		var posts = $(".post-list-container");
		var posts_width = posts.width();
		window.onscroll = function(){
			if ($(window).scrollTop() > posts_top) {
				posts.addClass("fixed")
				posts.css("width",posts_width);
			} else {
				posts.removeClass("fixed")
				posts.removeAttr("style");
			}
		}
	
}(jQuery));