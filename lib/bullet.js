(function(rootObject){
	var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
	
	var Bullet = Asteroids.Bullet = function() {
		Asteroids.MovingObject.call(this, arguments);
	}
	Bullet.inherits(Asteroids.MovingObject);
	
	
	Bullet.prototype.collideWith = function(game, otherObj) {
		game.remove(otherObj);
		game.remove(this);
	}

	
	
})(this);