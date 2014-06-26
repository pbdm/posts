"use strict";
/**
 * [affix description]
 * @param  {[type]} postList [description]
 * @param  {[type]} posts    [description]
 * @return {[type]}          [description]
 */
var affix = function(postList, postContainer) {
	if (postList.clientHeight < window.innerHeight) {
		var postsWidth = postContainer.clientWidth;
		window.onscroll = function() {
			if (document.body.scrollTop > postList.offsetTop) {
				postContainer.classList.add("fixed");
				postContainer.style.width = postsWidth + 'px';
			} else {
				postContainer.classList.remove("fixed");
				postContainer.style.width = 'auto';
			}
		}
	}
}

document.getElementsByClassName("post").length > 0 ?
	affix(document.getElementsByClassName("post-list")[0], 
		document.getElementsByClassName("post-list-container")[0])
	:'';

(function($) {
	//head-animation
	$("#head-animation").headAnimation({
		'ratio': -50
	});
}(jQuery));