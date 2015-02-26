(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var GameView = Asteroids.GameView = function () {
    this.game = new Asteroids.Game();
    this.ctx = CTX;
    this.leaderBoard = window.leaderBoard = new Asteroids.LeaderBoard();
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.startTime = Date.now();
    this.scorePosted = false;
    this.preventArrowKeyScroll();
    this.timerId = rootObject.setInterval(function () {
      gameView.game.inPlay ? gameView.handleGameInput() : gameView.handleMenuInput();
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 50);
  };

  GameView.prototype.preventArrowKeyScroll = function () {
    window.addEventListener("keydown", function(e) {
    // space and arrow keys
      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
    }, false);
  }

  GameView.prototype.handleMenuInput = function () {
    var game = this.game;

    if (this.loaderBoard.shown) {
      // Escape function if dialog is present
      return;

    } else {

      if ( key.isPressed("space") || key.isPressed("enter") ) {
        game.menu.selectOption();
      };

      if ( key.isPressed("up") || key.isPressed("w") ) {
        game.menu.up();
      };

      if ( key.isPressed("down") || key.isPressed("s") ) {
        game.menu.down();
      };

      if ( key.isPressed("right") || key.isPressed("d") ) {
        game.menu.toggleSound();
      };

      if ( key.isPressed("left") || key.isPressed("a") ) {
        game.menu.toggleSound();
      };
    }
  };

  GameView.prototype.handleGameInput = function () {
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

  GameView.prototype.gameOver = function () {
    clearInterval(this.timerId);
    this.game = new Asteroids.Game();
    this.start();
  };

  GameView.prototype.resetGame = function () {
    clearInterval(this.timerId);
    this.game = new Asteroids.Game({ inPlay: true });
    this.start();
  }

})(this);
