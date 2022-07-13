let w=500;
let h=500;
let particles=[];
function setup(){
    createCanvas(500,500);
    background(0);
}
let spawn=100;
function draw(){
    background(0);
    spawn--;
    if(spawn==0){
        spawn=100;
        particles.push(new particle(random(w),h));
    }
    for(let i=0;i<particles.length;i++){
        let p=particles[i];
        p.update();
        p.show();
        if(p.count==0 && p.original)explode(i,p);
        if(p.pos.y>h+10)particles.splice(i,1);
    }
}
function explode(i,p){
    let {x,y}=p.pos;
    let r=2;
    particles.splice(i,1);
    for (let i = 0; i < 100; i++) {
        let v=createVector(random(-r,r),random(-r,r))
        particles.push(new explodedparticle(x,y,v));        
    }

}
class particle{
    constructor(x,y){
        this.pos=createVector(x,y);
        this.vel=createVector(random(-1,1),-8);
        this.gravity=createVector(0,0.1);
        this.count=100;
        this.original=true;
        this.s=8;
    }
    update(){
        this.vel.add(this.gravity);
        this.pos.add(this.vel);
        this.count--;   
    }
    show(){
        fill(200);
        ellipse(this.pos.x,this.pos.y,this.s,this.s);
    }
}

class explodedparticle extends particle{
    constructor(x,y,v){
        super(x,y);
        this.vel=v;
        this.original=false;
    }
}