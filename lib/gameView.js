(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var GameView = Asteroids.GameView = function() {
    this.game = new Asteroids.Game();
    this.ctx = CTX;
  };

  GameView.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    this.timerId = rootObject.setInterval(function() {
      that.game.step();
      that.game.draw(that.ctx);
    }, 50);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var game = this.game;

		key("space", function() {
			game.ship.fire(game);
		})

		key("up, w", function() {
      game.ship.power(1);
    });

		key("down, s", function() {
      game.ship.power(-1);
    });

		key("right, d", function() {
      game.ship.angular_vel -= 10;
    });

		key("left, a", function() {
      game.ship.angular_vel += 10;
    });
  };

  GameView.prototype.clearBindings = function() {
    key.unbind("space");
    key.unbind("up, w");
    key.unbind("down, s");
    key.unbind("right, d");
    key.unbind("left, a");
  }

  GameView.prototype.gameOver = function() {
    clearInterval(this.timerId);
    $('.gameover').fadeIn(2000, function() {
      $('.gameover').fadeOut(1000);
    });
    this.clearBindings();
    this.game = new Asteroids.Game();
    this.start();
  }

})(this);
