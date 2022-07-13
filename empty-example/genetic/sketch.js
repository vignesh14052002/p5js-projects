let p,count,target,life
let rx,ry,w,h
let time=200
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
	  
	count=time
	life=time
	p=new population(200,count)
	target=createVector(width/2,50)
	rx=width/4
	ry=height/2
	w=500
	h=10    
}

function draw() {
   background(0);
   rect(rx,ry,w,h)
   ellipse(target.x,target.y,50,50)
   p.update()
   life--
   if (life<0) {
   	p.evaluate()
   	life=time
   }
	   
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

class population{
  constructor(len,count){
    this.len=len;
    this.r=[]
    for (var i = 0; i <this.len; i++) {
  	let a = new rocket(count)
  	this.r.push(a)	
  	}
  }
  evaluate(){
  	let maxfit=0
  	let parent=[this.r[0],this.r[1]]
  	let reachcount=0
  	for (var i = 0; i < this.r.length; i++) {
	   	this.r[i].fitness=this.fitness(this.r[i].pos)
	   	if (this.r[i].obstacle()) {
	   		this.r[i].fitness=0
	   	}
	   	this.r[i].pos=createVector(width/2,height-50)
	   	this.r[i].vel.mult(0)
	   	if (this.r[i].reached) {
	   		parent[0]=this.r[i]
	   		reachcount+=1
	   		console.log('reached')
	   	this.r[i].reached=false
	   	
	   		
	   	}
	   	if(this.r[i].fitness>parent[0].fitness && this.r[i].fitness>parent[1].fitness){
	   		//console.log(this.r[i].fitness+' '+parent[0].fitness)
	   		if(random(1)<0.5){
	   			parent[0]=this.r[i]
	   		}
	   		else{
	   			parent[1]=this.r[i]	
	   		}
	   	}
	   }
	for (var i = 0; i < this.r.length; i++) {
		let mid=floor(random(0,count))
		for (var j = 0; j<count; j++) {
			if (i<mid) {
				this.r[i].dna.gene[j]=parent[0].dna.gene[j]
			}
			else{
				this.r[i].dna.gene[j]=parent[1].dna.gene[j]
			}

		}
		
		if(parent[0].fitness<0.95){
		for (var j = 0; j < random(count/10); j++) {
			let mut=floor(random(0,count))
		
			if(random(0,1)<0.5){
			this.r[j].dna.gene[mut]=p5.Vector.random2D()
			}
			}
		}
		
		
	}console.log('fitness '+parent[0].fitness)
	console.log('reachcount '+reachcount)
  }
  fitness(pos){

  	return map(target.dist(pos),0,width,1,0)
  }

  update(){
  	for (var i = 0; i < this.r.length; i++) {
	   	this.r[i].update()
	   	this.r[i].show()
	   }
  }
}

class rocket{
	constructor(count){
		this.pos=createVector(width/2,height-50)
		this.vel=p5.Vector.random2D()
		this.acc=createVector(0,0)
		this.count=0
		this.dna=new DNA(count)
		this.fitness=0
		this.reached=false
	}
	applyforce(f){
		this.acc.add(f)
	}

	obstacle(){
		if (this.pos.x>rx && this.pos.y>ry && this.pos.x<rx+w && this.pos.y<ry+h) {
			return true
		}
		if (this.pos.x>width || this.pos.y>height || this.pos.x<0 ) {
			return true
		}
		return false
	}
	update(){

		this.applyforce(this.dna.gene[this.count])
		this.count++
		if(this.count>count){
			this.count=0
		}

		// if (this.obstacle()) {
		// 	console.log('obstacle')
		// }
		if(this.pos.dist(target)<50){
			
			this.reached=true
			this.pos=target.copy()
		}
		if (!this.reached && !this.obstacle()) {
			this.vel.add(this.acc)	
			this.pos.add(this.vel)
			
		}
		this.vel.limit(10)
		
		//console.log('p '+this.pos.y+' v '+this.vel.y+' a '+this.acc.y+' g '+this.dna.gene[this.count]+this.dna.gene.length)
	this.acc.mult(0)
	}
	show(){
		push()
		translate(this.pos.x,this.pos.y)
		rectMode(CENTER)
		rotate(this.vel.heading())
		rect(0,0,50,10)
		pop()
	}
}

class DNA{
	constructor(count){
		this.a=true
		this.gene=[]
		console.log(count)
		for (var i = 0; i < 100; i++) {
			this.gene[i]=p5.Vector.random2D().setMag(1)
		}

	}
}