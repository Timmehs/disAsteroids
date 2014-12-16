(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};



  var Game = Asteroids.Game = function () {
    this.asteroids = [];
		this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: this.randomPos()});
    this.canvas = document.getElementById('game-canvas');
		this.dimX = this.canvas.innerWidth;
		this.dimY = this.canvas.innerHeight;
  };

  // Game.DIM_X = rootObject.innerWidth;
  // Game.DIM_Y = rootObject.innerHeight;
  Game.NUM_ASTEROIDS = 20;

  Game.prototype.allObjects = function() {
    var objArray = this.asteroids.slice(0);
		objArray = objArray.concat(this.bullets.slice(0));
    objArray.push(this.ship);
    return objArray;
  };


  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({pos: this.randomPos()}));
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
    ctx.clearRect(0, 0, this.dimX, this.dimY);
		this.updateDimens();
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.dimX, this.dimY);
    var movObjs = this.allObjects();
    for (var i = 0; i < movObjs.length; i++) {
      movObjs[i].draw(ctx);
    }
  };

	Game.prototype.updateDimens = function() {
		this.dimX = rootObject.innerWidth;
		this.dimY = rootObject.innerHeight;
	};

	Game.prototype.cleanUpBullets = function() {
		var game = this;
		this.bullets.forEach(function(bullet) {
			if (bullet.pos[0] < 0 || bullet.pos[0] > this.dimX || bullet.pos[1] < 0 || bullet.pos[1] > this.dimY) {
				game.remove(bullet);
			}
		});
	};

  Game.prototype.moveObjects = function() {
    var movObjs = this.allObjects();
    this.allObjects().forEach(function(movObj) {
      movObj.move();
    });
		this.cleanUpBullets();
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    this.allObjects().forEach((function(movObj) {
      that.allObjects().forEach(function(otherMovObj) {
        if (movObj !== otherMovObj) {
					if (movObj.isCollidedWith(otherMovObj)) {
						if (movObj instanceof Asteroids.Ship || otherMovObj instanceof Asteroids.Ship) {
							// GAME OVER
						} else {
							movObj.collideWith(that, otherMovObj);
							console.log(that.asteroids.length - 1);
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

  Game.prototype.randomPos = function() {
    var x = Math.floor(rootObject.innerWidth * Math.random());
    var y = Math.floor(rootObject.innerHeight * Math.random());
    return [x, y];
  };



})(this);
