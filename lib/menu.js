(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Menu = Asteroids.Menu = function () {



  }

  Menu.prototype.draw = function () {
    CTX.fillStyle = "white";
    CTX.font = 'italic bold 30px serif';
    CTX.fillText('Menu Plz', 0, 0);
  };


})(this);
