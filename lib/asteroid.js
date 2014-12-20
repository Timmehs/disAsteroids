(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Asteroid = Asteroids.Asteroid = function () {
    Asteroids.MovingObject.call(this, arguments);
    this.radius = Asteroid.RADIUS;
    this.collisionRadius = ((Math.sqrt(5) + 1) / 2) * this.radius;
    this.color = Asteroid.COLOR;
    constructModel(this);
    this.edgeStyle = {
      strokeStyle : this.color,
      lineWidth : 2,
      lineCap : 'round'
    };
    this.vel = [];
    var vel_min = -2;
    var vel_max =  2;
    this.vel[0] = Math.random() * (vel_max - vel_min) - vel_max;
    this.vel[1] = Math.random() * (vel_max - vel_min) - vel_max;
    this.animationProperties.x = (Math.random() * 2) - 2;
    this.animationProperties.y = (Math.random() * 2) - 2;
    this.animationProperties.z = (Math.random() * 2) - 2;
  };

  Asteroid.inherits(Asteroids.MovingObject);


  var constructModel = function(asteroid) {
    var a = asteroid.radius;
    var b = ((Math.sqrt(5) + 1) / 2) * a;
    this.collisionRadius = b;
    asteroid.loadObjects({
    vertices : {
      'wre8w' : { x: -a, y:  0.000, z:  b },
      '3peos' : { x:  a, y:  0.000, z:  b },
      'dewfe' : { x: -a, y:  0.000, z: -b },
      'ref9r' : { x:  a, y:  0.000, z: -b },
      'ty3gr' : { x:  0.000, y:  b, z:  a },
      '34ref' : { x:  0.000, y:  b, z: -a },
      't4thf' : { x:  0.000, y: -b, z:  a },
      'zdsgr' : { x:  0.000, y: -b, z: -a },
      'r4htb' : { x:  b, y:  a, z:  0.000 },
      'ii88j' : { x: -b, y:  a, z:  0.000 },
      '6hgbt' : { x:  b, y: -a, z:  0.000 },
      'nrtyy' : { x: -b, y: -a, z:  0.000 }
    },
    edges : {
      'thq3t' : { a: 'wre8w', b: '3peos' },
      'ko956' : { a: '3peos', b: '6hgbt' },
      'yrth4' : { a: 'dewfe', b: 'ref9r' },
      'erg33' : { a: 'ref9r', b: '6hgbt' },
      'wrsrv' : { a: '6hgbt', b: 'zdsgr' },
      'etrer' : { a: 'zdsgr', b: 'nrtyy' },
      'p88rg' : { a: 't4thf', b: 'zdsgr' },
      'nr433' : { a: 'zdsgr', b: 'dewfe' },
      'qwe34' : { a: 'ref9r', b: 'zdsgr' },
      '12def' : { a: 'dewfe', b: 'nrtyy' },
      '0edmf' : { a: 'nrtyy', b: 't4thf' },
      'hi98d' : { a: 't4thf', b: '6hgbt' },
      'l30e9' : { a: 'wre8w', b: 't4thf' },
      'qf09e' : { a: 't4thf', b: '3peos' },
      'eo98w' : { a: 'nrtyy', b: 'wre8w' },
      'wr456' : { a: 'ii88j', b: 'nrtyy' },
      'awse3' : { a: 'ref9r', b: '6hgbt' },
      'bieiw' : { a: 'ii88j', b: 'wre8w' },
      'xedry' : { a: 'dewfe', b: 'ii88j' },
      'jiwoe' : { a: 'ref9r', b: '34ref' },
      '7u4rf' : { a: '34ref', b: 'ii88j' },
      'aew4r' : { a: 'dewfe', b: '34ref' },
      'viu54' : { a: 'ref9r', b: 'r4htb' },
      'hye3e' : { a: '6hgbt', b: 'r4htb' },
      '0ersd' : { a: '34ref', b: 'ty3gr' },
      '84jer' : { a: '34ref', b: 'r4htb' },
      'kei3e' : { a: '3peos', b: 'ty3gr' },
      'a345d' : { a: 'r4htb', b: 'ty3gr' },
      'h7524' : { a: 'ii88j', b: 'ty3gr' },
      'ghryd' : { a: 'wre8w', b: 'ty3gr' },
      'yte45' : { a: '3peos', b: 'r4htb' }
    },

    });
  };

  Asteroid.prototype.collideWith = function(game, otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.bounce(otherObj);
    } else {

    }
  }

  Asteroid.prototype.bounce = function(otherAsteroid) {
		console.log('bounce');
		var temp_vel = this.vel;
    this.vel = otherAsteroid.vel.slice(0);
    otherAsteroid.vel = temp_vel;
		this.move();
		otherAsteroid.move();
  }



  Asteroid.COLOR = "#DC143C";
  Asteroid.RADIUS = 20;

})(this);
