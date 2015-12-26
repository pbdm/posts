/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(PBDm) {'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	var _componentsBottom = __webpack_require__(3);

	var _componentsBottom2 = _interopRequireDefault(_componentsBottom);

	// import Top from './components/Top';

	var _componentsHome = __webpack_require__(4);

	var _componentsHome2 = _interopRequireDefault(_componentsHome);

	var _componentsAbout = __webpack_require__(5);

	var _componentsAbout2 = _interopRequireDefault(_componentsAbout);

	var _componentsFootball = __webpack_require__(6);

	var _componentsFootball2 = _interopRequireDefault(_componentsFootball);

	var _componentsPost = __webpack_require__(43);

	var _componentsPost2 = _interopRequireDefault(_componentsPost);

	var _componentsNotFound = __webpack_require__(45);

	var _componentsNotFound2 = _interopRequireDefault(_componentsNotFound);

	var page = undefined;

	var render = function render(params, name) {
	  params.setQuery && params.setQuery({
	    page: page,
	    name: name
	  });
	  var template = '\n    <div id="header">\n      <div class="container">\n        <a class="logo" href="#/">琥珀草</a>\n      </div>\n    </div>\n    <div class="content" id=' + page + '>\n      ' + params.tmpl + '\n    </div>\n    ' + _componentsBottom2['default'] + '\n    <a class=\'scroll\' href="#top" id="back-to-top">top</div>\n  ';
	  document.getElementById('app').innerHTML = template;
	  NProgress.start();
	  params.onLoad && params.onLoad(render);
	  // PBDm.responsiveMenu();
	  PBDm.btt();
	  PBDm.anchorScroll();
	};

	var switcher = function switcher(hash) {
	  var hashArray = hash.split('/');
	  switch (hashArray[1]) {
	    case '':
	      page = 'home';
	      render(_componentsHome2['default']);
	      break;
	    case 'about':
	      page = 'about';
	      render(_componentsAbout2['default']);
	      break;
	    case 'football':
	      page = 'football';
	      render(_componentsFootball2['default']);
	      break;
	    case 'wiki':
	      page = 'wiki';
	      render(_componentsPost2['default'], hashArray[2]);
	      break;
	    case 'blog':
	      page = 'blog';
	      render(_componentsPost2['default'], hashArray[2]);
	      break;
	    case 'local':
	      page = 'local';
	      render(_componentsPost2['default'], hashArray[2]);
	      break;
	    default:
	      page = 'notfound';
	      render(_componentsNotFound2['default']);
	  }
	};

	window.addEventListener('hashchange', function () {
	  switcher(window.location.hash);
	});

	window.location.hash ? switcher(window.location.hash) : window.location.hash = '#/';
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var Util = {

	  /**
	   * [affix description]
	   * @return {[type]} [description]
	   */
	  affix: function affix() {
	    var postList = document.getElementsByClassName("list")[0],
	        postContainer = document.getElementsByClassName("list-container")[0],
	        container = document.getElementsByClassName("container")[0],
	        containerPadding = parseInt(getComputedStyle(container)["padding-left"]) + parseInt(getComputedStyle(container)["padding-right"]),
	        postsWidth,
	        postContainerTop,
	        scrollTop,
	        needFixTop;
	    if (postContainer) {
	      postContainerTop = parseInt(window.getComputedStyle(postContainer, null).getPropertyValue('margin-top'));
	      needFixTop = postContainer.offsetTop - postContainerTop;
	    }
	    if (postList && postList.clientHeight < window.innerHeight) {
	      postsWidth = (container.clientWidth - containerPadding) * 0.25;
	      window.onresize = function () {
	        if (window.innerWidth > 767) {
	          scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //for IE,firefox..
	          postsWidth = (container.clientWidth - containerPadding) * 0.25;
	          postContainer.style.width = postsWidth + "px";
	          if (scrollTop > postContainer.offsetTop - postContainerTop) {
	            postContainer.style.position = "fixed";
	            postContainer.style.top = "0px";
	          }
	        } else {
	          postContainer.style.position = "static";
	          postsWidth = container.clientWidth - containerPadding;
	          postContainer.style.width = postsWidth + "px";
	        }
	      };
	      document.addEventListener("scroll", function () {
	        if (window.innerWidth > 767) {
	          scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //for IE,firefox..
	          if (scrollTop > needFixTop) {
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
	  navTop: function navTop() {
	    var myNav = document.getElementsByTagName("nav")[0],
	        navW = document.getElementsByClassName("wrapper")[0],
	        navY,
	        navH = myNav.offsetHeight,
	        scrollTop;
	    document.addEventListener("scroll", function () {
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
	  whichBrowser: function whichBrowser() {
	    var sys = {},
	        ua = navigator.userAgent.toLowerCase(),
	        s;
	    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : //ie11
	    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
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
	  drawPlayGround: function drawPlayGround(parent, p, m, players) {
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

	    ctx.fillText(players.lcb || "", p.w / 4 * m, p.l * m * 6 / 7);
	    ctx.fillText(players.rcb || "", p.w / 4 * 3 * m, p.l * m * 6 / 7);
	    ctx.fillText(players.ccb || "", p.w / 2 * m, p.l * m * 6 / 7);

	    ctx.fillText(players.ldm || "", p.w / 4 * m, p.l * m * 2 / 3);
	    ctx.fillText(players.rdm || "", p.w / 4 * 3 * m, p.l * m * 2 / 3);
	    ctx.fillText(players.cdm || "", p.w / 2 * m, p.l * m * 2 / 3);

	    ctx.fillText(players.lm || "", p.cr * m, p.l * m * 1 / 2);
	    ctx.fillText(players.rm || "", (p.w - p.cr) * m, p.l * m * 1 / 2);
	    ctx.fillText(players.cm || "", p.w / 2 * m, p.l * m * 1 / 2);

	    ctx.fillText(players.lam || "", p.w / 4 * m, p.l * m * 1 / 3);
	    ctx.fillText(players.ram || "", p.w / 4 * 3 * m, p.l * m * 1 / 3);
	    ctx.fillText(players.cam || "", p.w / 2 * m, p.l * m * 1 / 3);

	    ctx.fillText(players.lwf || "", p.cr * m, p.l * m * 1 / 4);
	    ctx.fillText(players.rwf || "", (p.w - p.cr) * m, p.l * m * 1 / 4);
	    ctx.fillText(players.cf || "", p.w / 2 * m, p.l * m * 1 / 7);
	    ctx.fillText(players.lf || "", p.w / 4 * m, p.l * m * 1 / 7);
	    ctx.fillText(players.rf || "", p.w / 4 * 3 * m, p.l * m * 1 / 7);
	  },

	  responsiveMenu: function responsiveMenu() {
	    var navList = document.querySelector("nav .wrapper > ul"),
	        navMenu = document.getElementsByClassName("fa-list-ul")[0];
	    navMenu.addEventListener("click", function () {
	      if (getComputedStyle(navList).height === "1px") {
	        navList.style.height = (function () {
	          var height = 1; //1px for border
	          Array.prototype.slice.call(navList.children).forEach(function (child) {
	            height += child.clientHeight;
	          });
	          return height;
	        })() + "px";
	      } else {
	        navList.style.height = "1px";
	      }
	    });
	  },

	  btt: function btt() {
	    var btt = document.getElementById('back-to-top');
	    var root = Util.getScrollingElement();
	    window.addEventListener('scroll', function () {
	      root.scrollTop > 50 ? btt.style.opacity = 1 : btt.style.opacity = 0;
	    });
	  },

	  get: function get(url, callback) {
	    var request = new XMLHttpRequest();
	    var response;
	    request.open('GET', url, true);
	    var jsonValidate = function jsonValidate(str) {
	      try {
	        JSON.parse(str);
	        return true;
	      } catch (err) {
	        return false;
	      }
	    };
	    request.onload = function () {
	      if (this.status >= 200 && this.status < 400) {
	        // Success!
	        response = jsonValidate(this.response) ? JSON.parse(this.response) : this.response;
	        callback(response);
	        //var resp = this.response;
	      } else {
	          // We reached our target server, but it returned an error

	        }
	    };

	    request.onerror = function () {
	      // There was a connection error of some sort
	    };

	    request.send();
	  },

	  // thanks to https://gist.github.com/dperini/ac3d921d6a08f10fd10e
	  getScrollingElement: function getScrollingElement() {
	    var d = document;
	    return d.documentElement.scrollHeight > d.body.scrollHeight && d.compatMode.indexOf('CSS1') === 0 ? d.documentElement : d.body;
	  },
	  // thanks to https://github.com/bendc/anchor-scroll/blob/master/scroll.js
	  anchorScroll: function anchorScroll() {

	    var links = document.querySelectorAll("a.scroll");
	    var i = links.length;
	    var root = Util.getScrollingElement();
	    var easeInOutCubic = function easeInOutCubic(t, b, c, d) {
	      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	      return c / 2 * ((t -= 2) * t * t + 2) + b;
	    };
	    while (i--) links.item(i).addEventListener("click", function (e) {
	      var startTime;
	      var startPos = root.scrollTop;
	      var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]) ? document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top : startPos;
	      var maxScroll = root.scrollHeight - window.innerHeight;
	      var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
	      var duration = 900;
	      var scroll = function scroll(timestamp) {
	        startTime = startTime || timestamp;
	        var elapsed = timestamp - startTime;
	        var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);
	        root.scrollTop = progress;
	        elapsed < duration && requestAnimationFrame(scroll);
	      };
	      requestAnimationFrame(scroll);
	      e.preventDefault();
	    });
	  }

	};

	module.exports = Util;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = "\n<footer>\n  <div class=\"container\">\n    <div class=\"vcard\">\n      <a class=\"fn\" href=\"http://gravatar.com/pbdm915\">Bo PENG</a> © 2012 - " + new Date().getFullYear() + "\n    </div>\n  </div>\n</footer>\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(PBDm) {'use strict';

	var tmpl = {
	  wiki: '',
	  blog: ''
	};

	var getListData = function getListData(type, render) {

	  PBDm.get('dist/' + type + '.json', function (data) {
	    tmpl[type] = getListTmpl(type, data);
	    if (tmpl.wiki && tmpl.blog) {
	      var content = renderContent(tmpl.blog, tmpl.wiki);
	      render({ tmpl: content });
	      NProgress.done();
	    }
	  });
	};

	var renderContent = function renderContent() {
	  var blog = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var wiki = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  return '\n    <div class=\'container\'>\n      <ul>\n        <h2>Blog</h2>\n        ' + blog + '\n      </ul>\n      <ul>\n        <h2>Wiki</h2>\n        ' + wiki + '\n      </ul>\n    </div>\n  ';
	};

	var getListTmpl = function getListTmpl(type, data) {
	  var template = '';
	  data.map(function (result) {
	    template += '<li><a href=\'#/' + type + '/' + result.path + '\'>' + result.title + '</a></li>';
	  });
	  return template;
	};

	module.exports = {
	  tmpl: '',

	  onLoad: function onLoad(render) {
	    getListData('blog', render);
	    getListData('wiki', render);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  tmpl: "\n    <div class=\"container typo\">\n      <div id=\"who\">\n        <div class=\"intro-image\">\n          <h2>我是谁</h2>\n        </div>\n        <div clsss=\"intro-acticle\">\n          <h3>职业</h3>\n          码农\n          <h3>个人介绍</h3>\n          1986年(好老啊)出生于江西, 2012年毕业于巴黎第七大学计算机专业, 目前在平安健康做前端....\n          <h3>兴趣爱好</h3>\n          堆代码, 看球\n        </div>\n      </div>\n      <div id=\"inter\">\n        <div class=\"intro-image\">\n          <h2>国际米兰</h2>\n        </div>\n        <p>\n          我是国际米兰的忠实伪球迷(内拉......), 和很多其他的内拉一样, 因为大罗而喜欢国米, 然后是雷科巴, 萨内蒂, 师奶~~\n        </p>\n      </div>\n    </div>\n  ",

	  onLoad: function onLoad() {
	    NProgress.done();
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(PBDm) {"use strict";

	var _getIterator = __webpack_require__(7)["default"];

	module.exports = {
	  tmpl: "\n    <div class=\"container\">\n      <div id=\"football\">\n        <div class=\"team\">\n        </div>\n      </div>\n    </div>\n  ",

	  onLoad: function onLoad() {
	    var parent = document.getElementsByClassName("team")[0];
	    if (parent) {
	      PBDm.get('/json/football.json', function (data) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = _getIterator(data.teams), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var team = _step.value;

	            PBDm.drawPlayGround(parent, data.meazza, data.m, team);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator["return"]) {
	              _iterator["return"]();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }

	        NProgress.done();
	      });
	    }
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(35);
	module.exports = __webpack_require__(38);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	var Iterators = __webpack_require__(13);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var setUnscope = __webpack_require__(11)
	  , step       = __webpack_require__(12)
	  , Iterators  = __webpack_require__(13)
	  , toIObject  = __webpack_require__(14);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(18)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(15)
	  , defined = __webpack_require__(17);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	var cof = __webpack_require__(16);
	module.exports = 0 in Object('z') ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(19)
	  , $def            = __webpack_require__(20)
	  , $redef          = __webpack_require__(23)
	  , hide            = __webpack_require__(24)
	  , has             = __webpack_require__(29)
	  , SYMBOL_ITERATOR = __webpack_require__(30)('iterator')
	  , Iterators       = __webpack_require__(13)
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  __webpack_require__(33)(Constructor, NAME, next);
	  var createMethod = function(kind){
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = __webpack_require__(25).getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    __webpack_require__(34)(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(21)
	  , core      = __webpack_require__(22)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 21 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math
	  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 22 */
/***/ function(module, exports) {

	var core = module.exports = {};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(25)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(27) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(28)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(31)('wks')
	  , Symbol = __webpack_require__(21).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || __webpack_require__(32))('Symbol.' + name));
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(21)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(25)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(24)(IteratorPrototype, __webpack_require__(30)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: __webpack_require__(26)(1,next)});
	  __webpack_require__(34)(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var has  = __webpack_require__(29)
	  , hide = __webpack_require__(24)
	  , TAG  = __webpack_require__(30)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(36)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(18)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var toInteger = __webpack_require__(37)
	  , defined   = __webpack_require__(17);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(39)
	  , get      = __webpack_require__(41);
	module.exports = __webpack_require__(22).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(40);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	// http://jsperf.com/core-js-isobject
	module.exports = function(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(42)
	  , ITERATOR  = __webpack_require__(30)('iterator')
	  , Iterators = __webpack_require__(13);
	module.exports = __webpack_require__(22).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(16)
	  , TAG = __webpack_require__(30)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(PBDm, marked) {'use strict';

	var _getIterator = __webpack_require__(7)['default'];

	var query = {};

	var getPostList = function getPostList(render) {
	  PBDm.get(query.url, function (list) {
	    var tmp = list.filter(function (n) {
	      return n.path === query.name;
	    });
	    tmp.length > 0 ? getPostDetail(tmp, list, render) : postNotFound(render);
	  });
	};

	var getPostDetail = function getPostDetail(tmp, list, render) {
	  PBDm.get(tmp[0].fullpath, function (content) {
	    var tmpl = renderContent(query, content, list);
	    render({ tmpl: tmpl });
	    PBDm.affix();
	    // $(".post").toc();
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = _getIterator(document.querySelectorAll('pre code')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var block = _step.value;

	        hljs.highlightBlock(block);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator['return']) {
	          _iterator['return']();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    NProgress.done();
	  });
	};

	var postNotFound = function postNotFound(render) {
	  var tmpl = '\n    <div class="container">\n      文章不存在\n    </div>\n  ';
	  render({ tmpl: tmpl });
	  NProgress.done();
	};

	var getListTmpl = function getListTmpl(type, data) {
	  var template = '';
	  data.map(function (result) {
	    template += '<li><a href=\'#/' + type + '/' + result.path + '\'>' + result.title + '</a></li>';
	  });
	  return template;
	};

	var renderContent = function renderContent(query, content, list) {
	  return '\n    <div class="container">\n      <div class=\'post typo\'>\n        <h1 class=\'title\'>' + decodeURIComponent(query.name) + '</h1>\n        <div>' + marked(content) + '</div>\n      </div>\n      <div class="list">\n        <ul>\n          ' + getListTmpl(query.page, list) + '\n        </ul>\n        <div class="list-container">\n        </div>\n      </div>\n    </div>\n  ';
	};

	module.exports = {
	  tmpl: '',

	  onLoad: function onLoad(render) {
	    getPostList(render);
	  },

	  setQuery: function setQuery(params) {
	    query = params;
	    query.url = 'dist/' + params.page + '.json';
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(44)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(marked, global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */

	;(function() {

	/**
	 * Block-Level Grammar
	 */

	var block = {
	  newline: /^\n+/,
	  code: /^( {4}[^\n]+\n*)+/,
	  fences: noop,
	  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	  nptable: noop,
	  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	  table: noop,
	  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	  text: /^[^\n]+/
	};

	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
	  (/bull/g, block.bullet)
	  ();

	block.list = replace(block.list)
	  (/bull/g, block.bullet)
	  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	  ('def', '\\n+(?=' + block.def.source + ')')
	  ();

	block.blockquote = replace(block.blockquote)
	  ('def', block.def)
	  ();

	block._tag = '(?!(?:'
	  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
	  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
	  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

	block.html = replace(block.html)
	  ('comment', /<!--[\s\S]*?-->/)
	  ('closed', /<(tag)[\s\S]+?<\/\1>/)
	  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	  (/tag/g, block._tag)
	  ();

	block.paragraph = replace(block.paragraph)
	  ('hr', block.hr)
	  ('heading', block.heading)
	  ('lheading', block.lheading)
	  ('blockquote', block.blockquote)
	  ('tag', '<' + block._tag)
	  ('def', block.def)
	  ();

	/**
	 * Normal Block Grammar
	 */

	block.normal = merge({}, block);

	/**
	 * GFM Block Grammar
	 */

	block.gfm = merge({}, block.normal, {
	  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
	  paragraph: /^/,
	  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});

	block.gfm.paragraph = replace(block.paragraph)
	  ('(?!', '(?!'
	    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
	    + block.list.source.replace('\\1', '\\3') + '|')
	  ();

	/**
	 * GFM + Tables Block Grammar
	 */

	block.tables = merge({}, block.gfm, {
	  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});

	/**
	 * Block Lexer
	 */

	function Lexer(options) {
	  this.tokens = [];
	  this.tokens.links = {};
	  this.options = options || marked.defaults;
	  this.rules = block.normal;

	  if (this.options.gfm) {
	    if (this.options.tables) {
	      this.rules = block.tables;
	    } else {
	      this.rules = block.gfm;
	    }
	  }
	}

	/**
	 * Expose Block Rules
	 */

	Lexer.rules = block;

	/**
	 * Static Lex Method
	 */

	Lexer.lex = function(src, options) {
	  var lexer = new Lexer(options);
	  return lexer.lex(src);
	};

	/**
	 * Preprocessing
	 */

	Lexer.prototype.lex = function(src) {
	  src = src
	    .replace(/\r\n|\r/g, '\n')
	    .replace(/\t/g, '    ')
	    .replace(/\u00a0/g, ' ')
	    .replace(/\u2424/g, '\n');

	  return this.token(src, true);
	};

	/**
	 * Lexing
	 */

	Lexer.prototype.token = function(src, top, bq) {
	  var src = src.replace(/^ +$/gm, '')
	    , next
	    , loose
	    , cap
	    , bull
	    , b
	    , item
	    , space
	    , i
	    , l;

	  while (src) {
	    // newline
	    if (cap = this.rules.newline.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[0].length > 1) {
	        this.tokens.push({
	          type: 'space'
	        });
	      }
	    }

	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      cap = cap[0].replace(/^ {4}/gm, '');
	      this.tokens.push({
	        type: 'code',
	        text: !this.options.pedantic
	          ? cap.replace(/\n+$/, '')
	          : cap
	      });
	      continue;
	    }

	    // fences (gfm)
	    if (cap = this.rules.fences.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'code',
	        lang: cap[2],
	        text: cap[3] || ''
	      });
	      continue;
	    }

	    // heading
	    if (cap = this.rules.heading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[1].length,
	        text: cap[2]
	      });
	      continue;
	    }

	    // table no leading pipe (gfm)
	    if (top && (cap = this.rules.nptable.exec(src))) {
	      src = src.substring(cap[0].length);

	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/\n$/, '').split('\n')
	      };

	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }

	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i].split(/ *\| */);
	      }

	      this.tokens.push(item);

	      continue;
	    }

	    // lheading
	    if (cap = this.rules.lheading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[2] === '=' ? 1 : 2,
	        text: cap[1]
	      });
	      continue;
	    }

	    // hr
	    if (cap = this.rules.hr.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'hr'
	      });
	      continue;
	    }

	    // blockquote
	    if (cap = this.rules.blockquote.exec(src)) {
	      src = src.substring(cap[0].length);

	      this.tokens.push({
	        type: 'blockquote_start'
	      });

	      cap = cap[0].replace(/^ *> ?/gm, '');

	      // Pass `top` to keep the current
	      // "toplevel" state. This is exactly
	      // how markdown.pl works.
	      this.token(cap, top, true);

	      this.tokens.push({
	        type: 'blockquote_end'
	      });

	      continue;
	    }

	    // list
	    if (cap = this.rules.list.exec(src)) {
	      src = src.substring(cap[0].length);
	      bull = cap[2];

	      this.tokens.push({
	        type: 'list_start',
	        ordered: bull.length > 1
	      });

	      // Get each top-level item.
	      cap = cap[0].match(this.rules.item);

	      next = false;
	      l = cap.length;
	      i = 0;

	      for (; i < l; i++) {
	        item = cap[i];

	        // Remove the list item's bullet
	        // so it is seen as the next token.
	        space = item.length;
	        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

	        // Outdent whatever the
	        // list item contains. Hacky.
	        if (~item.indexOf('\n ')) {
	          space -= item.length;
	          item = !this.options.pedantic
	            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
	            : item.replace(/^ {1,4}/gm, '');
	        }

	        // Determine whether the next list item belongs here.
	        // Backpedal if it does not belong in this list.
	        if (this.options.smartLists && i !== l - 1) {
	          b = block.bullet.exec(cap[i + 1])[0];
	          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	            src = cap.slice(i + 1).join('\n') + src;
	            i = l - 1;
	          }
	        }

	        // Determine whether item is loose or not.
	        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	        // for discount behavior.
	        loose = next || /\n\n(?!\s*$)/.test(item);
	        if (i !== l - 1) {
	          next = item.charAt(item.length - 1) === '\n';
	          if (!loose) loose = next;
	        }

	        this.tokens.push({
	          type: loose
	            ? 'loose_item_start'
	            : 'list_item_start'
	        });

	        // Recurse.
	        this.token(item, false, bq);

	        this.tokens.push({
	          type: 'list_item_end'
	        });
	      }

	      this.tokens.push({
	        type: 'list_end'
	      });

	      continue;
	    }

	    // html
	    if (cap = this.rules.html.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: this.options.sanitize
	          ? 'paragraph'
	          : 'html',
	        pre: !this.options.sanitizer
	          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
	        text: cap[0]
	      });
	      continue;
	    }

	    // def
	    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.links[cap[1].toLowerCase()] = {
	        href: cap[2],
	        title: cap[3]
	      };
	      continue;
	    }

	    // table (gfm)
	    if (top && (cap = this.rules.table.exec(src))) {
	      src = src.substring(cap[0].length);

	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	      };

	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }

	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i]
	          .replace(/^ *\| *| *\| *$/g, '')
	          .split(/ *\| */);
	      }

	      this.tokens.push(item);

	      continue;
	    }

	    // top-level paragraph
	    if (top && (cap = this.rules.paragraph.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'paragraph',
	        text: cap[1].charAt(cap[1].length - 1) === '\n'
	          ? cap[1].slice(0, -1)
	          : cap[1]
	      });
	      continue;
	    }

	    // text
	    if (cap = this.rules.text.exec(src)) {
	      // Top-level should never reach here.
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'text',
	        text: cap[0]
	      });
	      continue;
	    }

	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }

	  return this.tokens;
	};

	/**
	 * Inline-Level Grammar
	 */

	var inline = {
	  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	  url: noop,
	  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	  link: /^!?\[(inside)\]\(href\)/,
	  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	  br: /^ {2,}\n(?!\s*$)/,
	  del: noop,
	  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};

	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

	inline.link = replace(inline.link)
	  ('inside', inline._inside)
	  ('href', inline._href)
	  ();

	inline.reflink = replace(inline.reflink)
	  ('inside', inline._inside)
	  ();

	/**
	 * Normal Inline Grammar
	 */

	inline.normal = merge({}, inline);

	/**
	 * Pedantic Inline Grammar
	 */

	inline.pedantic = merge({}, inline.normal, {
	  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});

	/**
	 * GFM Inline Grammar
	 */

	inline.gfm = merge({}, inline.normal, {
	  escape: replace(inline.escape)('])', '~|])')(),
	  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	  del: /^~~(?=\S)([\s\S]*?\S)~~/,
	  text: replace(inline.text)
	    (']|', '~]|')
	    ('|', '|https?://|')
	    ()
	});

	/**
	 * GFM + Line Breaks Inline Grammar
	 */

	inline.breaks = merge({}, inline.gfm, {
	  br: replace(inline.br)('{2,}', '*')(),
	  text: replace(inline.gfm.text)('{2,}', '*')()
	});

	/**
	 * Inline Lexer & Compiler
	 */

	function InlineLexer(links, options) {
	  this.options = options || marked.defaults;
	  this.links = links;
	  this.rules = inline.normal;
	  this.renderer = this.options.renderer || new Renderer;
	  this.renderer.options = this.options;

	  if (!this.links) {
	    throw new
	      Error('Tokens array requires a `links` property.');
	  }

	  if (this.options.gfm) {
	    if (this.options.breaks) {
	      this.rules = inline.breaks;
	    } else {
	      this.rules = inline.gfm;
	    }
	  } else if (this.options.pedantic) {
	    this.rules = inline.pedantic;
	  }
	}

	/**
	 * Expose Inline Rules
	 */

	InlineLexer.rules = inline;

	/**
	 * Static Lexing/Compiling Method
	 */

	InlineLexer.output = function(src, links, options) {
	  var inline = new InlineLexer(links, options);
	  return inline.output(src);
	};

	/**
	 * Lexing/Compiling
	 */

	InlineLexer.prototype.output = function(src) {
	  var out = ''
	    , link
	    , text
	    , href
	    , cap;

	  while (src) {
	    // escape
	    if (cap = this.rules.escape.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += cap[1];
	      continue;
	    }

	    // autolink
	    if (cap = this.rules.autolink.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[2] === '@') {
	        text = cap[1].charAt(6) === ':'
	          ? this.mangle(cap[1].substring(7))
	          : this.mangle(cap[1]);
	        href = this.mangle('mailto:') + text;
	      } else {
	        text = escape(cap[1]);
	        href = text;
	      }
	      out += this.renderer.link(href, null, text);
	      continue;
	    }

	    // url (gfm)
	    if (!this.inLink && (cap = this.rules.url.exec(src))) {
	      src = src.substring(cap[0].length);
	      text = escape(cap[1]);
	      href = text;
	      out += this.renderer.link(href, null, text);
	      continue;
	    }

	    // tag
	    if (cap = this.rules.tag.exec(src)) {
	      if (!this.inLink && /^<a /i.test(cap[0])) {
	        this.inLink = true;
	      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	        this.inLink = false;
	      }
	      src = src.substring(cap[0].length);
	      out += this.options.sanitize
	        ? this.options.sanitizer
	          ? this.options.sanitizer(cap[0])
	          : escape(cap[0])
	        : cap[0]
	      continue;
	    }

	    // link
	    if (cap = this.rules.link.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.inLink = true;
	      out += this.outputLink(cap, {
	        href: cap[2],
	        title: cap[3]
	      });
	      this.inLink = false;
	      continue;
	    }

	    // reflink, nolink
	    if ((cap = this.rules.reflink.exec(src))
	        || (cap = this.rules.nolink.exec(src))) {
	      src = src.substring(cap[0].length);
	      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	      link = this.links[link.toLowerCase()];
	      if (!link || !link.href) {
	        out += cap[0].charAt(0);
	        src = cap[0].substring(1) + src;
	        continue;
	      }
	      this.inLink = true;
	      out += this.outputLink(cap, link);
	      this.inLink = false;
	      continue;
	    }

	    // strong
	    if (cap = this.rules.strong.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.strong(this.output(cap[2] || cap[1]));
	      continue;
	    }

	    // em
	    if (cap = this.rules.em.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.em(this.output(cap[2] || cap[1]));
	      continue;
	    }

	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.codespan(escape(cap[2], true));
	      continue;
	    }

	    // br
	    if (cap = this.rules.br.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.br();
	      continue;
	    }

	    // del (gfm)
	    if (cap = this.rules.del.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.del(this.output(cap[1]));
	      continue;
	    }

	    // text
	    if (cap = this.rules.text.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.text(escape(this.smartypants(cap[0])));
	      continue;
	    }

	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }

	  return out;
	};

	/**
	 * Compile Link
	 */

	InlineLexer.prototype.outputLink = function(cap, link) {
	  var href = escape(link.href)
	    , title = link.title ? escape(link.title) : null;

	  return cap[0].charAt(0) !== '!'
	    ? this.renderer.link(href, title, this.output(cap[1]))
	    : this.renderer.image(href, title, escape(cap[1]));
	};

	/**
	 * Smartypants Transformations
	 */

	InlineLexer.prototype.smartypants = function(text) {
	  if (!this.options.smartypants) return text;
	  return text
	    // em-dashes
	    .replace(/---/g, '\u2014')
	    // en-dashes
	    .replace(/--/g, '\u2013')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	    // closing singles & apostrophes
	    .replace(/'/g, '\u2019')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
	    // closing doubles
	    .replace(/"/g, '\u201d')
	    // ellipses
	    .replace(/\.{3}/g, '\u2026');
	};

	/**
	 * Mangle Links
	 */

	InlineLexer.prototype.mangle = function(text) {
	  if (!this.options.mangle) return text;
	  var out = ''
	    , l = text.length
	    , i = 0
	    , ch;

	  for (; i < l; i++) {
	    ch = text.charCodeAt(i);
	    if (Math.random() > 0.5) {
	      ch = 'x' + ch.toString(16);
	    }
	    out += '&#' + ch + ';';
	  }

	  return out;
	};

	/**
	 * Renderer
	 */

	function Renderer(options) {
	  this.options = options || {};
	}

	Renderer.prototype.code = function(code, lang, escaped) {
	  if (this.options.highlight) {
	    var out = this.options.highlight(code, lang);
	    if (out != null && out !== code) {
	      escaped = true;
	      code = out;
	    }
	  }

	  if (!lang) {
	    return '<pre><code>'
	      + (escaped ? code : escape(code, true))
	      + '\n</code></pre>';
	  }

	  return '<pre><code class="'
	    + this.options.langPrefix
	    + escape(lang, true)
	    + '">'
	    + (escaped ? code : escape(code, true))
	    + '\n</code></pre>\n';
	};

	Renderer.prototype.blockquote = function(quote) {
	  return '<blockquote>\n' + quote + '</blockquote>\n';
	};

	Renderer.prototype.html = function(html) {
	  return html;
	};

	Renderer.prototype.heading = function(text, level, raw) {
	  return '<h'
	    + level
	    + ' id="'
	    + this.options.headerPrefix
	    + raw.toLowerCase().replace(/[^\w]+/g, '-')
	    + '">'
	    + text
	    + '</h'
	    + level
	    + '>\n';
	};

	Renderer.prototype.hr = function() {
	  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};

	Renderer.prototype.list = function(body, ordered) {
	  var type = ordered ? 'ol' : 'ul';
	  return '<' + type + '>\n' + body + '</' + type + '>\n';
	};

	Renderer.prototype.listitem = function(text) {
	  return '<li>' + text + '</li>\n';
	};

	Renderer.prototype.paragraph = function(text) {
	  return '<p>' + text + '</p>\n';
	};

	Renderer.prototype.table = function(header, body) {
	  return '<table>\n'
	    + '<thead>\n'
	    + header
	    + '</thead>\n'
	    + '<tbody>\n'
	    + body
	    + '</tbody>\n'
	    + '</table>\n';
	};

	Renderer.prototype.tablerow = function(content) {
	  return '<tr>\n' + content + '</tr>\n';
	};

	Renderer.prototype.tablecell = function(content, flags) {
	  var type = flags.header ? 'th' : 'td';
	  var tag = flags.align
	    ? '<' + type + ' style="text-align:' + flags.align + '">'
	    : '<' + type + '>';
	  return tag + content + '</' + type + '>\n';
	};

	// span level renderer
	Renderer.prototype.strong = function(text) {
	  return '<strong>' + text + '</strong>';
	};

	Renderer.prototype.em = function(text) {
	  return '<em>' + text + '</em>';
	};

	Renderer.prototype.codespan = function(text) {
	  return '<code>' + text + '</code>';
	};

	Renderer.prototype.br = function() {
	  return this.options.xhtml ? '<br/>' : '<br>';
	};

	Renderer.prototype.del = function(text) {
	  return '<del>' + text + '</del>';
	};

	Renderer.prototype.link = function(href, title, text) {
	  if (this.options.sanitize) {
	    try {
	      var prot = decodeURIComponent(unescape(href))
	        .replace(/[^\w:]/g, '')
	        .toLowerCase();
	    } catch (e) {
	      return '';
	    }
	    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	      return '';
	    }
	  }
	  var out = '<a href="' + href + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += '>' + text + '</a>';
	  return out;
	};

	Renderer.prototype.image = function(href, title, text) {
	  var out = '<img src="' + href + '" alt="' + text + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += this.options.xhtml ? '/>' : '>';
	  return out;
	};

	Renderer.prototype.text = function(text) {
	  return text;
	};

	/**
	 * Parsing & Compiling
	 */

	function Parser(options) {
	  this.tokens = [];
	  this.token = null;
	  this.options = options || marked.defaults;
	  this.options.renderer = this.options.renderer || new Renderer;
	  this.renderer = this.options.renderer;
	  this.renderer.options = this.options;
	}

	/**
	 * Static Parse Method
	 */

	Parser.parse = function(src, options, renderer) {
	  var parser = new Parser(options, renderer);
	  return parser.parse(src);
	};

	/**
	 * Parse Loop
	 */

	Parser.prototype.parse = function(src) {
	  this.inline = new InlineLexer(src.links, this.options, this.renderer);
	  this.tokens = src.reverse();

	  var out = '';
	  while (this.next()) {
	    out += this.tok();
	  }

	  return out;
	};

	/**
	 * Next Token
	 */

	Parser.prototype.next = function() {
	  return this.token = this.tokens.pop();
	};

	/**
	 * Preview Next Token
	 */

	Parser.prototype.peek = function() {
	  return this.tokens[this.tokens.length - 1] || 0;
	};

	/**
	 * Parse Text Tokens
	 */

	Parser.prototype.parseText = function() {
	  var body = this.token.text;

	  while (this.peek().type === 'text') {
	    body += '\n' + this.next().text;
	  }

	  return this.inline.output(body);
	};

	/**
	 * Parse Current Token
	 */

	Parser.prototype.tok = function() {
	  switch (this.token.type) {
	    case 'space': {
	      return '';
	    }
	    case 'hr': {
	      return this.renderer.hr();
	    }
	    case 'heading': {
	      return this.renderer.heading(
	        this.inline.output(this.token.text),
	        this.token.depth,
	        this.token.text);
	    }
	    case 'code': {
	      return this.renderer.code(this.token.text,
	        this.token.lang,
	        this.token.escaped);
	    }
	    case 'table': {
	      var header = ''
	        , body = ''
	        , i
	        , row
	        , cell
	        , flags
	        , j;

	      // header
	      cell = '';
	      for (i = 0; i < this.token.header.length; i++) {
	        flags = { header: true, align: this.token.align[i] };
	        cell += this.renderer.tablecell(
	          this.inline.output(this.token.header[i]),
	          { header: true, align: this.token.align[i] }
	        );
	      }
	      header += this.renderer.tablerow(cell);

	      for (i = 0; i < this.token.cells.length; i++) {
	        row = this.token.cells[i];

	        cell = '';
	        for (j = 0; j < row.length; j++) {
	          cell += this.renderer.tablecell(
	            this.inline.output(row[j]),
	            { header: false, align: this.token.align[j] }
	          );
	        }

	        body += this.renderer.tablerow(cell);
	      }
	      return this.renderer.table(header, body);
	    }
	    case 'blockquote_start': {
	      var body = '';

	      while (this.next().type !== 'blockquote_end') {
	        body += this.tok();
	      }

	      return this.renderer.blockquote(body);
	    }
	    case 'list_start': {
	      var body = ''
	        , ordered = this.token.ordered;

	      while (this.next().type !== 'list_end') {
	        body += this.tok();
	      }

	      return this.renderer.list(body, ordered);
	    }
	    case 'list_item_start': {
	      var body = '';

	      while (this.next().type !== 'list_item_end') {
	        body += this.token.type === 'text'
	          ? this.parseText()
	          : this.tok();
	      }

	      return this.renderer.listitem(body);
	    }
	    case 'loose_item_start': {
	      var body = '';

	      while (this.next().type !== 'list_item_end') {
	        body += this.tok();
	      }

	      return this.renderer.listitem(body);
	    }
	    case 'html': {
	      var html = !this.token.pre && !this.options.pedantic
	        ? this.inline.output(this.token.text)
	        : this.token.text;
	      return this.renderer.html(html);
	    }
	    case 'paragraph': {
	      return this.renderer.paragraph(this.inline.output(this.token.text));
	    }
	    case 'text': {
	      return this.renderer.paragraph(this.parseText());
	    }
	  }
	};

	/**
	 * Helpers
	 */

	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}

	function unescape(html) {
	  return html.replace(/&([#\w]+);/g, function(_, n) {
	    n = n.toLowerCase();
	    if (n === 'colon') return ':';
	    if (n.charAt(0) === '#') {
	      return n.charAt(1) === 'x'
	        ? String.fromCharCode(parseInt(n.substring(2), 16))
	        : String.fromCharCode(+n.substring(1));
	    }
	    return '';
	  });
	}

	function replace(regex, opt) {
	  regex = regex.source;
	  opt = opt || '';
	  return function self(name, val) {
	    if (!name) return new RegExp(regex, opt);
	    val = val.source || val;
	    val = val.replace(/(^|[^\[])\^/g, '$1');
	    regex = regex.replace(name, val);
	    return self;
	  };
	}

	function noop() {}
	noop.exec = noop;

	function merge(obj) {
	  var i = 1
	    , target
	    , key;

	  for (; i < arguments.length; i++) {
	    target = arguments[i];
	    for (key in target) {
	      if (Object.prototype.hasOwnProperty.call(target, key)) {
	        obj[key] = target[key];
	      }
	    }
	  }

	  return obj;
	}


	/**
	 * Marked
	 */

	function marked(src, opt, callback) {
	  if (callback || typeof opt === 'function') {
	    if (!callback) {
	      callback = opt;
	      opt = null;
	    }

	    opt = merge({}, marked.defaults, opt || {});

	    var highlight = opt.highlight
	      , tokens
	      , pending
	      , i = 0;

	    try {
	      tokens = Lexer.lex(src, opt)
	    } catch (e) {
	      return callback(e);
	    }

	    pending = tokens.length;

	    var done = function(err) {
	      if (err) {
	        opt.highlight = highlight;
	        return callback(err);
	      }

	      var out;

	      try {
	        out = Parser.parse(tokens, opt);
	      } catch (e) {
	        err = e;
	      }

	      opt.highlight = highlight;

	      return err
	        ? callback(err)
	        : callback(null, out);
	    };

	    if (!highlight || highlight.length < 3) {
	      return done();
	    }

	    delete opt.highlight;

	    if (!pending) return done();

	    for (; i < tokens.length; i++) {
	      (function(token) {
	        if (token.type !== 'code') {
	          return --pending || done();
	        }
	        return highlight(token.text, token.lang, function(err, code) {
	          if (err) return done(err);
	          if (code == null || code === token.text) {
	            return --pending || done();
	          }
	          token.text = code;
	          token.escaped = true;
	          --pending || done();
	        });
	      })(tokens[i]);
	    }

	    return;
	  }
	  try {
	    if (opt) opt = merge({}, marked.defaults, opt);
	    return Parser.parse(Lexer.lex(src, opt), opt);
	  } catch (e) {
	    e.message += '\nPlease report this to https://github.com/chjj/marked.';
	    if ((opt || marked.defaults).silent) {
	      return '<p>An error occured:</p><pre>'
	        + escape(e.message + '', true)
	        + '</pre>';
	    }
	    throw e;
	  }
	}

	/**
	 * Options
	 */

	marked.options =
	marked.setOptions = function(opt) {
	  merge(marked.defaults, opt);
	  return marked;
	};

	marked.defaults = {
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  sanitizer: null,
	  mangle: true,
	  smartLists: false,
	  silent: false,
	  highlight: null,
	  langPrefix: 'lang-',
	  smartypants: false,
	  headerPrefix: '',
	  renderer: new Renderer,
	  xhtml: false
	};

	/**
	 * Expose
	 */

	marked.Parser = Parser;
	marked.parser = Parser.parse;

	marked.Renderer = Renderer;

	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;

	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;

	marked.parse = marked;

	if (true) {
	  module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
	  define(function() { return marked; });
	} else {
	  this.marked = marked;
	}

	}).call(function() {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44), (function() { return this; }())))

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  tmpl: "\n    <div class=\"container\">\n      404\n    </div>\n  ",
	  onLoad: function onLoad() {
	    NProgress.done();
	  }
	};

/***/ }
/******/ ]);