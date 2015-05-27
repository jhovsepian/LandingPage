window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var num = 425,
  rad = 20;

var s = [20, 15, 10, 5, 3];

function _S() {
  var curr = s.length;
  var cur_ = Math.floor(Math.random() * curr);
  return s[cur_];
}

function FizzBuzz(c) {
  this.c = c;
  this.$ = c.getContext('2d');
  this.b = {};
  this.go();
}

FizzBuzz.prototype.go = function() {
  this.x = this.b.x = Math.random() * (this.c.width - rad);
  this.y = this.b.y = Math.random() * (this.c.width - rad);
  this.radi = _S();
  this.xPos = Math.random() * 9;

  this.draw();
};

FizzBuzz.prototype.draw = function() {
  this.$.globalCompositeOperation = 'source-over';
  this.$.fillStyle = "hsla(350, 90%, 40%, 1)";
  this.$.globalCompositeOperation = 'lighter';
  this.$.save();
  this.$.beginPath();
  this.$.arc(this.x, this.y, this.radi, 0, Math.PI * 2, false);
  this.$.fill();
  this.$.restore();
};

FizzBuzz.prototype.disp = function() {
  this.x = (Math.sin(this.xPos -= 0.35) * this.radi * 0.16 + 6) + this.b.x;
  this.y -= this.radi * 0.33;
  if (this.y <= -100) {
    this.y = this.c.height + rad;
  }
  this.draw();
};

function Fizz(c) {
  this.c = c;
  this.$ = c.getContext('2d');
  this.arr = [];
}

Fizz.prototype.add = function(buzz) {
  this.arr.push(buzz);
};

Fizz.prototype.upd = function() {
  this.$.clearRect(0, 0, this.c.width, this.c.height);

  for (var i = 0, u = this.arr.length; i < u; i++) {
    this.arr[i].disp();
  }
};

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
  c.style.position = 'absolute';
  c.style.left = (window.innerWidth - w) *
    .01 + 'px';
  c.style.top = (window.innerHeight - h) *
    .01 + 'px';
});

window.addEventListener('load', function() {
  var c = document.getElementById('canv');
  var $ = c.getContext('2d');
  var w = c.width = window.innerWidth;
  var h = c.height = window.innerHeight;

  var fb = new Fizz(c);
  for (var i = 0, u = num; i < u; i++) {
    var buzz = new FizzBuzz(c);
    fb.add(buzz);
  }
  _t();

  function _t() {
    fb.upd();
    window.requestAnimFrame(_t);
  }
}, false);

