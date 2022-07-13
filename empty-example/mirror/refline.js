let fotp,n;
class refline{
  constructor(x1,y1,x2,y2){
    this.v1=createVector(x1,y1);
    this.v2=createVector(x2,y2);
  }
  update(tp){
    this.p=tp;
    
  // First convert the line to a normalised unit vector
  let b=(this.v2.copy().sub(this.v1)).setMag(1)
  
  // Translate the target point and get the dot product
  let lambda=(this.p.copy().sub(this.v1)).dot(b)
  let fotp=b.copy().mult(lambda).add(this.v1)
  this.n= fotp.copy().sub(p).add(fotp);
  }
  showpoint(){
    strokeWeight(3);
    point(this.n.x,this.n.y);
    strokeWeight(0.1);
  }
  showline(){
line(this.v1.x,this.v1.y,this.v2.x,this.v2.y);
  }
  }