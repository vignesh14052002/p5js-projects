let cx=500;
let cy=500;
let a=0,r=200;
let a1=0;
let plot=cx+100
let inc=0.05;
let yl=[];
let xl=[];
let x,y,n,tr;
function setup() {
  createCanvas(windowWidth,windowHeight);
  
	
}

function draw() {
  background(0);
  translate(cx,cy)
  stroke(200);
  strokeWeight(3)
  noFill();
let px=0,py=0;  
for (var i = 0; i < 2; i++) {
	n=i*2+1;
	tr=r*(4/(n*PI));
  ellipse(px,py,2*tr,2*tr)
  x=tr*cos(a*n)+px;
  y=tr*sin(a*n)+py;
	line(px,py,x,y)
  px=x
  py=y	
} 
  a-=inc
  yl.unshift(y);
  xl.unshift(x);
// a1=a*2
//   let x1=tr*cos(a1)+x;
//   let y1=tr*sin(a1)+y;

// 
// ellipse(x1,y1,10,10)
// line(x1,y1,x,y)
	ellipse(plot,y,10,10)
line(x,y,plot,y)

if (yl.length>100){
	yl=yl.slice(1,100)
}

if (xl.length>60){
	xl=xl.slice(1,60)
}

  noFill()
  beginShape()
  for (var i = 0; i < 100; i++) {

    	//let ny=r*sin(a+i)+r1*sin((a+i)/2);
    	vertex(plot+i*5,yl[i])
    }  
  endShape()

  beginShape()
  for (var i = 0; i < 100; i++) {
    	//let ny=r*sin(a+i)+r1*sin((a+i)/2);
    	vertex(xl[i],yl[i])
    }  
  endShape()
}