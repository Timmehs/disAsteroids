(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};



  var Game = Asteroids.Game = function () {
    this.num_asteroids = 4;
    this.level = 1;
    $('#levelTag').html(this.level);
    this.asteroids = [];
		this.bullets = [];
    this.canvas = document.getElementById('game-canvas');
		this.dimX = WIDTH;
		this.dimY = HEIGHT;
    this.addAsteroids();
    this.ship = new Asteroids.Ship({ origin: {x: 0, y: 0, z: 0}});
    window.ship = this.ship;
  };

  // Game.DIM_X = rootObject.innerWidth;
  // Game.DIM_Y = rootObject.innerHeight;

  Game.prototype.allObjects = function() {
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

	Game.prototype.generateAsteroid = function() {
		var asteroid = new Asteroids.Asteroid({
      origin: this.randomOrigin(),
      radius: 20
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
  };

	Game.prototype.updateDimens = function() {
		this.dimX = rootObject.innerWidth;
		this.dimY = rootObject.innerHeight;
	};

  Game.prototype.moveObjects = function() {
    var movObjs = this.allObjects();
    this.allObjects().forEach(function(movObj) {
      movObj.move();
    });

  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.allObjects().forEach((function(movObj) {
      that.allObjects().forEach(function(otherMovObj) {
        if (movObj !== otherMovObj) {
					if (movObj.isCollidedWith(otherMovObj)) {
						if ((movObj instanceof Asteroids.Asteroid && otherMovObj instanceof Asteroids.Ship) ||
                (movObj instanceof Asteroids.Ship && otherMovObj instanceof Asteroids.Asteroid) )  {
							gView.gameOver();
						} else {
							movObj.collideWith(that, otherMovObj);
						}
					}
        }
      });
    }).bind(that));
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
	    var ind = this.bullets.indexOf(movingObject);
	    this.bullets.splice(ind, 1);
		}
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
    if (this.asteroids.length == 0) {
      if (this.level > 3) {
        this.num_asteroids += 10;
      } else {
        this.num_asteroids += 5;
      }
      this.level++;
      $(levelTag).fadeOut().html(this.level).fadeIn();
      this.addAsteroids();
    }
  };

  Game.prototype.randomOrigin = function() {
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



})(this);
