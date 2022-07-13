let x,y,i,j;
let l=[];
let sys=[];

function setup() {
   createCanvas(windowWidth, windowHeight);
 x=windowWidth/2,y= windowHeight/2;
  
}

function draw() {
   background(0);
  for(i=0;i<l.length;i++){
  l[i].move(); 
  l[i].draw();
}for(i=0;i<sys.length;i++){
  sys[i].update(); 
  }
}
function mouseClicked() {
  b=new bubble(mouseX,mouseY,random(1,5),random(1,5),random(50,200),random(50,200),random(50,200));
  
  if(l.length>=1){
  for(let i=0;i<l.length;i++){
    let s=new System(b,l[i]);
    sys.push(s);
  }
    
}l.push(b);
  // prevent default
  return false;
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

