(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.angular_vel = 0;
    this.last_vel = [0, 1];
    this.MAX_SPEED = 6;
    this.speed = 0;
    constructModel(this);
    this.edgeStyle = {
      strokeStyle : "green",
      lineWidth : 1,
      lineCap : 'round'
    };
  };
  Ship.inherits(Asteroids.MovingObject);

  Ship.COLOR = "red";
  Ship.RADIUS = 10;

	Ship.prototype.fire = function(game){
		var bulletSpeed = this.getBulletVel();
		var b = new Asteroids.Bullet({
      pos: [this.origin.x, this.origin.y].slice(0) ,
      radius: 3,
      vel: bulletSpeed,
      color: "magenta"
    })
		game.add(b);
	};

  Ship.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.theta.y += 3;
    this.theta.z = this.angular_vel;
  };

  Ship.prototype.angleToSlope = function() {
    // Convert degree to radians
    var degrees = this.angular_vel;
    console.log(degrees);
    var radians = degrees * ( Math.PI / 180 );
    var abs_slope = [ -Math.sin(radians).toFixed(4), Math.cos(radians).toFixed(4) ];
    if (degrees < 90) {
      console.log('fufwefe');
    }
    return abs_slope;
  };

  var constructModel = function(ship) {
    var a = Ship.RADIUS;
    var b = 3 * a;
    ship.loadArrays({
      vertices : [
        [  a, -b, -a ], // Pyramid base
        [ -a, -b, -a ],
        [ -a, -b,  a ],
          [  a, -b,  a ],
        [  0,  b,  0 ] // The top
      ],
      edges : [
        [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 0 ],
        [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ],
      ]
    });
  };

  Ship.prototype.power = function(impulse) {
    if ((this.speed == -this.MAX_SPEED && impulse < 0)
      || ( this.speed == this.MAX_SPEED && impulse > 0)) {
      return;
    }
    this.speed += impulse;

    var direction = this.angleToSlope();
    this.vel[0] = direction[0] * this.speed;
    this.vel[1] = direction[1] * this.speed;
    console.log(this.vel);
  };

  Ship.prototype.getBulletVel = function() {
    var velocity = this.angleToSlope();
    velocity[0] *= 8;
    velocity[1] *= 8;
    console.log(velocity);
    return velocity;
  };


})(this);
