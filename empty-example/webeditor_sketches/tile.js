
let s=40
let grid=[]
let w=5,h=5;
let current;
let tiled=[]
let cols,rows
function setup() {
  createCanvas((2**w)*s,(2**h)*s);
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill()
  frameRate(1)
 cols=floor(width/s);
 rows=floor(height/s);
 console.log(cols,rows)
  for (var i = 0; i <rows ; i++) {
  	let gridx=[]
  	for (var j = 0; j <cols ; j++) {
  		let c=new Cell(j,i)
  		gridx.push(c)
  		rect(j*s,i*s,s,s)
  		
  	}
  	grid.push(gridx)
  }

  current=grid[8][2]
  current.tiled=true
  current=findtiled(0,0,1)
  fill(200);
  rect(current.x,current.y,s,s)
  sequence=sequence_generate(current,5)
	console.log(sequence)
  
  findcurrent(2)
  tile(sequence[4])

  let xoff=floor(rows/2)
  let yoff=floor(cols/2)

 	 
	for (var i = 0; i < tiled.length; i++) {
		console.log(tiled[i].i,tiled[i].j)
	}

	sequence=sequence_generate(findtiled(0,0,2),4)
	tile(sequence[3])
	sequence=sequence_generate(findtiled(xoff,0,2,clr=true),4)
	tile(sequence[3])
	sequence=sequence_generate(findtiled(0,yoff,2),4)
	tile(sequence[3])
	sequence=sequence_generate(findtiled(xoff,yoff,2),4)
	tile(sequence[3])   	
  //findtiled(off,0,2,clr=true)
  //findtiled(0,off,2,clr=true)
  //findtiled(off,off,2,clr=true)
 }

 function draw(){
 	//tile(current.move)
 	//tile(current.sequence[0],current.sequence[1])
 }

 class Cell{
	constructor(x,y){
		this.i=y;
		this.j=x;
		this.x=x*s;
		this.y=y*s;
		this.tiled=false
		this.move=0;
		//this.sequence=sequence_generate(this)
		
	}

}

function sequence_generate(a,n) {
	let l=[]
	let x=2
	for (var k = 0; k < n; k++) {
		if (a.i%x<x/2 && a.j%x<x/2) {l.push(2)}
		else if (a.i%x>=x/2 && a.j%x<x/2) {l.push(3)}
		else if (a.i%x<x/2 && a.j%x>=x/2) {l.push(1)}
		else if (a.i%x>=x/2 && a.j%x>=x/2) {l.push(4)}
		
	
		x*=2
	}
	return l
}

function tile(a){
	x=current.i
	y=current.j
	let next=[]
	
	if (a==1) {
		next.push(grid[x][y-1])
		next.push(grid[x+1][y])
		next.push(grid[x+1][y-1])
	}
	else if (a==2) {
		next.push(grid[x][y+1])
		next.push(grid[x+1][y])
		next.push(grid[x+1][y+1])
		//tempcur=grid[x][y+1]
	}
	else if (a==3) {
		next.push(grid[x][y+1])
		next.push(grid[x-1][y])
		next.push(grid[x-1][y+1])
		//tempcur=grid[x-1][y+1]
	}
	else if (a==4) {
		next.push(grid[x][y-1])
		next.push(grid[x-1][y])
		next.push(grid[x-1][y-1])
		//tempcur=grid[x-1][y]
	}
	
	fill(100)
	for (var i=0;i<next.length;i++){
		next[i].tiled=true
		tiled.push(next[i])
		rect(next[i].x,next[i].y,s,s)
	}
}

function findcurrent(a){
	current=grid[(rows/a)-1][(cols/a)-1]
}

function findtiled(xoff,yoff,a,clr=false){

				let indx=floor(xoff+(rows/a)-1)
				let indy=floor(yoff+(cols/a)-1)
				console.log('index',indx,indy)
	for (var i = xoff; i < indx+1; i++) {
		for (var j = yoff; j < indy+1; j++) {
			if (clr) {
				fill(100)
				rect(grid[i][j].x,grid[i][j].y,40,40)
			}
			if(grid[i][j].tiled){
				fill(200,200,0)
				current=grid[floor(indx/2)][floor(indy/2)]
				rect(current.x,current.y,40,40)
				console.log("hello",grid[i][j])
				return grid[i][j]
	
			}
		}
	}
}

