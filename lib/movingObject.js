(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  var MovingObject = Asteroids.MovingObject = function () {
    SimpleMesh.call(this, { context: CTX });
    var params = arguments[0][0];
    this.vel = params['vel'];
    this.origin = params['origin'];
    this.radius = params['radius'];
    this.collisionRadius = this.radius;
    this.animationProperties = { x: 0, y: 0, z: 0 };
    this.color = params['color'];
  };

  MovingObject.inherits(SimpleMesh);

  MovingObject.prototype.resetPos = function() {
    var object = this;
		_.each([['y', HEIGHT], ['x', WIDTH]], function(dim) {
      if (object.origin[dim[0]] < (dim[1] / -2) - object.collisionRadius) {
        object.origin[dim[0]] += dim[1] + object.collisionRadius + 10;
      } else if (object.origin[dim[0]] > (dim[1] / 2) + object.collisionRadius) {
        object.origin[dim[0]] -= dim[1] + (object.collisionRadius + 10) ;
      }
    });
  };

  MovingObject.prototype.distance = function(origin1, origin2) {
    var x1 = origin1.x, x2 = origin2.x, y1 = origin1.y, y2 = origin2.y;
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var collisionDistance = otherObject.collisionRadius + this.collisionRadius + 10;
    var dist = this.distance(this.origin, otherObject.origin);
    if(dist <= collisionDistance) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function(otherObj) {
    console.log("ooOOo collided!");
  };


  MovingObject.prototype.move  = function() {
		if (this.origin.x == undefined) {
			debugger
		}
    this.origin.x += this.vel[0];
    this.origin.y += this.vel[1];
    this.theta.x += this.animationProperties.x;
    this.theta.y += this.animationProperties.y;
    this.theta.z += this.animationProperties.z;
    this.resetPos();
  };



})(this);
