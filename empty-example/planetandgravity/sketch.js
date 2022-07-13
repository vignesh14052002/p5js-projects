let sys=[];
let pl,v;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  pl1 =new Planet(windowWidth/4, windowHeight/2,0.2,200);
  pl2 =new Planet(windowWidth/2, windowHeight/4,0.2,300);
  pl3 =new Planet(windowWidth/2, 3*windowHeight/4,0.2,220);
  pl4 =new Planet(3*windowWidth/4, windowHeight/2,0.2,120);
  pl=[pl1,pl2,pl3,pl4]
  for (i=0;i<50;i++){
    v=createVector(random(-2,2),random(-2,2))
  pa =new Particle(random(0,windowWidth),random(0,windowHeight),2,v);
    for(j=0;j<pl.length;j++){

    s=new System(pa,pl[j]);
    sys.push(s);
    
}}

}

function draw() {
  background(0);
  for(j=0;j<pl.length;j++){
  pl[j].show();}
  for (i=0;i<sys.length;i++){
  sys[i].update();
  sys[i].show();
}
}


function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}