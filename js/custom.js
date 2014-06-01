"use strict";
(function($) {
	//Affix for posts list sidebar
	if ($(".post").length > 0) {
		var postsTop = $(".post-list").offset().top - 10;
		var posts = $(".post-list-container");
		var postsWidth = posts.width();
		window.onscroll = function(){
			if ($(window).scrollTop() > postsTop) {
				posts.addClass("fixed")
				posts.css("width",postsWidth);
			} else {
				posts.removeClass("fixed")
				posts.removeAttr("style");
			}
		}
	}
	//head-animation
	var hideHead = function() {
		$("#head-animation > div").each(function(){
			$(this).hide();
		});
	}
	var headAnimation = $("#head-animation")[0];
	var headTop = headAnimation.offsetTop;
	var headBottom = headAnimation.clientHeight+headAnimation.offsetTop;
	var headLeft = headAnimation.offsetLeft;
	var headRight = headAnimation.clientWidth+headAnimation.offsetLeft;
	var myX,myY;
	hideHead();
	$("#head-animation .center-center").show();
	$(document).mousemove(function(e){
	  hideHead();
	  if (e.clientY < headTop) {
	  	if (e.clientX < headLeft) {
		  	$("#head-animation .top-left").show();
		  	console.log('top-left');
		  } else if (e.clientX < headRight){
		  	$("#head-animation .top-center").show();
		  	console.log('top-cente');
		  } else {
		  	$("#head-animation .top-right").show();
		  	console.log('top-right');
		  }
	  } else if (e.clientY < headBottom){
		  if (e.clientX < headLeft) {
		  	$("#head-animation .center-left").show();
		  	console.log('center-left');
		  } else if (e.clientX < headRight){
		  	$("#head-animation .center-center").show();
		  	console.log('center center');
		  } else {
		  	$("#head-animation .center-right").show();
		  	console.log('center-right');
		  }
	  } else {
		  if (e.clientX < headLeft) {
		  	$("#head-animation .bottom-left").show();
		  	console.log('bottom-left');
		  } else if (e.clientX < headRight){
		  	$("#head-animation .bottom-center").show();
		  	console.log('bottom-center');
		  } else {
		  	$("#head-animation .bottom-right").show();
		  	console.log('bottom-right');
		  }
	  }
	});
	//hideHead();
	
}(jQuery));