(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function () {
    Asteroids.MovingObject.call(this, arguments);
    this.radius = Asteroid.RADIUS;
    this.color = Asteroid.COLOR;
    constructModel(this);
    this.vel = [];
    var vel_min = -2;
    var vel_max =  2;
    this.vel[0] = Math.random() * (vel_max - vel_min) - vel_max;
    this.vel[1] = Math.random() * (vel_max - vel_min) - vel_max;
  };



  var constructModel = function(asteroid) {
    var a = asteroid.radius;
    var b = 0.50 * a;
    asteroid.loadArrays({
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
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "#cccccc";
  Asteroid.RADIUS = 30;

})(this);
