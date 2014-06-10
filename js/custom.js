"use strict";
(function($) {
	//Affix for posts list sidebar
	if ($(".post").length > 0) {
		var postsTop = $(".post-list").offset().top - 10;
		var $posts = $(".post-list-container");
		var postsWidth = $posts.width();
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
	var hideHead = function() {
		$("#head-animation > div").each(function(){
			$(this).hide();
		});
	}
	var $headAnimations = $("#head-animation");
	var $headAnimation = $headAnimations[0];
	var headTop = $headAnimation.offsetTop;
	var headMid = $headAnimation.offsetTop+$headAnimation.clientHeight/2;
	var headBottom = $headAnimation.clientHeight+$headAnimation.offsetTop;
	var headLeft = $headAnimation.offsetLeft;
	var headCenter = $headAnimation.offsetLeft+$headAnimation.clientWidth/2;
	var headRight = $headAnimation.clientWidth+$headAnimation.offsetLeft;
	var myX,myY;
	var Ratio = -50;
	hideHead();
	$("#head-animation .center-center").show();
	$(document).mousemove(function(e){
		myX = (e.clientX - headCenter)/Ratio;
		myY = (e.clientY - headMid)/Ratio;
		$headAnimations.css({
			"transform"        : "translate(" + myX + "px," + myY + "px)",
			"-webkit-transform": "translate(" + myX + "px," + myY + "px)",
			"-ms-transform"    : "translate(" + myX + "px," + myY + "px)",
			"-moz-transform"   : "translate(" + myX + "px," + myY + "px)",
			"-o-transform"     : "translate(" + myX + "px," + myY + "px)",
		});
	  hideHead();
	  if (e.clientY < headTop) {
	  	if (e.clientX < headLeft) {
		  	$("#head-animation .top-left").show();
		  } else if (e.clientX < headRight){
		  	$("#head-animation .top-center").show();
		  } else {
		  	$("#head-animation .top-right").show();
		  }
	  } else if (e.clientY < headBottom){
		  if (e.clientX < headLeft) {
		  	$("#head-animation .center-left").show();
		  } else if (e.clientX < headRight){
		  	$("#head-animation .center-center").show();
		  } else {
		  	$("#head-animation .center-right").show();
		  }
	  } else {
		  if (e.clientX < headLeft) {
		  	$("#head-animation .bottom-left").show();
		  } else if (e.clientX < headRight){
		  	$("#head-animation .bottom-center").show();
		  } else {
		  	$("#head-animation .bottom-right").show();
		  }
	  }
	});
}(jQuery));