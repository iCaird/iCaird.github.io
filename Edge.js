class Edge{
    constructor(index,sx,sy,tx,ty){
      this.index = index;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
    }
    
    show(){
      line(this.sx,this.sy,this.tx,this.ty);
      circle(this.tx,this.ty,10);
      circle(this.sx,this.sy,10);
         
      
      
   
    }
  }