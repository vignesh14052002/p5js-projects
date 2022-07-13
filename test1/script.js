let c2;
let w=500;
let h=500;
let s=50;
let r=Math.floor(h/s);
let c=Math.floor(w/s);
let list=[];
let board=[];
let gap=5;
function setup(){
createCanvas(w+(c*gap),h+(r*gap));
c2=createGraphics(w,h);
background(0);
c2.background(120);
c2.ellipse(w/2,h/2,200,200);
for(let i=0;i<r;i++){ 
    let t=[];
    let k=[];
    for(let j=0;j<c;j++){
        t.push([i,j])
        k.push([i,j])
    }
    list.push(t)
    board.push(k)
}
list[r-1][c-1]=-1;
board[r-1][c-1]=-1;
//board=[...list];
//if(won())console.log("yes");
shuf();
//if(won())console.log("yes");
}
let ex=r-1;
let ey=c-1;
function isneighbour(x,y){
    if(x<r && y<c && x>=0 && y>=0){if(ex==x||ey==y){
        if(Math.abs(ex-x)==1 || Math.abs(ey-y)==1){
            return true;
        }
    }
}
    return false;
}
function swap(l,ar,ac,br,bc){
    let temp=l[ar][ac];
    l[ar][ac]=l[br][bc];
    l[br][bc]=temp;
    ex=br;
    ey=bc;
}
function shuf(){
    for(let i=0;i<10;i++){
        let rand=Math.floor(Math.random()*4)+1;
        let x=ex,y=ey;
        if(rand==1)y-=1;
        if(rand==2)x+=1;
        if(rand==3)y+=1;
        if(rand==4)x-=1;
        //console.log(rand);
        if(isneighbour(x,y)){
            swap(board,ex,ey,x,y);
        //console.log("yes")
    }
}
}
function draw(){ 
    background(0);
    for(let i=0;i<r;i++){
        for(let j=0;j<c;j++){
            if(board[i][j]==-1)continue;
            [x,y]=board[i][j]
            let sx=x*s;
            let sy=y*s;
            let dx=i*(s+gap);
            let dy=j*(s+gap);
            copy(c2,sx,sy,s,s,dx,dy,s,s);
        }
    }
    if(won()){
        console.log("won");
        noLoop();
    }
}
function mouseClicked(){
    let x=Math.floor(mouseX/s)-1;
    let y=Math.floor(mouseY/s)-1;
    console.log(x,y,ex,ey);
    if(isneighbour(x,y)){
        swap(board,ex,ey,x,y);
}
}

function won(){
    for(let i=0;i<r;i++){
        for(let j=0;j<c;j++){
            if(list[i][j][0]!=board[i][j][0]||list[i][j][1]!=board[i][j][1])return false;
        }

    }
    return true;
}