/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// require('react');
	// require('react-router');
	// require('jquery');
	__webpack_require__(14);
	__webpack_require__(1);
	//require('./plugins/jquery.headanimation');
	__webpack_require__(2);

	var Route         = ReactRouter.Route,
	    DefaultRoute  = ReactRouter.DefaultRoute,
	    NotFoundRoute = ReactRouter.NotFoundRoute;
	 

	var App      = __webpack_require__(3),
	    Index    = __webpack_require__(4),
	    NotFound = __webpack_require__(5),
	    Blog     = __webpack_require__(6),
	    Wiki     = __webpack_require__(7),
	    Cv       = __webpack_require__(8),
	    About    = __webpack_require__(9),
	    Football = __webpack_require__(10),
	    BlogList = __webpack_require__(11),
	    WikiList = __webpack_require__(12);

	var routes = (
	  React.createElement(Route, {handler: App}, 
	    React.createElement(DefaultRoute, {name: "index", handler: Index}), 
	    React.createElement(Route, {name: "blog", handler: Blog, path: "blog/:name"}), 
	    React.createElement(Route, {name: "bloglist", handler: BlogList}), 
	    React.createElement(Route, {name: "wiki", handler: Wiki, path: "wiki/:name"}), 
	    React.createElement(Route, {name: "wikilist", handler: WikiList}), 
	    React.createElement(Route, {name: "cv", handler: Cv}), 
	    React.createElement(Route, {name: "about", handler: About}), 
	    React.createElement(Route, {name: "football", handler: Football}), 
	    React.createElement(NotFoundRoute, {handler: NotFound})
	  )
	);

	ReactRouter.run(routes, function (Handler) {
	  React.render(React.createElement(Handler, null), document.getElementById('app'));
	});

	__webpack_require__(13);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	; (function($) {
	  "use strict";
	  var $slides, n, num, timer, settings;

	  function change(m) {
	    $slides.eq(n).css("opacity", 0);
	    m ? n++ : n--;
	    n > num ? n = 0 : "";
	    n < 0 ? n = num : "";
	    $slides.eq(n).css("opacity", 1);
	  }

	  function setTimer() {
	    clearInterval(timer);
	    timer = setInterval(function() {
	        change(false);
	      },
	      settings.delay);
	  }
	  var methods = {
	    init: function(options) {
	      var defaults = {
	        "delay": 5000
	      };
	      settings = $.extend({},
	        defaults, options);
	      $slides = this.children(".slide");
	      num = $slides.length - 1;
	      n = num;

	      this.children(".slide").each(function() {
	        $(this).css("opacity", 0);
	      });
	      change(false);

	      this.find(".left").click(function() {
	        change(true);
	        setTimer();
	      });
	      this.find(".right").click(function() {
	        change(false);
	        setTimer();
	      });
	      setTimer();
	    },
	  };
	  $.fn.slideshow = function() {
	    var method = arguments[0];
	    if (methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if (typeof method === "object" || !method) {
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error("Method " + method + " does not exist on jQuery.headanimation");
	    }
	  };
	})(jQuery);



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	; (function($) {
	  "use strict";
	  var methods = {
	    init: function() {
	      $('#toc').remove();
	      var $t,
	        $c,
	        $a,
	        $li,
	        scrollTop = [],
	        top,
	        index,
	        length,
	        $ul = $("<ul/>").attr("id", "toc");

	      this.find(":header").each(function() {
	        $t = $(this).prop("tagName").toLowerCase();
	        $c = $(this).text();
	        $(this).attr("id", $c);
	        $a = $("<a/>").attr("href", "#" + $c).text($c);
	        $li = $("<li/>").addClass("toc-" + $t).append($a);
	        $ul.append($li);
	        scrollTop.push($(this).offset().top);
	      });
	      $(".list-container").append($ul);

	      //auto scroll
	      length = scrollTop.length;
	      $(window).scroll(function() {
	        top = $(window).scrollTop() + 200;
	        for (var i = 0; i < length; i++) {
	          if (top <= scrollTop[i]) {
	            index = i;
	            break;
	          }
	        }
	        $("#toc li").removeClass("on");
	        if (top >= scrollTop[0]) {
	          $("#toc li").eq(index - 1).addClass("on");
	        }
	      });
	    },
	  };
	  $.fn.toc = function() {
	    var method = arguments[0];
	    if (methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if (typeof method === "object" || !method) {
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error("Method " + method + " does not exist on jQuery.headanimation");
	    }
	  };
	})(jQuery);



/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RouteHandler = ReactRouter.RouteHandler,
	    Top = __webpack_require__(16),
	    Bottom = __webpack_require__(17);

	module.exports = React.createClass({displayName: "exports",
	  mixins: [ ReactRouter.State ],
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement(Top, null), 
	        React.createElement("div", {id: "header"}, 
	          React.createElement("div", {className: "container"}, 
	            React.createElement("a", {className: "logo", href: "/"}, "琥珀草")
	          )
	        ), 
	        React.createElement("div", {className: "content", id: this.getRoutes()[1].name}, 
	          React.createElement(RouteHandler, null)
	        ), 
	        React.createElement(Bottom, null), 
	        React.createElement("div", {id: "back-to-top"}, "top")
	      )
	    );
	  }
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({displayName: "exports",
	  componentDidMount: function() {
	   jQuery("#slide-show").slideshow();
	  },
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        React.createElement("div", {id: "slide-show"}, 
	          React.createElement("div", {className: "slide", id: "slide-1"}), 
	          React.createElement("div", {className: "slide", id: "slide-2"}), 
	          React.createElement("div", {className: "container"}, 
	            React.createElement("span", {className: "left arrow"}, React.createElement("i", {className: "fa fa-chevron-left"})
	                  ), 
	            React.createElement("span", {className: "right arrow"}, React.createElement("i", {className: "fa fa-chevron-right"})
	                  )
	          )
	        )
	        /*<!--     <div id="head-animation">
	              <div className="top-left"></div>
	              <div className="top-center"></div>
	              <div className="top-right"></div>
	              <div className="center-left"></div>
	              <div className="center-right"></div>
	              <div className="bottom-left"></div>
	              <div className="bottom-center"></div>
	              <div className="bottom-right"></div>
	              <div className="center-center"></div>
	          </div> -->*/
	      )
	    );
	  }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({displayName: "exports",
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        "404"
	      )
	    );
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var converter = new Showdown.converter(),
	    Link = ReactRouter.Link,
	    Post = __webpack_require__(18);

	module.exports = React.createClass({displayName: "exports",
	  mixins: [ Post ],
	  getDefaultProps: function() {
	    return {
	      url: '/dist/blog.json'
	    };
	  },
	  render: function () {
	    var rawMarkup = converter.makeHtml(this.state.content.toString()),
	        listDom = this.state.list.map(function(list) {
	          return React.createElement("li", null, React.createElement(Link, {to: "blog", params: {name: list.path}}, list.title));
	        });
	    return (
	      React.createElement("div", {id: "blog"}, 
	        React.createElement("div", {className: "container"}, 
	          React.createElement("div", {className: "post", dangerouslySetInnerHTML: {__html: rawMarkup}}), 
	          React.createElement("div", {className: "list"}, 
	            React.createElement("div", {className: "list-container"}, 
	              React.createElement("ul", null, 
	                listDom
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var converter = new Showdown.converter(),
	    Link = ReactRouter.Link,
	    Post = __webpack_require__(18);

	module.exports = React.createClass({displayName: "exports",
	  mixins: [ Post ],
	  getDefaultProps: function() {
	    return {
	      url: '/dist/wiki.json'
	    };
	  },
	  render: function () {
	    var rawMarkup = converter.makeHtml(this.state.content.toString()),
	        listDom = this.state.list.map(function(list) {
	          return React.createElement("li", null, React.createElement(Link, {to: "wiki", params: {name: list.path}}, list.title));
	        });
	    return (
	      React.createElement("div", {id: "wiki"}, 
	        React.createElement("div", {className: "container"}, 
	          React.createElement("h1", null, this.state.data.title), 
	          React.createElement("div", {className: "post", dangerouslySetInnerHTML: {__html: rawMarkup}}), 
	          React.createElement("div", {className: "list"}, 
	            React.createElement("div", {className: "list-container"}, 
	              React.createElement("ul", null, 
	                listDom
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({displayName: "exports",
	  render: function () {
	    return (
	      React.createElement("div", null, 
	        "CV"
	      )
	    );
	  }
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({displayName: "exports",
	  render: function () {
	    return (
	      React.createElement("div", {className: "container"}, 
	        React.createElement("div", {id: "who"}, 
	            React.createElement("div", {className: "intro-image"}, 
	                React.createElement("h2", null, "我是谁")
	            ), 
	            React.createElement("div", {clsss: "intro-acticle"}, 
	                React.createElement("h3", null, "职业"), 
	                "码农", 
	                React.createElement("h3", null, "个人介绍"), 
	                "1986年(好老啊)出生于江西, 2012年毕业于巴黎第七大学计算机专业, 目前在平安健康做前端....", 
	                React.createElement("h3", null, "兴趣爱好"), 
	                "堆代码, 看球"
	            )
	        ), 
	        React.createElement("div", {id: "inter"}, 
	            React.createElement("div", {className: "intro-image"}, 
	                React.createElement("h2", null, "国际米兰")
	            ), 
	            React.createElement("p", null, 
	                "我是国际米兰的忠实伪球迷(内拉......), 和很多其他的内拉一样, 因为大罗而喜欢国米, 然后是雷科巴, 萨内蒂, 师奶~~"
	            )
	        )
	    )
	    );
	  }
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DuoShuo = __webpack_require__(19);

	module.exports = React.createClass({displayName: "exports",
	  getDefaultProps: function() {
	    return {
	      football: '/json/football.json'
	    };
	  },
	  componentDidMount: function() {
	    var parent = document.getElementsByClassName("team")[0];
	    jQuery.get(this.props.football, function(data) {
	      if (this.isMounted()) {
	        for (var i in data.teams) {
	          PBDm.drawPlayGround(parent, data.meazza, data.m, data.teams[i]);
	        }
	      }
	    }.bind(this));
	  },

	  render: function () {
	    return (
	      React.createElement("div", {className: "container"}, 
	        React.createElement("div", {id: "football"}, 
	          React.createElement("div", {className: "team", playground: true}
	          )
	        ), 
	      React.createElement(DuoShuo, null)
	      )
	    );
	  }
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var converter = new Showdown.converter(),
	    Link = ReactRouter.Link,
	    List = __webpack_require__(20);

	var ListBlog = React.createClass({displayName: "ListBlog",
	  getDefaultProps: function() {
	    return {
	      list: {}
	    };
	  },
	  render: function () {
	    var rawMarkup = converter.makeHtml(this.props.list.content.toString().slice(0,200));
	    return (
	      React.createElement("div", {class: "article"}, 
	        React.createElement("h2", null, React.createElement(Link, {to: "blog", params: {name: this.props.list.path}}, this.props.list.title)), 
	        React.createElement("span", {class: "date"}, 
	            this.props.list.date
	        ), 
	        React.createElement("div", {dangerouslySetInnerHTML: {__html: rawMarkup}}), 
	        React.createElement(Link, {to: "blog", params: {name: this.props.list.path}}, "浏览全文...")
	      )
	    );
	  }
	});

	module.exports = React.createClass({displayName: "exports",
	  mixins: [ List ],
	  getDefaultProps: function() {
	    return {
	      url: '/dist/blog.json',
	      type: 'blog'
	    };
	  },
	  render: function () {
	    var rawMarkup,
	        listDom = this.state.data.map(function(list) {
	          return React.createElement(ListBlog, {list: list});
	        });
	    return (
	      React.createElement("div", {id: "blog"}, 
	          React.createElement("div", {className: "container"}, 
	              React.createElement("div", {className: "post"}, 
	                listDom
	              )
	              /*<div className="list">
	                  <div className="list-container">
	                  </div>
	              </div>*/
	          )
	      )
	    );
	  }
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var converter = new Showdown.converter(),
	    Link = ReactRouter.Link,
	    List = __webpack_require__(20);

	var ListBlog = React.createClass({displayName: "ListBlog",
	  getDefaultProps: function() {
	    return {
	      list: {}
	    };
	  },
	  render: function () {
	    var rawMarkup = converter.makeHtml(this.props.list.content.toString().slice(0,200));
	    return (
	      React.createElement("div", {class: "article"}, 
	        React.createElement("h2", null, React.createElement(Link, {to: "wiki", params: {name: this.props.list.path}}, this.props.list.title)), 
	        React.createElement("span", {class: "date"}, 
	            this.props.list.date
	        ), 
	        React.createElement("div", {dangerouslySetInnerHTML: {__html: rawMarkup}}), 
	        React.createElement(Link, {to: "wiki", params: {name: this.props.list.path}}, "浏览全文...")
	      )
	    );
	  }
	});

	module.exports = React.createClass({displayName: "exports",
	  mixins: [ List ],
	  getDefaultProps: function() {
	    return {
	      url: '/dist/wiki.json',
	      type: 'wiki'
	    };
	  },
	  render: function () {
	    var rawMarkup,
	        listDom = this.state.data.map(function(list) {
	          return React.createElement(ListBlog, {list: list});
	        });
	    return (
	      React.createElement("div", {id: "blog"}, 
	          React.createElement("div", {className: "container"}, 
	              React.createElement("div", {className: "post"}, 
	                listDom
	              ), 
	              React.createElement("div", {className: "list"}, 
	                  React.createElement("div", {className: "list-container"}
	                  )
	              )
	          )
	      )
	    );
	  }
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var scrollEventType;
	(PBDm.whichBrowser().firefox) ? scrollEventType = "DOMMouseScroll": scrollEventType = "mousewheel";

	// sidebarfix
	PBDm.affix();

	// navtop
	// whichBrowser().ie ? '' : navTop();
	//responsive menu
	PBDm.responsiveMenu();

	(function($) {
	  // head-animation
	  // $("#head-animation").headAnimation({
	  //  'ratio': -50
	  // });
	  // toc
	  //$(".post").toc();

	  // back to top
	  var $btt = $("#back-to-top");
	  $(window).scroll(function() {
	    if ($(this).scrollTop() > 50) {
	      $btt.css("opacity", 1);
	    } else {
	      $btt.css("opacity", 0);
	    }
	  });
	  $btt.click(function() {
	    $("html, body").animate({
	        scrollTop: 0
	      },
	      500);
	  });
	}(jQuery));




/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["PBDm"] = __webpack_require__(15);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {

	  /**
	   * [affix description]
	   * @return {[type]} [description]
	   */
	  affix: function() {
	    var postList = document.getElementsByClassName("list")[0],
	      postContainer = document.getElementsByClassName("list-container")[0],
	      container = document.getElementsByClassName("container")[0],
	      containerPadding = parseInt(getComputedStyle(container)["padding-left"]) + parseInt(getComputedStyle(container)["padding-right"]),
	      postsWidth,
	      scrollTop;
	    if (postList && postList.clientHeight < window.innerHeight) {
	      postsWidth = (container.clientWidth - containerPadding) * 0.25;
	      window.onresize = function() {
	        if (window.innerWidth > 767) {
	          scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //for IE,firefox..
	          postsWidth = (container.clientWidth - containerPadding) * 0.25;
	          postContainer.style.width = postsWidth + "px";
	          if (scrollTop > postList.offsetTop) {
	            postContainer.style.position = "fixed";
	            postContainer.style.top = "0px";
	          }
	        } else {
	          postContainer.style.position = "static";
	          postsWidth = container.clientWidth - containerPadding;
	          postContainer.style.width = postsWidth + "px";
	        }
	      };
	      document.addEventListener("scroll",
	        function() {
	          if (window.innerWidth > 767) {
	            scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //for IE,firefox..
	            if (scrollTop > postList.offsetTop) {
	              postContainer.style.position = "fixed";
	              postContainer.style.top = "0px";
	              postContainer.style.width = postsWidth + "px";
	            } else {
	              postContainer.style.position = "static";
	            }
	          }
	        });
	    }
	  },

	  /**
	   * [navTop description]
	   * @return {[type]} [description]
	   */
	  navTop: function() {
	    var myNav = document.getElementsByTagName("nav")[0],
	      navW = document.getElementsByClassName("wrapper")[0],
	      navY,
	      navH = myNav.offsetHeight,
	      scrollTop;
	    document.addEventListener("scroll",
	      function() {
	        scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //for IE,firefox..
	        //nav bar
	        if (scrollTop < navY) {
	          navW.style.position = "fixed";
	          myNav.style.marginTop = navH + "px";
	          navW.style.marginTop = "-" + navH + "px";
	        } else {
	          navW.style.position = "static";
	          myNav.style.marginTop = 0;
	          navW.style.marginTop = 0;
	        }
	        navY = scrollTop;
	      });
	  },

	  /**
	   * [whichBrowser description]
	   * @return {[type]} [browser type]
	   */
	  whichBrowser: function() {
	    var sys = {},
	      ua = navigator.userAgent.toLowerCase(),
	      s;
	    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1]:
	      (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : //ie11
	      (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	      (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
	      (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
	      (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	    return sys;
	  },

	  /**
	   * [drawPlayGround description]
	   * @param  {[type]} parent     [parent element]
	   * @param  {[type]} p          [stadium size]
	   * @param  {[type]} m          [zoom ratio]
	   * @param  {[type]} players    [players date]
	   * @return {[type]}            [description]
	   */
	  drawPlayGround: function(parent, p, m, players) {
	    var playgroundWapper = document.createElement("div"),
	      playgroundName = document.createElement("h2"),
	      name = document.createTextNode(players.date),
	      playGround = document.createElement("canvas"),
	      begin,
	      end,
	      ctx = playGround.getContext("2d");
	    playgroundWapper.classList.add("playgroundWapper");
	    playGround.classList.add("playground");
	    playgroundName.appendChild(name);
	    playgroundWapper.appendChild(playGround);
	    parent.appendChild(playgroundName);
	    parent.appendChild(playgroundWapper);
	    //draw plagground
	    ctx.canvas.width = 410;
	    ctx.canvas.height = 660;
	    ctx.strokeStyle = "white";
	    ctx.fillStyle = "white";
	    ctx.lineWidth = 1 / m;
	    ctx.scale(m, m);
	    ctx.rect(0, p.g.l, p.w, p.l);
	    ctx.rect((p.w - p.pA.w) / 2, p.g.l, p.pA.w, p.pA.l);
	    ctx.rect((p.w - p.gA.w) / 2, p.g.l, p.gA.w, p.gA.l);
	    ctx.rect((p.w - p.g.w) / 2, 0, p.g.w, p.g.l);
	    ctx.rect((p.w - p.gA.w) / 2, p.g.l + p.l - p.gA.l, p.gA.w, p.gA.l);
	    ctx.rect((p.w - p.pA.w) / 2, p.g.l + p.l - p.pA.l, p.pA.w, p.pA.l);
	    ctx.rect((p.w - p.g.w) / 2, p.l + p.g.l, p.g.w, p.g.l);

	    ctx.moveTo(0, p.g.l + p.l / 2);
	    ctx.lineTo(p.w, p.g.l + p.l / 2);

	    ctx.arc(p.w / 2, p.g.l + p.l / 2, p.cr, 0, 2 * Math.PI);
	    ctx.moveTo(0, p.g.l);

	    ctx.arc(0, p.g.l, p.cnr, 0, Math.PI / 2);
	    ctx.moveTo(0, p.g.l + p.l);
	    ctx.arc(0, p.g.l + p.l, p.cnr, Math.PI * 3 / 1, 2 * Math.PI);
	    ctx.moveTo(p.w, p.g.l);
	    ctx.arc(p.w, p.g.l, p.cnr, Math.PI / 2, Math.PI);
	    ctx.moveTo(p.w, p.g.l + p.l);
	    ctx.arc(p.w, p.g.l + p.l, p.cnr, Math.PI, Math.PI * 3 / 2);
	    ctx.stroke();

	    ctx.beginPath();
	    begin = Math.PI * Math.sin((p.p - p.cr) / p.cr);
	    end = Math.PI * (1 - Math.sin((p.p - p.cr) / p.cr));
	    ctx.arc(p.w / 2, p.g.l + p.p, p.cr, begin, end);
	    ctx.stroke();

	    ctx.beginPath();
	    begin = Math.PI * (1 + Math.sin((p.p - p.cr) / p.cr));
	    end = Math.PI * (2 - Math.sin((p.p - p.cr) / p.cr));
	    ctx.arc(p.w / 2, p.g.l + p.l - p.p, p.cr, begin, end);
	    ctx.stroke();

	    ctx.beginPath();
	    ctx.arc(p.w / 2, p.g.l + p.p, 2 / m, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.arc(p.w / 2, p.g.l + p.l - p.p, 2 / m, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.arc(p.w / 2, p.g.l + p.l / 2, 2 / m, 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.closePath();

	    // add player  
	    ctx.scale(1 / m, 1 / m);
	    ctx.font = "17px Verdana";
	    ctx.textAlign = "center";

	    ctx.fillText(players.gk, p.w / 2 * m, p.l * m);

	    ctx.fillText(players.lb || "", p.cr * m, p.l * m * 3 / 4);
	    ctx.fillText(players.rb || "", (p.w - p.cr) * m, p.l * m * 3 / 4);

	    ctx.fillText(players.lcb || "", (p.w / 4) * m, p.l * m * 6 / 7);
	    ctx.fillText(players.rcb || "", (p.w / 4 * 3) * m, p.l * m * 6 / 7);
	    ctx.fillText(players.ccb || "", (p.w / 2) * m, p.l * m * 6 / 7);

	    ctx.fillText(players.ldm || "", (p.w / 4) * m, p.l * m * 2 / 3);
	    ctx.fillText(players.rdm || "", (p.w / 4 * 3) * m, p.l * m * 2 / 3);
	    ctx.fillText(players.cdm || "", (p.w / 2) * m, p.l * m * 2 / 3);

	    ctx.fillText(players.lm || "", p.cr * m, p.l * m * 1 / 2);
	    ctx.fillText(players.rm || "", (p.w - p.cr) * m, p.l * m * 1 / 2);
	    ctx.fillText(players.cm || "", (p.w / 2) * m, p.l * m * 1 / 2);

	    ctx.fillText(players.lam || "", (p.w / 4) * m, p.l * m * 1 / 3);
	    ctx.fillText(players.ram || "", (p.w / 4 * 3) * m, p.l * m * 1 / 3);
	    ctx.fillText(players.cam || "", (p.w / 2) * m, p.l * m * 1 / 3);

	    ctx.fillText(players.lwf || "", p.cr * m, p.l * m * 1 / 4);
	    ctx.fillText(players.rwf || "", (p.w - p.cr) * m, p.l * m * 1 / 4);
	    ctx.fillText(players.cf || "", (p.w / 2) * m, p.l * m * 1 / 7);
	    ctx.fillText(players.lf || "", (p.w / 4) * m, p.l * m * 1 / 7);
	    ctx.fillText(players.rf || "", (p.w / 4 * 3) * m, p.l * m * 1 / 7);
	  },

	  /**
	   * [gravatar description]
	   * @param  {[type]} profile [description]
	   * @return {[type]}         [description]
	   */
	  gravatar: function(profile) {
	    document.getElementsByClassName("accounts_weibo")[0].setAttribute("href", profile.entry[0].urls[1].value);
	    document.getElementsByClassName("accounts_twitter")[0].setAttribute("href", profile.entry[0].accounts[3].url);
	    document.getElementsByClassName("accounts_facebook")[0].setAttribute("href", profile.entry[0].accounts[0].url);
	    document.getElementsByClassName("accounts_google")[0].setAttribute("href", profile.entry[0].accounts[1].url);
	    document.getElementsByClassName("accounts_linkedin")[0].setAttribute("href", profile.entry[0].accounts[2].url);
	    document.getElementsByClassName("accounts_github")[0].setAttribute("href", profile.entry[0].urls[2].value);
	    document.getElementsByClassName("email")[0].setAttribute("href", "mailto:" + profile.entry[0].emails[0].value);
	    document.getElementsByClassName("fn")[0].setAttribute("href", profile.entry[0].profileUrl);
	    document.getElementsByClassName("fn")[0].innerHTML = profile.entry[0].name.givenName + " " + profile.entry[0].name.familyName;
	  },

	  responsiveMenu: function() {
	    var navList = document.querySelector("nav .wrapper > ul"),
	      navMenu = document.getElementsByClassName("fa-list-ul")[0];
	    navMenu.addEventListener("click",
	      function() {
	        if (getComputedStyle(navList).height == "1px") {
	          navList.style.height = (function() {
	            var height = 1; //1px for border
	            Array.prototype.slice.call(navList.children).forEach(function(child) {
	              height += child.clientHeight;
	            });
	            return height;
	          })() + "px";
	        } else {
	          navList.style.height = "1px";
	        }
	      });
	  }

	};



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = React.createClass({displayName: "exports",
	  render: function () {
	    return (
	      React.createElement("nav", null, 
	        React.createElement("div", {className: "wrapper"}, 
	          React.createElement("div", {className: "responsive-nav"}, 
	            React.createElement("i", {className: "fa fa-list-ul fa-2x"}), 
	            React.createElement("div", {className: "nav-info", "ng-hide": "dialogIsHidden", "ng-controller": "dateCtrl", "my-current-time": true, "on-close": "hideDialog()"})
	          ), 
	          React.createElement("ul", null, 
	            React.createElement("li", null, React.createElement("a", {href: "#"}, "Home")), 
	            React.createElement("li", null, React.createElement("a", {href: "#bloglist"}, "Blog")), 
	            React.createElement("li", null, React.createElement("a", {href: "#wiki/links"}, "Wiki")), 
	            React.createElement("li", null, React.createElement("a", {href: "#football"}, "Football")), 
	            React.createElement("li", null, React.createElement("a", {href: "#about"}, "About me"))
	          )
	        )
	      )
	    );
	  }
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	module.exports = React.createClass({displayName: "exports",
	  render: function () {
	    return (
	      React.createElement("footer", null, 
	        React.createElement("div", {className: "container"}, 
	          React.createElement("div", {className: "friend-links column"}, 
	            React.createElement("h2", null, "友情链接"), 
	            React.createElement("a", {href: "http://www.rockimba.com/"}, "Rock"), 
	            React.createElement("a", {href: "#"}, "某人")
	          ), 
	          React.createElement("div", {className: "vcard"}, 
	            React.createElement("div", {className: " column"}, 
	              React.createElement("h2", null, "联系我"), 
	              React.createElement("a", {title: "Weibo", className: "url accounts_weibo", rel: "me"}, React.createElement("i", {className: "fa fa-weibo"})), 
	              React.createElement("a", {title: "Twitter", className: "accounts_twitter url", rel: "me"}, React.createElement("i", {className: "fa fa-twitter-square"})), 
	              React.createElement("a", {title: "Facebook", className: "accounts_facebook url", rel: "me"}, React.createElement("i", {className: "fa fa-facebook-square"})), 
	              React.createElement("a", {title: "Google+", className: "accounts_google url", rel: "me"}, React.createElement("i", {className: "fa fa-google-plus-square"})), 
	              React.createElement("a", {title: "Linkedin", className: "accounts_linkedin url", rel: "me"}, React.createElement("i", {className: "fa fa-linkedin-square"})), 
	              React.createElement("a", {title: "Github", className: "accounts_github url", rel: "me"}, React.createElement("i", {className: "fa fa-github-square"})), 
	              React.createElement("a", {title: "Email", className: "email"}, React.createElement("i", {className: "fa fa-envelope-square"}))
	            ), 
	            React.createElement("a", {className: "fn"}), "© 2012 - 2014 | Powered by ", React.createElement("a", {href: "https://pages.github.com/"}, "Github Pages"), " & ", React.createElement("a", {href: "http://jekyllrb.com/"}, "Jekyll")
	          )
	        )
	      )
	    );
	  }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  mixins: [ ReactRouter.State ],
	  getInitialState: function() {
	    return {
	      content: '',
	      data:    {},
	      list:    []
	    };
	  },
	  componentDidMount: function() {
	    this.getData(this.getParams().name);
	  },
	  componentWillReceiveProps: function() {
	    this.getData(this.getParams().name);
	  },
	  componentDidUpdate: function(prevProps, prevState) {
	    $(".post").toc();
	  },
	  getData: function(name) {
	    var tmp = {};
	    $.get(this.props.url, function(list) {
	      if (this.isMounted()) {
	        tmp = _.filter(list, function(n) {
	          return n.path == name;
	        }); 
	        $.get(tmp[0].fullpath, function(content) {
	          if (this.isMounted()) {
	            this.setState({
	              content: content,
	              data: tmp[0],
	              list: list
	            });
	          }
	        }.bind(this));
	      } else {

	      }
	    }.bind(this));
	  },
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = React.createClass({displayName: "exports",
	  componentDidMount: function() {
	    window.duoshuoQuery = {
	      short_name: "pbdm"
	    };
	    debugger;
	    var ds = document.createElement("script");
	    ds.type = "text/javascript";
	    ds.async = true;
	    ds.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//static.duoshuo.com/embed.js";
	    ds.charset = "UTF-8";
	    eval(document.getElementsByTagName("head")[0].appendChild(ds));
	  },
	  render: function () {
	    return (
	      React.createElement("div", {class: "ds-thread", "data-thread-key": "/wiki/Links", "data-title": "Links", "data-url": "请替换成文章的网址"})
	    );
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BlogStore = __webpack_require__(21);
	var WikiStore = __webpack_require__(22);

	module.exports = {
	  mixins: [ ReactRouter.State ],
	  getInitialState: function() {
	    return {
	      data:    []
	    };
	  },
	  componentDidMount: function() {
	    this.getList();
	  },
	  componentDidUpdate: function(prevProps, prevState) {
	    $(".post").toc();
	  },
	  getList: function(name) {
	    var key,
	        flag = 0,
	        Store;  
	    switch (this.props.type) {
	      case 'blog':
	        Store = BlogStore;
	      case 'wiki':
	        Store = WikiStore;
	    }

	    $.get(this.props.url, function(data) {
	      if (this.isMounted()) {
	        for (key in data) {
	          (function() {
	            var tmp = data[key];
	            $.get(tmp.fullpath, function(content) {
	              if (this.isMounted()) {
	                flag++;
	                tmp.content = content;
	                Store.push(tmp);
	                if (flag == data.length) {
	                  this.setState({
	                    data: Store.getAll()
	                  });
	                }
	              }
	            }.bind(this));
	          }.bind(this)());
	        }
	      }
	    }.bind(this));
	  },
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  data: [],
	  push: function(options){
	    if(options && _.isObject(options)){
	      this.data.push(options);
	    }
	  },
	  getAll: function(){
	    return this.data;
	  },
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  data: [],
	  push: function(options){
	    if(options && _.isObject(options)){
	      this.data.push(options);
	    }
	  },
	  getAll: function(){
	    return this.data;
	  },
	};

/***/ }
/******/ ])