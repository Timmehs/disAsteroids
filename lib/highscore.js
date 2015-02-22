(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var HighScore = Asteroids.HighScore = function (opts) {
    this.scorePosted = false;
    this.score = opts.score;
    this.playerName = "";
    this.bulletsFired = opts.bulletsFired;
    this.level = opts.level;
    this.$dg = $('#highscore-cover');
    this.registerListeners();
  };

  HighScore.prototype.show = function () {
    this.$dg.show();
  };

  HighScore.prototype.hide = function () {
    $('#playerName').val("");
    this.$dg.hide();
  };

  HighScore.prototype.handleSubmit = function (e) {
    if (e.type == "keydown" && e.keyCode != '13') {
      return;
    }
    e.preventDefault();
    console.log('submit');
    var name = $('#playerName').val();
    name = name == "" ? "Wayne Newton" : name;
    this.playerName = name;
    this.post();
  };

  HighScore.prototype.registerListeners = function () {
    var highScore = this;
    $('button#hs-submit').click(this.handleSubmit.bind(highScore));
    $('form').keydown(this.handleSubmit.bind(highScore));
    $('form').submit(this.handleSubmit.bind(highScore));
    $('button#hs-cancel').click(function (e) {
      e.preventDefault();
      $('#playerName').val();
      highScore.hide();
    });
  };

  HighScore.prototype.post = function () {
    if (this.scorePosted) return;
    var score = {
      score: this.score,
      player_name: this.playerName,
      level: this.level,
      bullets_fired: this.bulletsFired
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/games/1/scores",
      data: score,
      dataType: "json"
    });

    this.scorePosted = true;
    this.hide();
  };






})(this);
