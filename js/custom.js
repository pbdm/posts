//Affix for posts list sidebar
var posts = $(".post-list-container");
var posts_top = $(".post-list").offset().top;
var posts_width = posts.width();
window.onscroll = function(){
	if (jQuery(window).scrollTop() > posts_top) {
		//console.log('here');
		posts.addClass("fixed")
		posts.css("width",posts_width);
	} else {
		posts.removeClass("fixed")
		posts.removeAttr("style");
	}
}
