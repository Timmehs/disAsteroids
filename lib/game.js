(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};



  var Game = Asteroids.Game = function () {
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
  Game.NUM_ASTEROIDS = 8;

  Game.prototype.allObjects = function() {
    var objArray = this.asteroids.slice(0);
		objArray = objArray.concat(this.bullets.slice(0));
    this.ship && objArray.push(this.ship);
    return objArray;
  };

  Game.prototype.addAsteroids = function () {
    var game = this;
		
		for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
			var asteroid = new Asteroids.Asteroid({origin: this.randomOrigin()});
			console.log(asteroid.origin);
      this.add(asteroid);
    }
  };

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
						if (movObj instanceof Asteroids.Ship || otherMovObj instanceof Asteroids.Ship) {
							console.log("Ship collision");
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
	    this.asteroids.splice(ind, 1);
		} else if (movingObject instanceof Asteroids.Bullet) {
	    var ind = this.bullets.indexOf(movingObject);
	    this.bullets.splice(ind, 1);
		}
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.randomOrigin = function() {
    var game = this;
    var xPos = Math.floor(game.dimX * Math.random());
    var yPos = Math.floor(game.dimY * Math.random());
    origin = {x: xPos, y: yPos, z: 0}
		return origin;
  };



})(this);
