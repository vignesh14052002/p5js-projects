let x,y
function setup() {
   createCanvas(windowWidth, windowHeight,WEBGL);
   x=width/2,y= height/2;

}
let r=0;
function draw() {
	pointLight(200,200,200,mouseX-x,mouseY-y,0)
   background(200);
   rectMode(CENTER)
   //strokeWeight(2);
   translate(-x,-y)
   noStroke(0);
   rotateY(r);
   rotateX(r*0.5);
   r+=0.05;
   torus(100, 50);
   fill(200,0,0);
   //noStroke();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}