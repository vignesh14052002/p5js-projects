let snakes=[];
let scl=20;
let food;
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  viswa = new mysnake(0,0,[39,245,2],'viswa');
  viki = new mysnake(60,0,[10,200,152],'viki');
  snakes.push(viswa)
  snakes.push(viki)
  frameRate(10);
  foodLocation()
}

function draw() {
   background(0);
   fill('#07C');
   noStroke();
   for (var i = 0; i < snakes.length; i++) {
     
   snakes[i].update();
   snakes[i].show();
   if (snakes[i].isdead()){
      console.log('dead',snakes[i].name)
      snakes.splice(i,1);
   }
   }
   fill(255)
   rect(food.x, food.y, scl, scl);
   if (snakes.length==0) {background(255,0,0);}
   
   
   
}
function foodLocation() {
  let x = floor(random(width)/scl)*scl;
  let y = floor(random(height)/scl)*scl;
  food = createVector(x, y);
}

function keyPressed() {
      if (keyCode === LEFT_ARROW) {
      viswa.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
      viswa.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW) {
      viswa.setDir(0, 1);
    } else if (keyCode === UP_ARROW) {
      viswa.setDir(0, -1);
    }

    if (keyCode === 65) {
      viki.setDir(-1, 0);
    } else if (keyCode === 68) {
      viki.setDir(1, 0);
    } else if (keyCode === 83) {
      viki.setDir(0, 1);
    } else if (keyCode === 87) {
      viki.setDir(0, -1);
    }

    
}
class mysnake {
  
  constructor(x,y,color,name) {
    this.body = [createVector(x,y)];
    this.head= this.body[0];
    this.dir = createVector(0,0);
    this.len = 0;
    this.color=color;
    this.name=name;

  }
  
  setDir(x, y) {
    let tempdir=createVector(x,y).mult(scl);
    let temppos=this.head.copy().add(tempdir);
    if(this.body.length>1){
      if (temppos.x!=this.body[1].x && temppos.y!=this.body[1].y){
        this.dir = createVector(x,y).mult(scl)
      }
    
    }
    else{
    this.dir = createVector(x,y).mult(scl);
  }
  }

  add(){
    let tail=this.body[this.body.length-1].copy().sub(this.dir.copy())
    this.body.push(tail)
  }
  isdead(head=this.head){
    if(head.x>width || head.y>height || head.x<0 || head.y<0){return true;}
    for (var j = 0; j < snakes.length; j++) {
      for(let i = 1; i < snakes[j].body.length; i++) {
        let part = snakes[j].body[i];
        if(part.x == head.x && head.y == part.y) {
          return true;
        }
      }
    }
    return false;
  }
  eat(){
    if (this.head.x==food.x && this.head.y==food.y){
      return true  
    }
    return false
  }
  update(){
    //console.log(this.isdead())
    //this.body[0]=this.head.copy()
    for (var i = this.body.length-1; i>0; i--) {
      this.body[i]=this.body[i-1].copy()
    }
    this.head.add(this.dir.copy())
    if (this.eat()){
    foodLocation();
    this.add();
   };  
  }
  show(){
    stroke(200)
    fill(100);
    for (var i = 1; i < this.body.length; i++) {
      rect(this.body[i].x,this.body[i].y,scl,scl)
    }
    fill(this.color[0],this.color[1],this.color[2]);
    rect(this.head.x,this.head.y,scl,scl);
  }
}
/*function mouseClicked(){
  snake.add()
}*/
function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}
