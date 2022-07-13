// Coding Challenge 130.3: Drawing with Fourier Transform and Epicycles
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/130.1-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.2-fourier-transform-drawing.html
// https://thecodingtrain.com/CodingChallenges/130.3-fourier-transform-drawing.html
// https://youtu.be/7_vKzcgpfvU


let x = [];
let fourierX;
let fourierl;
let time = 0;
let path = [];
let len=document.getElementById('slider').value
let pathl=[]
function setup() {
  createCanvas(windowWidth, windowHeight);
  const skip = 8;
  for (let i = 0; i < drawing.length; i += skip) {
    const c = new Complex(drawing[i].x, drawing[i].y);
    x.push(c);
  }
  fourierX = dft(x);
  fourierX.sort((a, b) => b.amp - a.amp);
  print(fourierX.length)
  fourierl=fourierX.slice()

}

function epicycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(100, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(150);
    line(prevx, prevy, x, y);
  }
  stroke(255);
  return createVector(x, y);
}

function draw() {
  background(0);
  
  let v = epicycles(width / 2, height / 2, 0, fourierl);
  path.unshift(v);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierX.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}


function slider(){
  len=document.getElementById('slider').value
  document.getElementById('slidervalue').innerText=len
  print(fourierl.length)
  fourierl=fourierX.slice(0,len)
  //pathl=path.slice(1,len)
}