(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Score = Asteroids.Score = function () {
    this.score = 0;
    this.bullets_fired = 0;
    this.level = 0;
    this.player_name = "";
    this.posted = false;
  };

  Score.prototype.accuracy = function () {

    if (this.score == 0 || this.bullets_fired == 0) {
      return 0;
    } else {
      return ((this.score / 12) / this.bullets_fired * 100).toFixed(1);
    }
  };


})(this);
