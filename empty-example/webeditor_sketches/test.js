let x,y,song,amp
let img;
function preload() {
  img = loadImage('webeditor_sketches/art.JPG');
}
function loaded(){
song.play()
}
function setup() {
   createCanvas(windowWidth, windowHeight);
   song=loadSound('webeditor_sketches/mysong.mp3',loaded)
   x=windowWidth/2,y= windowHeight/2,i=12,j=20,a=1;
   amp=new p5.Amplitude();
   
}

function draw() {
	
	let lvl=amp.getLevel()
   background(0);
   ellipse(x,y, lvl*100, lvl*100);
   fill('#07C');
   noStroke();
   image(img,0,0)
}

function mousePressed() { 
	getAudioContext().resume()
	if (!song.isPlaying()) {
		song.play()
	}
	else{song.pause()}
 }

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}