

let size=10
let row,cols
let grid=[]
let newgrid=[]
function setup(){
	createCanvas(800,800)
	rows=width/size;
	cols=height/size;
	stroke(200)
	strokeWeight(1)
	noFill()
	for (var i = 0; i <rows; i++) {
		gridx=[]
		for (var j = 0; j < cols; j++) {
			let c=new Cell(i,j)
			c.state= i%2==1 || j%2==1 
			gridx.push(c)
			
		}
		grid.push(gridx)
		newgrid.push(gridx)
	}
}


function draw(){
	background(0)
	noStroke()
	for (var i = 0; i <rows; i++) {
		for (var j = 0; j < cols; j++) {
			let c=grid[i][j]
			if (c.state) {fill(250)}
			else{fill(0)}
			rect(c.i*size,c.j*size,size-1,size-1)


			calcneighbour(c.i,c.j)
		}
	}

	grid=newgrid;
}

class Cell{
	constructor(i,j){
		this.i=i;
		this.j=j;
		this.state=false//floor(random(0,2));
	}
}

function calcneighbour(x,y){
	let sum=0
	for (var i = -1; i < 2; i++) {
		for (var j = -1; j < 2; j++) {
		let ro=(x+i+rows)%rows
		let cl=(y+j+cols)%cols
		sum+=grid[ro][cl].state
		}
		
	}
	sum-=grid[x][y].state
	let live=grid[x][y].state
	if (live && (sum<2 || sum>3 )) {
		newgrid[x][y].state=0
	}
	else if (~live && sum==3) {
		newgrid[x][y].state=1
	}
	else {newgrid[x][y].state=live}

}
