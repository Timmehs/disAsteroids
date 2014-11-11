(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
 
  
  var Game = Asteroids.Game = function () {
    this.asteroids = [];
		this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: Game.randomPos()});
  };
  
  Game.DIM_X = rootObject.innerWidth;
  Game.DIM_Y = rootObject.innerHeight;
  Game.NUM_ASTEROIDS = 40;
  
  Game.prototype.allObjects = function() {
    var objArray = this.asteroids.slice(0);
		objArray = objArray.concat(this.bullets.slice(0));
    objArray.push(this.ship);
    return objArray;
  };

  
  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({pos: Game.randomPos()}));
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
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var movObjs = this.allObjects();
    for (var i = 0; i < movObjs.length; i++) {
      movObjs[i].draw(ctx);
    }
  };
	
	Game.prototype.cleanUpBullets = function() {
		var game = this;
		this.bullets.forEach(function(bullet) {
			if (bullet.pos[0] < 0 || bullet.pos[0] > Game.DIM_X || bullet.pos[1] < 0 || bullet.pos[1] > Game.DIM_Y) {
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
							console.log("ship collision");
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
  
  Game.randomPos = function() {
    var x = Math.floor(Game.DIM_X * Math.random());
    var y = Math.floor(Game.DIM_Y * Math.random());
    return [x, y];
  };
	
	Game.paintStars = function(ctx) {
		for(var i = 0; i < 800; i++) {
			var id = ctx.createImageData(1,1);
			var d  = id.data;
			var pos = Game.randomPos();                       
			d[0]   = 255;
			d[1]   = 255;
			d[2]   = 255;
			d[3]   = 255;
			console.log("new star");
			ctx.putImageData( id, pos[0], pos[1] );
		}
	};
  
})(this);