var drawPlayGround = function (p, m, players) {
  var playGrounds = document.getElementsByClassName("playground");
  for(i in playGrounds) {
    if (typeof(playGrounds[i]) == "object") {
      var 
        begin,
        end,
        playGround = playGrounds[i],
        ctx= playGround.getContext("2d"),
        init = function() {
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
        },
        addPlayer = function() {
          ctx.scale(1/m, 1/m);
          ctx.font="17px Verdana";
          ctx.textAlign = 'center';
          
          ctx.fillText(players.gk,p.w / 2 * m,p.l * m );

          ctx.fillText(players.lb, p.cr * m, p.l * m *3 / 4);
          ctx.fillText(players.rb, (p.w - p.cr) * m, p.l * m * 3 / 4);
          
          ctx.fillText(players.lcb, (p.w / 4) * m, p.l * m * 6 / 7);
          ctx.fillText(players.rcb, (p.w / 4 * 3) * m, p.l * m * 6 / 7);
          ctx.fillText(players.ccb, (p.w / 2) * m, p.l * m *6 / 7);

          ctx.fillText(players.ldm, (p.w / 4) * m, p.l * m * 2 / 3);
          ctx.fillText(players.rdm, (p.w / 4 * 3) * m, p.l * m * 2 / 3);
          ctx.fillText(players.cdm, (p.w / 2) * m, p.l * m * 2 / 3);

          ctx.fillText(players.lm, p.cr * m, p.l * m * 1 / 2);
          ctx.fillText(players.rm, (p.w - p.cr) * m, p.l * m * 1 / 2);
          ctx.fillText(players.cm, (p.w / 2) * m, p.l * m * 1 / 2);

          ctx.fillText(players.lam, (p.w / 4) * m, p.l * m * 1 / 3);
          ctx.fillText(players.ram, (p.w / 4 * 3) * m, p.l * m * 1 / 3);
          ctx.fillText(players.cam, (p.w / 2) * m, p.l * m * 1 / 3);

          ctx.fillText(players.lwf, p.cr * m, p.l * m * 1 / 4);
          ctx.fillText(players.rwf, (p.w - p.cr) * m, p.l * m * 1 / 4);
          ctx.fillText(players.cf, (p.w / 2) * m, p.l * m * 1 / 7);
          ctx.fillText(players.lf, (p.w / 4) * m, p.l * m * 1 / 7);
          ctx.fillText(players.rf, (p.w / 4 * 3) * m, p.l * m * 1 / 7);
         
        };
      init();
      addPlayer();
    }
  }
};

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
  m = 6,
  playersEample = {
    gk:  'gk',
    lb:  'lb',
    lcb: 'lcb',
    rcb: 'rcb',
    ccb: 'ccb',
    rb:  'rb',
    cm:  'mc',
    ldm: 'dmc',
    rdm: 'rdm',
    cdm: 'cdm',
    lm:  'lm',
    rm:  'rm',
    cm:  'cm',
    lam: 'lam',
    cam: 'cam',
    ram: 'ram',
    lf:  'lf',
    rf:  'rf',
    rwf: 'rwf',
    lwf: 'lwf',
    cf:  'cf',
  }
  players = {
    gk:  '',
    lb:  '',
    lcb: '',
    rcb: '',
    ccb: '',
    rb:  '',
    cm:  '',
    ldm: '',
    rdm: '',
    cdm: '',
    lm:  '',
    rm:  '',
    cm:  '',
    lam: '',
    cam: '',
    ram: '',
    lf:  '',
    rf:  '',
    rwf: '',
    lwf: '',
    cf:  '',
  },
  myPlayers = players;
  myPlayers.gk  = '唐骞'
  myPlayers.lcb = '蒂亚戈席尔瓦'
  myPlayers.rcb = '拉莫斯'
  myPlayers.lb  = '科恩特朗'
  myPlayers.rb  = '拉姆'
  myPlayers.rdm = '亚亚图雷'
  myPlayers.ldm = '坎比亚索'
  myPlayers.cam = '斯内德'
  myPlayers.lwf = '梅西'
  myPlayers.rwf = 'C罗'
  myPlayers.cf  = '伊布'
 
drawPlayGround(meazza, m, myPlayers);

