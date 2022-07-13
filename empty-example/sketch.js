

// improved version with the help of a comment by emily bjork 
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

var inc = 0.01;
var scl = 10;
var zoff = 0;
var fr;
var particles = [];

function setup() {
  //fr = createP('');
  createCanvas(1080,1920);
  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
if (frameCount===1){
    capturer.start()
  }
  if (frameCount<60*60){
    capturer.capture(canvas)
  }
  
  else if (frameCount===60*60){
    capturer.save();
    capturer.stop();
  }
  zoff += 0.002;


  for (var i = 0; i < particles.length; i++) {
    particles[i].follow();
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

   //fr.html(floor(frameRate()));
}

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(0,5),random(0,5));
    this.acc = createVector(0, 0);
    this.maxspeed = 10;
    this.prevPos = this.pos.copy();
    this.color=0
    //this.shuffleArray(this.color)
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  colorupdate() {
  this.color+=1
  if (this.color>100) {
    this.color=0
  }
}
  follow() {
    
    var x = floor(this.pos.x /scl);
    var y = floor(this.pos.y / scl);
    var angle = noise(x*inc,y*inc, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
    var force = v;
    this.applyForce(force);
  }

  applyForce(force) {
    this.vel.add(force);
    //this.vel=force
  }
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


  show() {
    this.colorupdate()
colorMode(HSB, 100);

    stroke(this.color,80,80,1);
    strokeWeight(3);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}
//function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//}