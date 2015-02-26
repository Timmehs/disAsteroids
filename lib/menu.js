(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Menu = Asteroids.Menu = function () {
    this.header = 'disAsteroids';
    this.opts = ['Start Game', 'Sound off'];
    this.currentSelection = 0;
    $(".sound-button").click(this.toggleSoundButton.bind(this));
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
    var topDisplacement = top + 200;
    CTX.font = "28px courier";
    CTX.fillText("HIGH SCORES", 0, topDisplacement);
    CTX.textAlign = "left";
    CTX.font = "20px courier";
    var scores = gView.leaderBoard.highScores;
    _.each(scores, function (score, i) {
      topDisplacement += 24;
      var text = (i+1) + ". " + score.playerName + " - " + score.score + ", Level: " + score.level;
      CTX.fillText(text, -190, topDisplacement);
    });
  }

  Menu.prototype.up = _.throttle(function() {
    this.currentSelection = this.currentSelection == 1 ? 0 : 1;
  }, 175, { trailing: false });

  Menu.prototype.toggleSoundMenu = _.throttle(function () {
    if (this.currentSelection == 1) {
      gView.options.soundOn = !gView.options.soundOn;
      this.opts[1] = gView.options.soundOn ? "Sound on" : "Sound off";
      this.toggleSoundIcon();
    }
  }, 175, { trailing: false });

  Menu.prototype.selectOption = _.throttle(function () {
    if (this.currentSelection == 0) {
      if (Date.now() - gView.startTime < 1500) return;
      gView.resetGame();
    } else {
      this.toggleSoundMenu();
    }
  }, 200, { trailing: false });

  Menu.prototype.down = _.throttle(function () {
    this.currentSelection = this.currentSelection == 1 ? 0 : 1;
  }, 175, { trailing: false });

  /** Sound Button **/

  Menu.prototype.toggleSoundButton = _.throttle(function () {
    gView.options.soundOn = !gView.options.soundOn;
    this.opts[1] = gView.options.soundOn ? "Sound on" : "Sound off";
    this.toggleSoundIcon();
    console.log("yay", gView.options.soundOn);
  }, 200, { trailing: false });

  Menu.prototype.toggleSoundIcon = function () {
    var $soundBtn = $('.sound-button');
    if (gView.options.soundOn) {
      $soundBtn.removeClass("glyphicion-volume-off");
      $soundBtn.addClass("glyphicon-volume-up");
    } else {
      $soundBtn.removeClass("glyphicon-volume-up");
      $soundBtn.addClass("glyphicion-volume-off");
    }
  };

})(this);
