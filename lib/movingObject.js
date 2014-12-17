(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  var MovingObject = Asteroids.MovingObject = function () {
    SimpleMesh.call(this, { context: CTX });
    var params = arguments[0][0];
    this.origin.x= params['pos'][0];
    this.origin.y = params['pos'][1];
    this.vel = params['vel'];
    this.radius = params['radius'];
    this.color = params['color'];
  };

  MovingObject.inherits(SimpleMesh);

  MovingObject.prototype.resetPos = function() {
    if (this.origin.x < WIDTH / -2) {
      this.origin.x += WIDTH;
    } else if (this.origin.x > WIDTH / 2) {
      this.origin.x -= WIDTH;
    }

    if (this.origin.y < HEIGHT / -2) {
      this.origin.y += HEIGHT;
    } else if (this.origin.y > HEIGHT / 2) {
      this.origin.y -= HEIGHT;
    }


    // if (this.origin.x > WIDTH / 2) {
    //   this.origin.x = (-WIDTH / 2);
    // } else if (this.origin.x < WIDTH / -2 ) {
    //   this.pos[0] = WIDTH / 2;
    // }
    // if (this.pos[1] > HEIGHT / 2) {
    //   this.pos[1] = HEIGHT / -2;
    // } else if (this.pos[1] < HEIGHT / - 2) {
    //   this.pos[1] = HEIGHT / 2;
    // }
  };


  function distance(origin1, origin2) {
    var x1 = origin1.x, x2 = origin2.x, y1 = origin1.y, y2 = origin2.y;
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var sumOfRadii = otherObject.radius + this.radius;
    var dist = distance(this.origin, otherObject.origin);
    if(dist < sumOfRadii) {
      return true;
    } else {
      return false;
    }
  };

	MovingObject.prototype.collideWith = function(game, otherObject) {
		// if (otherObject instanceof Asteroids.Bullet) {
// 			game.remove(otherObject);
// 			game.remove(this);
// 		}
	}

  MovingObject.prototype.move  = function() {
    this.origin.x += this.vel[0];
    this.origin.y += this.vel[1];
    this.resetPos();
    this.theta.x += 0.5;
    this.theta.z += 0.5;
  };



})(this);
