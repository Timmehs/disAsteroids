(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};

  var Menu = Asteroids.Menu = function () {
    this.header = 'disAsteroids';
    this.opts = ['Start Game', 'Sound On'];
    this.soundOn = false;
    this.currentSelection = 0;
  }

  Menu.prototype.draw = function () {

    var menuContent = this.renderMenu();

  };

  Menu.prototype.renderMenu = function () {
    var menu = this;
    var topDisplacement = HEIGHT/-2 + 100;
    CTX.fillStyle = "white";
    this.renderHeader(topDisplacement);
    this.renderMenuItems(topDisplacement);

  };

  Menu.prototype.renderHeader = function (top) {
    var left = CTX.measureText(this.header).width/-2;
    CTX.font = '45px Courier';
    CTX.fillText(this.header, left, top);
  };

  Menu.prototype.renderMenuItems = function (top, left) {
    CTX.font = '35px Courier';
    var topDisplacement = top + 45;
    var menu = this;
    _.each( this.opts, function (str, i) {
      topDisplacement += 35;
      var item;
      var left;
      if (menu.currentSelection == i) {
        item = "> " + str;
      } else {
        item = "  " + str;
      }
      left = CTX.measureText(str).width/-2;
      CTX.fillText(item, left, topDisplacement);
    });
  }

  Menu.prototype.up = _.throttle(function() {
    console.log('up');
    this.currentSelection = this.currentSelection == 1 ? 0 : 1;
  }, 100, { trailing: false });

  Menu.prototype.toggleSound = function () {

  }


  Menu.prototype.down = _.throttle(function () {
    var menu = this;
    this.currentSelection--;
  }, 450, { trailing: false });




})(this);
