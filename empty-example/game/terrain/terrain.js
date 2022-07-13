let inc = 0.01;
let inc1=0;
let start = 0;
let out=0;
let v;
let speed=5;
let terraingap=300;
let score=0;
let scorestop=false;
let gameover=document.getElementById('gameover')
gameover.style.display='none'
function setup() {
  canvas=createCanvas(windowWidth/1.005, windowHeight/1.005);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  v= new vehicle(0,10);
  //t= new terrain();
}

function draw() {
  background(51);
  document.getElementById("score").innerText=score;
  stroke(255);
  fill(10);
  noiseDetail(1);
  if (out){
    background(200,0,0)
    out=0
    if (inc1!=0) {
     scorestop=true
     inc1=0
     gameover.style.display='block'
    }
    //scorestop=1
  }
  terrain();

  v.show();
  v.update();
  if (!scorestop && inc1!=0){
  score+=1;}
  //noLoop();
}


function terrain(){
    beginShape();
  let l=[];
  let xoff = start;
  vertex(-5, height);
  for (let x = 0; x <= width; x++) {
    stroke(255);
    // let y = random(height);
    let y = map(noise(xoff),0,1,terraingap,height);
    vertex(x, y);
    l.push([x,y])
    if (v.pos.x == x && v.pos.y > y){
      out=1;    }
    
    xoff += inc;
  }
  
  vertex(width+5, height);
  endShape();
  fill(10);
  beginShape();
  vertex(-5, 0);
  for (let i=0;i<l.length;i++){
    let x=l[i][0];
    let y=l[i][1]-terraingap
    vertex(x,y);
    if (v.pos.x == x && v.pos.y < y){
      out=1;    }
  }
  vertex(width+5,0);
  endShape();
  start += -inc1;
  
  }

class vehicle {
  constructor(x,y){
    this.pos=createVector(x,y);
  }

  update(){
    if (keyIsDown(LEFT_ARROW)) {
    this.pos.x-=speed;
  } if (keyIsDown(RIGHT_ARROW)) {
   this.pos.x+=speed;
  } if (keyIsDown(DOWN_ARROW)) {
   this.pos.y+=speed;
  } if (keyIsDown(UP_ARROW)) {
    this.pos.y-=speed;
  }
    
  }
  show(){
    fill(200,200,200)
    ellipse(this.pos.x,this.pos.y,10,10)
  }
}
function play(){
  if (inc1==0){
    inc1=0.01
  }
  else{
    inc1=0
  }
}
function startd(){
  start=0
  score=0
  inc1=0.01
  scorestop=false
  gameover.style.display='none'
}
/*
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    v.update(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    v.update(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    v.update(0, 1);
  } else if (keyCode === UP_ARROW) {
    v.update(0, -1);
  }

}*/ 