(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};



  var Game = Asteroids.Game = function (opts) {
    this.num_asteroids = 4;
    this.level = 1;
    this.asteroids = [];
		this.bullets = [];
    this.canvas = document.getElementById('game-canvas');
		this.dimX = WIDTH;
		this.dimY = HEIGHT;
    this.menu = new Asteroids.Menu();
    this.bulletsFired = 0;
    this.score = new Asteroids.Score();
    this.score.level = this.level;
    this.inPlay = false;
    this.gameOver = false;
    if (opts && opts.inPlay) {
      this.inPlay = true;
      this.ship = new Asteroids.Ship({ origin: {x: 0, y: 0, z: 0}});
      window.ship = this.ship;
    }
    this.addAsteroids();

  };


  Game.prototype.allObjects = function () {
    var objArray = this.asteroids.slice(0);
		objArray = objArray.concat(this.bullets.slice(0));
    this.ship && objArray.push(this.ship);
    return objArray;
  };

  Game.prototype.addAsteroids = function () {

		for (var i = 0; i < this.num_asteroids; i++) {
			var newAsteroid = this.generateAsteroid();
    	this.add(newAsteroid);
    }
  };

	Game.prototype.generateAsteroid = function () {
    var game = this;
    var rad = game.inPlay ? 20 : WIDTH/16;
		var asteroid = new Asteroids.Asteroid({
      origin: this.randomOrigin(),
      radius: rad,
    });
		var game = this;
		var clear = false;

		while (!clear) {
			clear = true;
			_.each(this.asteroids, function(a) {
				if (asteroid.isCollidedWith(a)) {
					clear = false;
					asteroid.origin = game.randomOrigin();
				}
			});
		}

		return asteroid;
	}

	Game.prototype.add = function(obj) {
		if (obj instanceof Asteroids.Asteroid) {
			this.asteroids.push(obj);
		} else if (obj instanceof Asteroids.Bullet) {
			this.bullets.push(obj);
		} else {
			console.log("ERROR: invalid object");
			console.log(obj);
		}
	};



  Game.prototype.draw = function(ctx) {
    ctx.clearRect(WIDTH / -2, HEIGHT / -2, WIDTH, HEIGHT);
		this.updateDimens();
		ctx.fillStyle = "black";
		ctx.fillRect(WIDTH / -2, HEIGHT / -2, WIDTH, HEIGHT);
    var movObjs = this.allObjects();
    for (var i = 0; i < movObjs.length; i++) {
      movObjs[i].draw(ctx);
    }
    if (!this.inPlay && !this.gameOver) {
      this.menu.draw();
    } else if (!this.gameOver) {
      this.displayHUD();
    } else {
      this.deathScreen();
    }
  };



	Game.prototype.updateDimens = function () {
		this.dimX = rootObject.innerWidth;
		this.dimY = rootObject.innerHeight;
	};

  Game.prototype.moveObjects = function () {
    var movObjs = this.allObjects();
    this.allObjects().forEach(function(movObj) {
      movObj.move();
    });

  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    this.allObjects().forEach((function(movObj) {
      game.allObjects().forEach(function(otherMovObj) {
        if (movObj !== otherMovObj) {
					if (movObj.isCollidedWith(otherMovObj)) {
						if ((movObj instanceof Asteroids.Asteroid && otherMovObj instanceof Asteroids.Ship) ||
                (movObj instanceof Asteroids.Ship && otherMovObj instanceof Asteroids.Asteroid) )  {
							game.gameOver = true;
              game.ship.edgeStyle.strokeStyle = "magenta";
              game.inPlay = false;
              if (leaderBoard.isNewHighScore(game.score.score)) {
                leaderBoard.newHighScore(game.score);
              }
						} else {
							movObj.collideWith(game, otherMovObj);
						}
					}
        }
      });
    }).bind(game));
  };

  Game.prototype.deathScreen = function () {
    CTX.fillStyle = "#f55656";
    CTX.font = "60px Courier";
    var text = "Game Over";
    if (this.score == 0) accuracy = 0;
    var data = [
      "Score: " + this.score.score,
      "Level: " + this.score.level,
      "Bullets Fired: " + this.score.bullets_fired,
      "Accuracy: " + this.score.accuracy() + "%",
      "Hit <Enter> to return to Main Menu"
    ];

    var top = -200;
    var left = CTX.measureText(text).width/-2;
    CTX.fillText(text, left, top);

    CTX.font = "20px Courier";
    CTX.fillStyle = "white";
    _.each(data, function (str) {
      top = top + 30;
      var left = CTX.measureText(str).width/-2;
      CTX.fillText(str, left, top);
    });

  };

  Game.prototype.remove = function(movingObject) {
		if (movingObject instanceof Asteroids.Asteroid) {
	    var ind = this.asteroids.indexOf(movingObject);
      switch (movingObject.radius) {
        case 20:
          this.asteroids.splice(ind, 1);
          this.asteroids = this.asteroids.concat(movingObject.explode());
          break;
        case 10:
          this.asteroids.splice(ind, 1);
          break;
      }
		} else if (movingObject instanceof Asteroids.Bullet) {
	    var ind = this.bullets.indexOf(movingObject) ;
	    this.bullets.splice(ind, 1);
		}
  };

  Game.prototype.step = function () {
    this.moveObjects();
    if (this.inPlay) this.checkCollisions();
    if (this.asteroids.length == 0) {
      if (this.level > 3) {
        this.num_asteroids += 10;
      } else {
        this.num_asteroids += 5;
      }
      this.level++;
      this.score.level++;
      this.addAsteroids();
    }
  };

  Game.prototype.randomOrigin = function () {
    var game = this;
    var xPos = 0;
    var yPos = 0;
    while (Math.abs(xPos) < 75) {
      xPos = (Math.random() * WIDTH) - (WIDTH/2);
    }
    while (Math.abs(yPos) < 75) {
      yPos = (Math.random() * HEIGHT) - (HEIGHT/2);
    }
    origin = {x: xPos, y: yPos, z: 0}
		return origin;
  };

  Game.prototype.displayHUD = function () {
    CTX.fillStyle = "white";
    CTX.font = "25px Courier";
    var left = WIDTH/-2 + 10;
    var top = HEIGHT/-2 + 20;
    var HUD = "Score: " + this.score.score;
    CTX.fillText(HUD, left, top);
    var HUD = "Level " + this.level;
    top = HEIGHT/2 - 10;;
    left = 0;
    CTX.fillText(HUD, left, top);
  };



})(this);
