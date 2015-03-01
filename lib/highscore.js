(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var LeaderBoard = Asteroids.LeaderBoard = function () {
    this.shown = false;
    this.highScores = [];
    this.apiUrl = "http://highscoresapi.herokuapp.com/games/1/scores";
    this.$dg = $('#highscore-cover');
    this.registerListeners();
    this.getHighScores();
  };


  LeaderBoard.prototype.isNewHighScore = function (score) {
    var highScores = this.highScores;
    return highScores.length < 10 || score > highScores[highScores.length - 1].score;
  };

  LeaderBoard.prototype.getHighScores = function () {
    var leaderBoard = this;
    $.getJSON(this.apiUrl + "?api_key=Nsec8uOFAwKu8Ak5lQDffw", function (data) {
      this.parseScores(data);
    }.bind(this));
  };

  LeaderBoard.prototype.parseScores = function (scores) {
    var highScores = this.highScores;
    _.each(scores, function (score, i) {
      var newScore = {};
      newScore.playerName = score.player_name;
      newScore.score = score.score;
      newScore.level = score.level;
      highScores[i] = newScore;
    });
  };

  LeaderBoard.prototype.showDialogue = function () {
    this.shown = true;
    $('#playerName').focus();
    this.$dg.show();
  };

  LeaderBoard.prototype.hideDialogue = function () {
    $('#playerName').val("");
    this.$dg.hide();
    this.shown = false;
  };

  LeaderBoard.prototype.handleSubmit = function (e) {

    if (e.type == "keydown" && e.keyCode != '13' || this.shown == false) {
      return;
    }

    e.preventDefault();
    this.post();
  };

  LeaderBoard.prototype.registerListeners = function () {
    var highScore = this;
    $('button#hs-submit').click(this.handleSubmit.bind(highScore));
    $('form').keydown(this.handleSubmit.bind(highScore));
    $('form').submit(this.handleSubmit.bind(highScore));
    $('button#hs-cancel').click(function (e) {
      e.preventDefault();
      $('#playerName').val('');
      highScore.hideDialogue();
    });
  };

  LeaderBoard.prototype.newHighScore = function (score) {
    this.newScore = score;
    this.showDialogue();
  }

  LeaderBoard.prototype.post = _.throttle(function () {
    var leaderBoard = this;
    if (this.newScore.posted) return;

    this.newScore.player_name = $('#playerName').val();
    this.newScore.api_key = 'Nsec8uOFAwKu8Ak5lQDffw';
    if (this.newScore.player_name == "") { this.newScore.player_name = "John Doe"; }

    $.ajax({
      url: this.apiUrl,
      type: "POST",
      crossDomain: true,
      data: this.newScore,
      dataType: "json"
    }).done(function (data) {
      leaderBoard.getHighScores();
    });

    this.newScore.posted = true;
    this.hideDialogue();
  }, 1000, { trailing: false });






})(this);
