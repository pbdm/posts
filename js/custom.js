"use strict";
(function($) {
	//Affix for posts list sidebar
	var postList = document.querySelector(".post-list");
	if (document.querySelector(".post") && postList.clientHeight < window.innerHeight) {
		var 
			posts = document.querySelector(".post-list-container"),
			postsWidth = posts.clientWidth;
		window.onscroll = function(){
			if (document.body.scrollTop > postList.offsetTop) {
				posts.classList.add("fixed");
				posts.style.width = postsWidth + 'px';
			} else {
				posts.classList.remove("fixed");
				posts.style.width = 'auto';
			}
		}
	}
	//head-animation
	$("#head-animation").headAnimation({
		'ratio': -50
	});
}(jQuery));