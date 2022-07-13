const tileImages = [];
function preload() {
    const path = './tiles/train-tracks';
    const imgs=["blank","down","left","right","up"]
    const vals=[[1,1,1,1],[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]
    for (let i = 0; i < 5; i++) {
      tileImages[i] = loadImage(`${path}/${imgs[i]}.png`);
      tiles.push(new Tile(tileImages[i],vals[i]))
    }
    
}
  
const DIM=10;
const width=700;
const height=700;
const cells=[];
let tiles=[];
const remaining=[];
const collapsed_cell={
    i:0,
    j:0
}
function setup() {
    createCanvas(width,height);
    for (let i = 0; i < DIM; i++) {
        const row=[]
        for (let j = 0; j < DIM; j++) {
            row.push(new Cell(tiles,i,j))
        }
        cells.push(row)
    }
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            remaining.push(cells[i][j])
        }
    }
    collapse(int(random(0,DIM)),int(random(0,DIM)))
    
}
const w = width / DIM;
    const h = height / DIM;
    
function draw() {
    // background(0);
  
    
    // for (let i = 0; i < DIM; i++) {
    //   for (let j = 0; j < DIM; j++) {
    //     const cell=cells[i][j];   
    //     if(cell.collapsed){
    //         image(tileImages[cell.final],i*h,j*w,w,h);
    //     } 
    //     else{
    //         stroke(255)
    //         textSize(32);
    //         text(cell.options.length,(i*h)+w/2,(j*w)+h/2)
    //     }
    //   }
    // }
    stroke(255)
    textSize(40);
    fill(0)
    rect(50,50,100,100)
    text(int(frameRate()),100,100)
    for(let a=0;a<100;a++){

        const [i,j]=[collapsed_cell.i,collapsed_cell.j]
        image(cells[i][j].final,i*h,j*w,w,h);
        const [ci,cj]=get_nextcell();
        if(ci==null){
            noLoop();
            break;
        }
        else collapse(ci,cj)
    }
    
}  
function collapse(ci,cj){
    collapsed_cell.i=ci;
    collapsed_cell.j=cj;
    const cell=cells[ci][cj]
    const val=random(cell.options)
    if(val==undefined)console.log(cell)
    cell.collapsed=true;
    cell.final=val.img;

    if(ci>0){
        cells[ci-1][cj].reduce_options(val,3)
    }
    if(ci<DIM-1){
        cells[ci+1][cj].reduce_options(val,1)
    }
    if(cj>0) {
        cells[ci][cj-1].reduce_options(val,0)
    }
    if(cj<DIM-1) {
        cells[ci][cj+1].reduce_options(val,2)
    }


}
function get_nextcell(){
    let minval=100;
    let nextcell_i=null,nextcell_j=null;
    for (let i=remaining.length-1;i>=0;i--) {
        const cell=remaining[i];
        if(cell.collapsed)remaining.splice(i,1);
        else{
            if(!cell.collapsed && cell.options.length<minval){
                        minval=cell.options.length;
                        nextcell_i=cell.i;
                        nextcell_j=cell.j;
        }
    }
    }
    return [nextcell_i,nextcell_j]  
}
class Cell{
    constructor(tiles,i,j){
        this.i=i;
        this.j=j;
        this.collapsed=false;
        this.options=tiles;
        this.final=null;
    }
    reduce_options(tile,dir){
        const l=tile.val.length
        this.options=this.options.filter((v)=>v.val[(dir+2)%l]==tile.val[dir])
    }
}

class Tile{
    constructor(img,val){
        this.img=img;
        this.val=val
    }
    
}