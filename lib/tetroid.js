(function(rootObject) {

  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Tetroid = Asteroids.Tetroid = function() {
    SimpleMesh.call(this, arguments[0]);
    this.loadArrays({
      vertices : [
        [  100, -75, -100 ], // Pyramid base
        [ -100, -75, -100 ],
        [ -100, -75,  100 ],
        [  100, -75,  100 ],
        [    0,  75,    0 ], // The top
      ],
      edges : [
        [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 0 ],
        [ 4, 0 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ]
        ]
    });
  }

  Tetroid.inherits(SimpleMesh);

})(this);
