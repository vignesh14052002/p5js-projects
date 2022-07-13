let r=1000,theta=5,d=50,p,l=[];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  translate(windowWidth/2, windowHeight/2);
  angleMode(DEGREES);
  p=createVector(0,0);
  for (let i=0;i<d;i++){
  let po=polar(r,theta)
  let x=po[0];
  let y=po[1];
  po=polar(r,-180+theta)
  let x1=po[0];
  let y1=po[1];
    theta+=180/d;
  ref=new refline(x,y,x1,y1)
    l.push(ref);
  }

}

function draw() {
  stroke(255);
  strokeWeight(0.1);
  p=createVector(mouseX-windowWidth/2,mouseY-windowHeight/2);
  translate(windowWidth/2, windowHeight/2);
  stroke(0,255,0);
  strokeWeight(5);
  point(p.x,p.y);
  strokeWeight(0.1);
  stroke(255);
  for (let i=0;i<l.length;i++){
  l[i].update(p);
  l[i].showpoint();
    //l[i].showline();
  }
}

function polar(r,theta){
  let x = r * cos(theta);
  let y = -r * sin(theta);
  return [x,y]
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}