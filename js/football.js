var drawPlayGround = function (p, m) {
  var playGrounds = document.getElementsByClassName("playground");
  for(i in playGrounds) {
    if (typeof(playGrounds[i]) == "object") {
      var 
        begin,
        end,
        playGround = playGrounds[i],
        ctx= playGround.getContext("2d");
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

      

    }
  }
}
var 
  meazza = {
    l: 105,
    w: 68, 
    gA: { // goal area
      w: 18.32,
      l: 5.5,
    },
    pA: { // penalty area
      w: 40.32,
      l: 16.5,
    },
    g: { //goal
      w: 7.32,
      l: 2.44,
    },
    cr: 9.15,
    p : 11, //penalty
    cnr : 1, //corner
  },
  m = 6;

drawPlayGround(meazza, m);

