"use strict";

/**
 * [affix description]
 * @return {[type]} [description]
 */
var affix = function() {
  var 
    postList = document.getElementsByClassName("list")[0],
    postContainer = document.getElementsByClassName("list-container")[0],
    container = document.getElementsByClassName("container")[0],
    containerPadding = parseInt(getComputedStyle(container)['padding-left']) 
    + parseInt(getComputedStyle(container)['padding-right']),
    myBody = document.getElementById("body"),
    postsWidth,
    scrollTop;
  if (postList && postList.clientHeight < window.innerHeight) {
    postsWidth = (container.clientWidth - containerPadding ) * 0.25;
    window.onresize = function(event) {
      if (window.innerWidth > 767) {
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop //for IE,firefox..
        postsWidth = (container.clientWidth - containerPadding )* 0.25;
        postContainer.style.width = postsWidth + 'px';
        if (scrollTop > postList.offsetTop) {
          postContainer.style.position = "fixed";
          postContainer.style.top = "0px";
        }
      } else {
        postContainer.style.position = "static";
        postsWidth = container.clientWidth - containerPadding;
        postContainer.style.width = postsWidth + 'px';
      }
    };
    document.addEventListener ('scroll',function() {
      if (window.innerWidth > 767) {
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop //for IE,firefox..
        if (scrollTop > postList.offsetTop) {
          postContainer.style.position = "fixed";
          postContainer.style.top = "0px";
          postContainer.style.width = postsWidth + 'px';
        } else {
          postContainer.style.position = "static";
        }
      }
    });
  }
}

/**
 * [navTop description]
 * @return {[type]} [description]
 */
var navTop = function () {
  var 
    myNav = document.getElementsByTagName("nav")[0],
    navW = document.getElementsByClassName("wrapper")[0],
    navY,
    navH = myNav.offsetHeight,
    scrollTop;
  document.addEventListener ('scroll',function() {
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop //for IE,firefox..
    //nav bar
    if (scrollTop < navY) {
      navW.style.position = "fixed";
      myNav.style.marginTop = navH + "px";
      navW.style.marginTop =  "-" + navH +"px";
    } else {
      navW.style.position = "static";
      myNav.style.marginTop = 0;
      navW.style.marginTop = 0;
    }
    navY = scrollTop;    
  });
}

/**
 * [whichBrowser description]
 * @return {[type]} [browser type]
 */
var whichBrowser = function (){
  var 
    sys = {},
    ua = navigator.userAgent.toLowerCase(),
    s;
  (s = ua.match(/msie ([\d.]+)/))             ? sys.ie = s[1] :
  (s = ua.match(/rv:([\d.]+)\) like gecko/))  ? sys.ie = s[1] : //ie11
  (s = ua.match(/firefox\/([\d.]+)/))         ? sys.firefox = s[1] :
  (s = ua.match(/chrome\/([\d.]+)/))          ? sys.chrome = s[1] :
  (s = ua.match(/opera.([\d.]+)/))            ? sys.opera = s[1] :
  (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
  return sys;
}

/**
 * [drawPlayGround description]
 * @param  {[type]} parent     [parent element]
 * @param  {[type]} p          [stadium size]
 * @param  {[type]} m          [zoom ratio]
 * @param  {[type]} players    [players date]
 * @return {[type]}            [description]
 */
