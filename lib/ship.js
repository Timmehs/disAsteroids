(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.collisionRadius = this.radius;
    this.vel = [0, 0];
    this.angular_vel = 0;
    this.last_vel = [0, 1];
    this.MAX_SPEED = 10;
    this.speed = 0;
    constructModel(this);
    this.edgeStyle = {
      strokeStyle : "#7FFF00",
      lineWidth : 1,
      lineCap : 'round'
    };
    this.animationProperties.y = 3;
  };
  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;

	Ship.prototype.fire = _.throttle(function () {
		var bulletSpeed = this.getBulletVel();
    if (gView.options.soundOn) {
      var pew = new Audio("media/pew.mp3");
      pew.play();
    }

		var b = new Asteroids.Bullet({
      origin: {x: this.origin.x, y: this.origin.y},
      radius: 2,
      vel: bulletSpeed,
      color: "magenta"
    });

		gView.game.add(b);
    gView.game.score.bullets_fired++;
	}, 150, { trailing: false });

  Ship.prototype.fireMissiles = function() {
    var ship = this;
    return _.throttle(ship.fire, 1000);

  };

  Ship.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.theta.z = this.angular_vel;
  };

  Ship.prototype.angleToSlope = function() {
    // Convert degree to radians
    var degrees = this.angular_vel % 360;
    var radians = degrees * ( Math.PI / 180.0000 );
    var abs_slope = [ -Math.sin(radians), Math.cos(radians) ];
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
    var direction = this.angleToSlope();
    direction[0] *= impulse;
    direction[1] *= impulse;
    _.each(this.vel, function(val, i) {
      if ( !( val < -ship.MAX_SPEED && direction[i] < 0 ) &&
           ! (val >  ship.MAX_SPEED && direction[i] > 0 ) ) {
        ship.vel[i] += direction[i];
      }
    });
  };

  Ship.prototype.getBulletVel = function() {
    var direction = this.angleToSlope();
    direction[0] *= 20.00;
    direction[1] *= 20.00;

    return direction;
  };



})(this);
