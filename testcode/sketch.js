console.log(window.innerWidth)
let slider=document.getElementById('myRange')
let val=0
let d=d3.csv('./programminglanguage.csv', (data)=>data).then((res)=>{data=res}).then(drawd)
let j=0;
let i=0;
let f=0;
slider.oninput=()=>{
	val=slider.value;
}
function drawd(){
	f=1;
j++;
j%=data.length;
}
function setup() {
  let canvas = createCanvas(1000, 600);
  
}
function verttext(a,x,y){
	push();
    translate(x,y);
    rotate(3.14/2);
    text(a, 0,0);
	pop();
}
function draw() {
   background(0);
   fill('#07C');
   noStroke();
   if(f==1){
   	let i=0
   	for(let [k,v] of Object.entries(data[val])){
   		i++;
   		let tv=parseFloat(v).toFixed(2)
   		textSize(10);
		fill(255, 255, 255);
		verttext(k, i*20, 520);
		text(tv, i*20,480-v*10);
		fill(0, 102, 153);
   		rect(i*20, 500-v*10, 10, v*10);
   	}
   	textSize(20);
		fill(255, 255, 255);
		text(data[val].Date, 200, 50);
   }

}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}