var drawPlayGround = function (parent, p, m, players) {
  var 
    playgroundWapper = document.createElement("div"),
    playgroundName = document.createElement("h2"),
    name = document.createTextNode(players.date),
    playGround = document.createElement("canvas"),
    begin,
    end,
    ctx= playGround.getContext("2d");
  playgroundWapper.classList.add("playgroundWapper");
  playGround.classList.add("playground");
  playgroundName.appendChild(name);
  playgroundWapper.appendChild(playGround);
  parent.appendChild(playgroundName);
  parent.appendChild(playgroundWapper);
  //draw plagground
  ctx.canvas.width  = 410;
  ctx.canvas.height = 660;
  ctx.strokeStyle = "white";
  ctx.fillStyle   = "white";
  ctx.lineWidth = 1 / m;
  ctx.scale(m, m);
  ctx.rect(0,                  p.g.l,                p.w,    p.l);
  ctx.rect((p.w - p.pA.w) / 2, p.g.l,                p.pA.w, p.pA.l);
  ctx.rect((p.w - p.gA.w) / 2, p.g.l,                p.gA.w, p.gA.l);
  ctx.rect((p.w - p.g.w) / 2,  0,                    p.g.w,  p.g.l);
  ctx.rect((p.w - p.gA.w) / 2, p.g.l + p.l - p.gA.l, p.gA.w, p.gA.l);
  ctx.rect((p.w - p.pA.w) / 2, p.g.l + p.l - p.pA.l, p.pA.w, p.pA.l);
  ctx.rect((p.w - p.g.w) / 2,  p.l + p.g.l, p.g.w,   p.g.l);

  ctx.moveTo(0, p.g.l + p.l / 2);
  ctx.lineTo(p.w, p.g.l + p.l / 2);

  ctx.arc(p.w / 2, p.g.l + p.l/2, p.cr, 0, 2 * Math.PI);
  ctx.moveTo(0, p.g.l);

  ctx.arc(0, p.g.l, p.cnr, 0, Math.PI/2);
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
  ctx.arc(p.w / 2, p.g.l + p.p, 2 / m,  0, 2 * Math.PI);
  ctx.fill();
  ctx.arc(p.w / 2, p.g.l + p.l - p.p, 2 / m,  0, 2 * Math.PI);
  ctx.fill();
  ctx.arc(p.w / 2, p.g.l + p.l / 2, 2 / m,  0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  // add player  
  ctx.scale(1/m, 1/m);
  ctx.font="17px Verdana";
  ctx.textAlign = 'center';
  
  ctx.fillText(players.gk,p.w / 2 * m,p.l * m );

  ctx.fillText(players.lb  || '', p.cr * m, p.l * m *3 / 4);
  ctx.fillText(players.rb  || '', (p.w - p.cr) * m, p.l * m * 3 / 4);
  
  ctx.fillText(players.lcb || '', (p.w / 4) * m, p.l * m * 6 / 7);
  ctx.fillText(players.rcb || '', (p.w / 4 * 3) * m, p.l * m * 6 / 7);
  ctx.fillText(players.ccb || '', (p.w / 2) * m, p.l * m *6 / 7);

  ctx.fillText(players.ldm || '', (p.w / 4) * m, p.l * m * 2 / 3);
  ctx.fillText(players.rdm || '', (p.w / 4 * 3) * m, p.l * m * 2 / 3);
  ctx.fillText(players.cdm || '', (p.w / 2) * m, p.l * m * 2 / 3);

  ctx.fillText(players.lm  || '', p.cr * m, p.l * m * 1 / 2);
  ctx.fillText(players.rm  || '', (p.w - p.cr) * m, p.l * m * 1 / 2);
  ctx.fillText(players.cm  || '', (p.w / 2) * m, p.l * m * 1 / 2);

  ctx.fillText(players.lam || '', (p.w / 4) * m, p.l * m * 1 / 3);
  ctx.fillText(players.ram || '', (p.w / 4 * 3) * m, p.l * m * 1 / 3);
  ctx.fillText(players.cam || '', (p.w / 2) * m, p.l * m * 1 / 3);

  ctx.fillText(players.lwf || '', p.cr * m, p.l * m * 1 / 4);
  ctx.fillText(players.rwf || '', (p.w - p.cr) * m, p.l * m * 1 / 4);
  ctx.fillText(players.cf  || '', (p.w / 2) * m, p.l * m * 1 / 7);
  ctx.fillText(players.lf  || '', (p.w / 4) * m, p.l * m * 1 / 7);
  ctx.fillText(players.rf  || '', (p.w / 4 * 3) * m, p.l * m * 1 / 7);
};

/**
 * [gravatar description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
var gravatar = function ( profile ) {
  document.getElementsByClassName("accounts_weibo")[0].setAttribute('href',profile.entry[0].urls[1].value);
  document.getElementsByClassName("accounts_twitter")[0].setAttribute('href',profile.entry[0].accounts[3].url);
  document.getElementsByClassName("accounts_facebook")[0].setAttribute('href',profile.entry[0].accounts[0].url);
  document.getElementsByClassName("accounts_google")[0].setAttribute('href',profile.entry[0].accounts[1].url);
  document.getElementsByClassName("accounts_linkedin")[0].setAttribute('href',profile.entry[0].accounts[2].url);
  document.getElementsByClassName("accounts_github")[0].setAttribute('href',profile.entry[0].urls[2].value);
  document.getElementsByClassName("email")[0].setAttribute('href',"mailto:" + profile.entry[0].emails[0].value);
  document.getElementsByClassName("fn")[0].setAttribute('href',profile.entry[0].profileUrl);
  document.getElementsByClassName("fn")[0].innerHTML = profile.entry[0].name.givenName + ' ' + profile.entry[0].name.familyName;
}

var responsiveMenu = function () {
  var navList = document.querySelector("nav .wrapper > ul");
  var navMenu = document.getElementsByClassName("fa-list-ul")[0];
  navMenu.addEventListener ('click',function() {
    if (getComputedStyle(navList)['height'] == "1px") {
      navList.style.height = (function() {
        var height = 1; //1px for border
        Array.prototype.slice.call(navList.children).forEach(function(child){
          height += child.clientHeight;
        });
        return height;
      })() + "px";
    } else {
      navList.style.height = "1px";
    }
  });
}
