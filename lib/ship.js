(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.angular_vel = 0;
    this.last_vel = [0, 1];
    this.MAX_VEL = 6;
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
    this.theta.y++;
    this.theta.z = this.angular_vel;

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

  Ship.prototype.power = function(impulses) {
    var ship = this;

    _.each(impulses, function(impulse, i) {
      if (Math.abs(ship.vel[i] + impulse) <= ship.MAX_VEL) {
        ship.vel[i] += impulse;
      }
    });
    if (!(this.vel[0] === 0 && this.vel[1] === 0)) {
      this.last_vel = this.vel.slice(0);
    }

  };

  Ship.prototype.getBulletVel = function() {
    var velocity = [0, 0];
    var ship_vel = (this.vel[0] == 0 && this.vel[1] == 0) ? this.last_vel : this.vel;
    _.each(ship_vel, function(vel, i) {
      if (vel === 0) { return }
      velocity[i] = vel * 8;
    });

    return velocity;
  };


})(this);
