class Rim {
    constructor(label,n,colour,step){
      this.label = label;
      this.n = n;
      this.colour = colour;
      this.edges = [];
      this.step = 50;
      this.generateEdges();
      this.dragging = false;
      this.rollover = false;
      this.offsetsX = [];
      this.offsetsY = []; 
      this.offsettX = [];
      this.offsettY = [];
    }
    
    pressed(){
      for(let i = 0; i < n; i++){
      let x =this.edges[i].sx;
      let y =this.edges[i].sy;
      if((x-mouseX)**2 + (y-mouseY)**2 <= 25){
        this.dragging = true;
        for(let i = 0; i < n; i++){
          this.offsetsX.push(this.edges[i].sx-mouseX);
          this.offsetsY.push(this.edges[i].sy-mouseY);
          this.offsettX.push(this.edges[i].tx-mouseX);
          this.offsettY.push(this.edges[i].ty-mouseY);
        }
        }
      }
      }
    
    show(){
      stroke(this.colour);
      for(let i = 0; i < n; i++){
        this.edges[i].show();
      }
      
    }
    
    generateEdges(){
      let sy;
      let tx;
      let ty = 0;
      
      for(let i = 0; i < n; i++){
        let sx = i*this.step;
        sy = ty;
        tx = sx + this.step;
        if (this.label.includes((i+1)%this.n)){
          ty = sy + this.step;
        }else{
          ty = sy - this.step;
        }
        
        let edge = new Edge(i,sx,sy,tx,ty);
        this.edges.push(edge);
      }
    }
    
    released() {
      this.dragging = false;
      this.offsetsX = [];
      this.offsetsY = [];
      this.offsettX = [];
      this.offsettY = [];
    }
    
    update(){
      if (this.dragging) {
        for(let i = 0; i < n; i++){
          this.edges[i].sx = mouseX + this.offsetsX[i];
          this.edges[i].sy = mouseY + this.offsetsY[i];
          this.edges[i].tx = mouseX + this.offsettX[i];
          this.edges[i].ty = mouseY + this.offsettY[i];
        }
      }
      
        
    }
  }