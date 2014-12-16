(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
    this.MAX_VEL = 6;
  };
  Ship.inherits(Asteroids.MovingObject);

  Ship.COLOR = "red";
  Ship.RADIUS = 10;

	Ship.prototype.fire = function(game){
		var bulletSpeed = [this.vel[0] * 2, this.vel[1] * 2];
		var b = new Asteroids.Bullet({pos: this.pos.slice(0), radius: 1, vel: bulletSpeed, color: "red"})
		game.add(b);
	};
  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPos();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulses) {
    var ship = this;
    _.each(impulses, function(impulse, i) {
      if (ship.vel[i] < ship.MAX_VEL) {
        ship.vel[i] += impulse;
      }
    });
    console.log(this.vel);
  };

	Ship.prototype.fireBullet = function() {

	};

})(this);
