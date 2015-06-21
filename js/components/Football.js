module.exports = {
  tmpl: `
    <div class="container">
      <div id="football">
        <div class="team">
        </div>
      </div>
    </div>
  `,

  onLoad: () => {
    NProgress.start();
    let parent = document.getElementsByClassName("team")[0];
    if (parent) {
      $.get('/json/football.json', function(data) {
        for (let team of data.teams) {
          PBDm.drawPlayGround(parent, data.meazza, data.m, team);
        }
        NProgress.done();
      });
    }
  }
}

