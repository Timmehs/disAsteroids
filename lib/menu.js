(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Menu = Asteroids.Menu = function () {
    this.header = 'disAsteroids';
    this.opts = ['Start Game', 'Sound off'];
    this.soundOn = false;
    this.currentSelection = 0;
    this.highScores = [];
    this.getHighScores();
  };

  Menu.prototype.getHighScores = function () {
    var url = "http://localhost:3000/games/1/scores";
    var menu = this;
    $.getJSON(url + "?callback=?", function (data) {
      menu.parseScores(data);
    });
  };


  Menu.prototype.parseScores = function (scores) {
    var highScores = this.highScores;
    _.each(scores, function (score, i) {
      var newScore = {};
      newScore.playerName = score.player_name;
      newScore.score = score.score;
      newScore.level = score.level;
      highScores[i] = newScore;
    });
  };

  Menu.prototype.draw = function () {
    var menuContent = this.renderMenu();
  };

  Menu.prototype.renderMenu = function () {
    var menu = this;
    var topDisplacement = HEIGHT/-2 + 200;
    CTX.fillStyle = "white";
    CTX.textAlign = 'center';
    this.renderHeader(topDisplacement);
    this.renderMenuItems(topDisplacement);
    this.renderHighScores(topDisplacement);
  };

  Menu.prototype.renderHeader = function (top) {
    var left = 0;
    CTX.font = '60px Courier';
    CTX.fillText(this.header, left, top);
  };

  Menu.prototype.renderMenuItems = function (top) {
    CTX.font = '35px Courier';
    var topDisplacement = top + 55;
    var menu = this;
    _.each( this.opts, function (str, i) {
      topDisplacement += 35;
      var item;
      if (menu.currentSelection == i) {
        item = "> " + str;
      } else {
        item = "  " + str;
      }
      CTX.fillText(item, 0, topDisplacement);
    });
  };

  Menu.prototype.renderHighScores = function (top) {
    var topDisplacement = top + 300;
    CTX.font = "40px courier";
    CTX.fillText("HIGH SCORES", 0, topDisplacement);
    CTX.textAlign = "left";
    CTX.font = "20px courier";
    _.each(this.highScores, function (score, i) {
      topDisplacement += 45;
      var text = (i+1) + ". " + score.playerName + " - " + score.score + ", Level: " + score.level;
      CTX.fillText(text, -190, topDisplacement);
    });
  }

  Menu.prototype.up = _.throttle(function() {
    this.currentSelection = this.currentSelection == 1 ? 0 : 1;
  }, 175, { trailing: false });

  Menu.prototype.toggleSound = _.throttle(function () {
    if (this.currentSelection == 1) {
      this.soundOn = !this.soundOn;
      this.opts[1] = this.soundOn ? "Sound on" : "Sound off";
    }
  }, 175, { trailing: false });

  Menu.prototype.selectOption = _.throttle(function () {
    if (this.currentSelection == 0) {
      if (Date.now() - gView.startTime < 1500) return;
      gView.resetGame();
    } else {
      this.toggleSound();
    }
  }, 200, { trailing: false });

  Menu.prototype.down = _.throttle(function () {
    this.currentSelection = this.currentSelection == 1 ? 0 : 1;
  }, 175, { trailing: false });




})(this);
