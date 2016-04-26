let Util = {

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
      postContainerTop,
      scrollTop,
      needFixTop;
    if (postContainer) {
      postContainerTop = parseInt(window.getComputedStyle(postContainer, null).getPropertyValue('margin-top'));
      needFixTop = postContainer.offsetTop - postContainerTop;
    }
    if (postList && postList.clientHeight < window.innerHeight) {
      postsWidth = (container.clientWidth - containerPadding) * 0.25;
      window.onresize = function() {
        if (window.innerWidth > 767) {
          scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //for IE,firefox..
          postsWidth = (container.clientWidth - containerPadding) * 0.25;
          postContainer.style.width = postsWidth + "px";
          if (scrollTop > (postContainer.offsetTop - postContainerTop)) {
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

  responsiveMenu: function() {
    var navList = document.querySelector("nav .wrapper > ul"),
      navMenu = document.getElementsByClassName("fa-list-ul")[0];
    navMenu.addEventListener("click",
      function() {
        if (getComputedStyle(navList).height === "1px") {
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
  },

  btt: function() {
    let btt = document.getElementById('back-to-top');
    let root = Util.getScrollingElement();
    window.addEventListener('scroll', () => {
      root.scrollTop > 50 ? btt.style.opacity = 1 : btt.style.opacity = 0;
    });
  },

  get: function(url,callback) {
    var request = new XMLHttpRequest();
    var response;
    request.open('GET', url, true);
    var jsonValidate = function(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (err) {
        return false;
      }
    };
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        response = jsonValidate(this.response) ? JSON.parse(this.response) : this.response;
        callback(response);
        //var resp = this.response;
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  },

  // thanks to https://gist.github.com/dperini/ac3d921d6a08f10fd10e
  getScrollingElement: () => {
    let d = document;
    return  d.documentElement.scrollHeight > d.body.scrollHeight &&
            d.compatMode.indexOf('CSS1') === 0 ?
            d.documentElement :
            d.body;
  },
  // thanks to https://github.com/bendc/anchor-scroll/blob/master/scroll.js
  anchorScroll: () => {

    var links = document.querySelectorAll("a.scroll")
    var i = links.length
    var root = Util.getScrollingElement();
    var easeInOutCubic = function(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b
      return c/2*((t-=2)*t*t + 2) + b
    }
    while (i--)
      links.item(i).addEventListener("click", function(e) {
        var startTime
        var startPos = root.scrollTop
        var endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]) ? document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top : startPos;
        var maxScroll = root.scrollHeight - window.innerHeight
        var scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos
        var duration = 900
        var scroll = function(timestamp) {
          startTime = startTime || timestamp
          var elapsed = timestamp - startTime
          var progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration)
          root.scrollTop = progress
          elapsed < duration && requestAnimationFrame(scroll)
        }
        requestAnimationFrame(scroll)
        e.preventDefault()
      })
  },

  delHtmlTag: (str) => {
    return str.replace(/<[^>]+>/g,"");
  },

  // 根据内容生成toc
  // dom: 源dom
  // toc: 要生成toc的目标dom
  toc: (dom, toc) => {

    // 遍历后生成需要的dom
    let childDoms = dom.getElementsByTagName('h2');
    let tocContent = document.createElement('ul');
    let scrollArray = [];
    for (let childDom of childDoms) {
      // 记录源dom的位置
      scrollArray.push(childDom.offsetTop)
      let tempDom = document.createElement('li');
      tempDom.innerHTML = Util.delHtmlTag(childDom.innerHTML);
      tocContent.appendChild(tempDom);
    }
    toc.appendChild(tocContent);
    
    // 监听滚动
    let tocList = tocContent.getElementsByTagName('li');
    // TODO 节流器
    window.addEventListener('scroll', () => {
      let top = Util.getScrollingElement().scrollTop + 200;
      let index;
      for (let i = 0; i < tocList.length; i++) {
        if ((top > scrollArray[i] && top <= scrollArray[i+1]) ||
            (i === tocList.length - 1 && top > scrollArray[i]) // for the last one
           ) {
          tocList[i].classList.add('on');
        } else {
          tocList[i].classList.remove('on');
        }
      }
    })
  }
};

module.exports = Util;
