let h=800,w=800;
function setup() {
	createCanvas(w,h)
}
let aa,bb;
let angle=0;
function draw() {
	background(0);
	let ca=map(mouseX,0,w,-2,2);//sin(angle);
	let cb=map(mouseY,0,h,-2,2);//cos(angle);
	angle+=0.05;
	loadPixels();
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			let a=map(i,0,w,-2,2);
			let b=map(j,0,h,-2,2);
			let n=20;
			while(n>0){
				n--;
				aa=a*a-b*b;
				bb=2*a*b;
				a=aa+ca;
				b=bb+cb;
				if(abs(a+b)>10)break
			}
			let r=0,g=0,bl=0,al=0;
			if(n>0){
				r=255;
			}
			if(n>5){
				bl=255;
			}
			if(n>10){
				g=255;
			}

			let p=(i+j*w)*4;
			pixels[p+0]=r;
			pixels[p+1]=g;
			pixels[p+2]=bl;
			pixels[p+3]=200;
		}
	}
	updatePixels();
}