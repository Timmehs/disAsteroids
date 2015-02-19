(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var GameView = Asteroids.GameView = function() {
    this.game = new Asteroids.Game();
    this.ctx = CTX;
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.timerId = rootObject.setInterval(function() {
      gameView.handlePlayerInput();
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 50);
  };

  GameView.prototype.handlePlayerInput = function() {
    var game = this.game;

		if ( key.isPressed("space") ) {
      game.ship.fire();
		};

		if ( key.isPressed("up") || key.isPressed("w") ) {
      game.ship.power(1);
    };

    if ( key.isPressed("down") || key.isPressed("s") ) {
      game.ship.power(-1);
    };

    if ( key.isPressed("right") || key.isPressed("d") ) {
      game.ship.angular_vel -= 10;
    };

    if ( key.isPressed("left") || key.isPressed("a") ) {
      game.ship.angular_vel += 10;
    };
  };

  GameView.prototype.gameOver = function() {
    clearInterval(this.timerId);
    $('.gameover').fadeIn(2000, function() {
      $('.gameover').fadeOut(1000);
    });
    this.game = new Asteroids.Game();
    this.start();
  }

})(this);
