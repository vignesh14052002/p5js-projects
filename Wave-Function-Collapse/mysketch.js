const tileImages = [];
function preload() {
    const path = './tiles/demo';
    const imgs=["blank","down","left","right","up"]
    const vals=[[1,1,1,1],[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]
    for (let i = 0; i < 5; i++) {
      tileImages[i] = loadImage(`${path}/${imgs[i]}.png`);
      tiles.push(new Tile(i,vals[i]))
    }
}

const DIM=30;
const width=700;
const height=700;
const cells=[];
const tiles=[];
let minpos=[];
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
    collapse(int(random(0,DIM)),int(random(0,DIM)))
    
}
function draw() {
    // background(0);
  
    const w = width / DIM;
    const h = height / DIM;
    
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
    const [i,j]=[collapsed_cell.i,collapsed_cell.j]
    image(tileImages[cells[i][j].final],i*h,j*w,w,h);
    const [ci,cj]=get_nextcell();
    if(ci==null || ci==undefined)noLoop();
    else collapse(ci,cj)
    
}  
function collapse(ci,cj){
    collapsed_cell.i=ci;
    collapsed_cell.j=cj;
    const cell=cells[ci][cj]
    const val=random(cell.options)
    if(val==undefined)console.log(cell)
    cell.collapsed=true;
    cell.final=val.index;

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
    //let nextcell_i=null,nextcell_j=null;
    let offset=[[0,1],[1,0],[0,-1],[-1,0]]
    for (const off of offset) {
        let [oi,oj]=off
        let [ci,cj]=[collapsed_cell.i+oi,collapsed_cell.j+oj]
        if(ci>=0 && ci<DIM && cj>=0 && cj<DIM){
            if(!cells[ci][cj].collapsed && minpos.indexOf(cells[ci][cj])==-1){
                minpos.push(cells[ci][cj])
            }
        }
    }
    //minpos=minpos.filter((v)=>v.options.length)
    if(minpos[0].options.length>minpos[1].options.length)
    minpos.sort((a,b)=>a.options.length-b.options.length)
    let cell=minpos.shift()
    
    let [nextcell_i,nextcell_j]=[cell.i,cell.j]
    // for (let i = 0; i < DIM; i++) {
    //     for (let j = 0; j < DIM; j++) {
    //       const cell=cells[i][j];
    //       if(!cell.collapsed && cell.options.length<minval){
    //         minval=cell.options.length;
    //         nextcell_i=i;
    //         nextcell_j=j;
    //       }   
    //     }
    // }
    return [nextcell_i,nextcell_j]  
}
class Cell{
    constructor(tiles,i,j){
        this.i=i;
        this.j=j;
        this.collapsed=false;
        this.options=tiles;
        this.final=null;
        this.reduced=false;
    }
    reduce_options(tile,dir){
        const l=tile.val.length
        if(!this.reduced)this.options=this.options.filter((v)=>v.val[(dir+2)%l]==tile.val[dir])
        this.reduced=true;
    }
}

class Tile{
    constructor(i,val){
        this.index=i;
        this.val=val
    }
}