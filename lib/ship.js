(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.last_vel = [0, -1];
    this.MAX_VEL = 6;
  };
  Ship.inherits(Asteroids.MovingObject);

  Ship.COLOR = "red";
  Ship.RADIUS = 10;

	Ship.prototype.fire = function(game){
		var bulletSpeed = this.getBulletVel();
		var b = new Asteroids.Bullet({pos: this.pos.slice(0), radius: 3, vel: bulletSpeed, color: "magenta"})
		game.add(b);
	};
  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPos();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulses) {
    var ship = this;
    console.log(impulses);
    _.each(impulses, function(impulse, i) {
      if (Math.abs(ship.vel[i] + impulse) <= ship.MAX_VEL) {
        ship.vel[i] += impulse;
      }
    });
    if (!(this.vel[0] === 0 && this.vel[1] === 0)) {
      this.last_vel = this.vel.slice(0);
    }
    console.log("Velocity: "  + this.vel );
    console.log("Last velocity:" + this.last_vel);
  };

  Ship.prototype.getBulletVel = function() {
    var velocity = [0, 0];
    var ship_vel = (this.vel[0] == 0 && this.vel[1] == 0) ? this.last_vel : this.vel;
    _.each(ship_vel, function(vel, i) {
      if (vel === 0) { return }
      velocity[i] = vel * 10;
    });

    console.log(velocity);
    return velocity;
  };


})(this);
