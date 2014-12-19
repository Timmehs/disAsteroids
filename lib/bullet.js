(function(rootObject){
	var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

	var Bullet = Asteroids.Bullet = function() {
		Asteroids.MovingObject.call(this, arguments);
		constructModel(this);
		this.edgeStyle = {
			strokeStyle : this.color,
			lineWidth : 1,
			lineCap : 'round'
		};

	}

	Bullet.inherits(Asteroids.MovingObject);

	var constructModel = function(object) {
		var a = object.radius;
		var b = 0.50 * a;
		object.loadArrays({
			vertices : [
				[  a, -b, -a ], // Pyramid base
				[ -a, -b, -a ],
				[ -a, -b,  a ],
				[  a, -b,  a ],
				[  0,  b,  0 ],
				[  0, -b * 3,  0 ] // The top
			],
			edges : [
				[ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 0 ],
				[ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ],
				[ 5, 0 ], [ 5, 1 ], [ 5, 2 ], [ 5, 3 ]
			]
		});
	};

	Bullet.prototype.resetPos = function() {
		var object = this;
		_.each([['y', HEIGHT], ['x', WIDTH]], function(dim) {
			if (object.origin[dim[0]] < (dim[1] / -2) - object.radius) {
				gView.game.remove(object);
				console.log('bullet removed');
			} else if (object.origin[dim[0]] > (dim[1] / 2) + object.radius) {
				gView.game.remove(object);
				console.log('bullet removed');
			}
		});
	};



 	Bullet.prototype.collideWith = function(game, otherObj) {
		game.remove(otherObj);
    game.remove(this);
	}
})(this);
