
let size=document.getElementById("size").value;
class bubble {
  constructor(tx,ty,txi,txj,tr,tg,tb) {
    this.pos=createVector(tx,ty)
    this.vel=createVector(txi,txj)
    this.xi=txi;
    this.xj=txj;
    this.r = tr;
    this.g = tg;
    this.b = tb;
    this.size=size;
  }
  move(txi,txj){
    if (this.pos.x<this.size/2 || this.pos.x>windowWidth-this.size/2){this.vel.x=-this.vel.x;}
  if (this.pos.y<this.size/2 || this.pos.y>windowHeight-this.size/2){this.vel.y=-this.vel.y;}
  this.pos.add(this.vel)
  }
  draw(){
    stroke(this.r,this.g,this.b);
  strokeWeight(this.size/10);
   fill(this.b,this.r,this.g); 
    ellipse(this.pos.x,this.pos.y, this.size, this.size);
   
   }
}

class System {
  constructor(tball1, tball2) {
  this.ball1=tball1;
    this.ball2=tball2;
    this.collide=0;
    this.wait=10;
  }
  update(){
    this.wait-=1;
    if(p5.Vector.dist(this.ball1.pos,this.ball2.pos)<20){
      this.collide=1;
      if (this.collide && this.wait<0){
      this.ball1.vel.rotate(HALF_PI).mult(-1);
        this.ball2.vel.rotate(HALF_PI);
      //this.ball2.vel.mult(-1);
        this.collide=0;
        this.wait=30;
    }
    }
  }
}

aa={fsize}
function fsize(){
    size=document.getElementById("size").value;
  document.getElementById("sizetext").innerText=size;
}