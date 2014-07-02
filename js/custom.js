"use strict";
/**
 * [affix description]
 * @param  {[type]} postList [description]
 * @param  {[type]} posts    [description]
 * @return {[type]}          [description]
 */
var affix = function(postList, postContainer) {
	var 
		postsWidth,
		scrollTop;
	if (postList.clientHeight < window.innerHeight) {
		postsWidth = postContainer.clientWidth;
		window.onscroll = function() {
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop //for IE...
			if (scrollTop > postList.offsetTop) {
				postContainer.style.position = "fixed";
				postContainer.style.top = "0px";
				postContainer.style.width = postsWidth + 'px';
			} else {
				postContainer.style.position = "static";
				postContainer.style.width = 'auto';
				postContainer.style.top = 'auto';
			}
		}
	}
}

document.getElementsByClassName("post").length > 0 ?
	affix(document.getElementsByClassName("list")[0], 
		document.getElementsByClassName("list-container")[0])
	:'';

(function($) {
	//head-animation
	$("#head-animation").headAnimation({
		'ratio': -50
	});
	$(".post").toc();
}(jQuery));