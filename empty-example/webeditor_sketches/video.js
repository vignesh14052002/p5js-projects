let video;
let width=1000;
let height=800;
let x=0;
let w=1;
let canvas;

function setup() {
  canvas=createCanvas(width,height);
  pixelDensity(1)
  stroke(200,0,0)
strokeWeight(2)
fill(200,0,0)
  background(0);
  video=createCapture(VIDEO,load);
  
}
function load() {
	video.hide();
  video.size(width,height)

}

function draw() {
	rect(0,0,10,10)
	slitscan(1,vert=true)
}

function slitscan(w,vert=false) {
	if (!vert) {
		copy(video,video.width/2,0,w,video.height,x,0,w,video.height)
		x+=1
		if (x>video.width) {
			x=0
		}
	}
	else if (vert) {
		copy(video,0,video.width/2,video.width,w,0,x,video.width,w)
		x+=1
		if (x>video.height) {
			x=0
		}
	}
}

function timewrap(w,inc,vert=false){
	if (!vert) {
		copy(video,x,0,w,video.height,x,0,w,video.height)
		copy(video,x+1,0,video.width-x-1,video.height,x+1,0,video.width-x-1,video.height)
		copy(canvas,0,0,10,10,x+inc,0,5,video.height)
	x+=inc
	if (x>=video.width-1) {
		x=0
	}
	}
	else if (vert) {
		copy(video,0,x,video.width,w,0,x,video.width,w)
		copy(video,0,x+1,video.width,video.height-x-1,0,x+1,video.width,video.height-x-1)
		copy(canvas,0,0,10,10,0,x+inc,video.width,5)	
	x+=inc
	if (x>=video.height-1) {
		x=0
	}
	}
	
}