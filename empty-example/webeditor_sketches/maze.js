let s=40
let grid=[]
let Current
let stack=[]
let pos
let off=1
let small=2*off
let large=s-2*off
let gap=small/2
let end=false
let next,pre
let forward=true

function setup() {
  createCanvas(1080,1920);
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill()
 cols=floor(width/s);
 rows=floor(height/s);
  for (var i = 0; i <rows ; i++) {
  	let gridx=[]
  	for (var j = 0; j <cols ; j++) {
  		let c=new Cell(j,i)
  		gridx.push(c)
  		rect(j*s,i*s,s,s)
  		
  	}
  	grid.push(gridx)
  }
  
  for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
		 	grid[i][j].calcneighbours()
		 } 
	}
  Current=grid[0][0]
  pre=grid[0][0]
	
}

function draw() {
	if(Current){
	Current.current=true
	Current.active=true
	if (forward) {fill(0,230,0)}
	else {fill(230,0,0)}
	
	rect(Current.x+off,Current.y+off,s-small,s-small)
	fill(0)
	rect(pre.x+off,pre.y+off,s-small,s-small)
	
	if (Current.neighbour.length!=0){
		
		Current.neighbourupdate()
		Current.current=false
		if (Current.neighbour.length!=0){
			forward=true
			next=random(Current.neighbour)
		Current.eraselines(Current,next)
		pos = Current.eraselines(Current,next)
		erasepath()
		pre=Current
		Current=next
		stack.push(Current)
		}
	}
	 else {
	 	forward=false
	 		pre=Current
	 	  Current=stack.pop()		
		}
	}

	else {
		if(!end){
			console.log('maze generated');
			
	}
		end=true

		fill(0)
		rect(pre.x+off,pre.y+off,s-small,s-small)
	 	
		}
}

function erasepath(){
		let x=Current.x
		let y=Current.y
		noStroke()
		fill(0);
		if (pos==1) {rect(x+off,y-gap,large,small);}
		else if (pos==2) {rect(x+s-gap,y+off,small,large);}
		else if (pos==3) {rect(x+off,y-gap+s,large,small);}
		else if (pos==4) {rect(x-gap,y+off,small,large);}
		noFill()	

}
class Cell{
	constructor(x,y){
		this.i=x;
		this.j=y;
		this.x=x*s;
		this.y=y*s;
		this.wall=[true,true,true,true]
		this.active=false
		this.current=false
		this.neighbour=[]
		
	}
	calcneighbours(){
		let x=this.j;
		let y=this.i
		this.index=function(x,y){if (x<0 || y<0 || x>rows-1 || y>cols-1) {
			return false
		}
		return true}

		if(this.index(x-1,y)){this.neighbour.push(grid[x-1][y])}
		if(this.index(x,y+1)){this.neighbour.push(grid[x][y+1])}
		if(this.index(x+1,y)){this.neighbour.push(grid[x+1][y])}
		if(this.index(x,y-1)){this.neighbour.push(grid[x][y-1])}
		
	}
	neighbourupdate(){

		for (var i = this.neighbour.length-1; i >-1 ; i--) {
			if(this.neighbour[i].active){
				this.neighbour.splice(i,1)
			}
		}
	}
	
	eraselines(c,n){
		if (c.j>n.j) {
			//pos=top
			return 1
		}
		if (c.i<n.i) {
			//pos=right
			return 2
		}
		if (c.j<n.j) {
			//pos=bottom
			return 3
		}
		if (c.i>n.i) {
			//pos=left
			return 4
		}

	}


}