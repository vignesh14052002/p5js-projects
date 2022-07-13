let x,y,i,j;
//let windowWidth=500,windowHeight=500;
let size=document.getElementById("size").value;
let a=document.getElementById("speed").value;
a=a/50;
let aa;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
 x=windowWidth/2,y= windowHeight/2,i=12,j=20;
 //console.log(img)
}

function draw() {
   background(0);
   //image(img,0,0)
  if (x<size/2 || x>windowWidth-size/2){i=-i}
  if (y<size/2 || y>windowHeight-size/2){j=-j}
  x+=i*a
  y+=j*a
   ellipse(x,y, size, size);
   fill('#07C');
   noStroke();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

//document.getElementById("myRange").oninput = 
aa={fsize,speed}
function fsize(){
    size=document.getElementById("size").value;
  document.getElementById("sizetext").innerText=size;
}
function speed(){
    a=document.getElementById("speed").value;
    a=a/50;
  document.getElementById("speedtext").innerText=a*50;
}