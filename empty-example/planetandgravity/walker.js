// What is a Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/bKEaK7WNLzM
// https://thecodingtrain.com/learning/nature-of-code/1.1-what-is-a-vector.html
// https://editor.p5js.org/codingtrain/sketches/JmEToUfk
let a,angle;
class Planet {
  constructor(x,y,g,s=100) {
    this.c=createVector(x,y);
    this.g=g;
    this.size=s;
  
    
  }
  
  show(){fill(100,50);
         
    stroke(255, 100);
    strokeWeight(4);
    ellipse(this.c.x, this.c.y,this.size,this.size);
        point(this.c.x, this.c.y);}
  
}
class Particle {
  constructor(x, y,vel,tv) {
  this.pos=createVector(x,y);
  this.v=tv;//createVector(1,0);
    this.vel=vel;
  }
}

class System {
  constructor(tpart, tplan) {
  this.part=tpart;
    this.plan=tplan; 
  }

  update() {
    a=createVector(0,0);
    if (this.plan.c.dist(this.part.pos)<this.plan.size){
    a=p5.Vector.sub(this.plan.c,this.part.pos);
  }
    this.part.v.setMag(this.part.vel);
  a.setMag(this.plan.g);
  this.part.v.add(a);
  this.part.pos.add(this.part.v);
    
    angle=this.part.v.heading();//atan(this.part.v.y/this.part.v.x);
  }
show() {
    stroke(255, 100);
    strokeWeight(3);
    push();
    translate(this.part.pos.x, this.part.pos.y);
  rotate(angle);  
  triangle(0,0,0,10,20,5);
  //ellipse(0,0,20,3);
    pop();
    
  }}