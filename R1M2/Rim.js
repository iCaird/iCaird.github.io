class Rim{
  constructor(label,n,colour){
    this.label = label;
    this.n = n;
    this.colour = colour;
    
    this.startPos = createVector(20,height/2);
    this.points = [];
    this.points[0] = this.startPos;
    this.step = width/(this.n+3);
    this.generatePoints();

    this.clicked = false;
    this.dragging = false;
    this.offset = [];
  }
  
  
  show(){
    noFill();
    stroke(this.colour);
    strokeWeight(2);
    beginShape();
    for(point of this.points){
      vertex(point.x,point.y);
      push();
      
      fill(this.colour);
      circle(point.x,point.y,10);
      pop();
    }
    endShape();
  }
  
  update(){
    if (this.dragging){
      for(point of this.points){
        point.set(mouseX + this.offset[this.points.indexOf(point)].x,mouseY + this.offset[this.points.indexOf(point)].y);
      }
    }
  }
  
  generatePoints(){
    for(i = 1; i < this.n+1; i++){
      let x,y,nextPoint;
      x = this.points[i-1].x + this.step;

      if(this.label.includes(i)){
        y = this.points[i-1].y + this.step;
      } else {
        y = this.points[i-1].y - this.step;
      }
      nextPoint = createVector(x,y);
      this.points.push(nextPoint);
    }
  }

  checkClicked(){
    for(point of this.points){
      if((point.x - mouseX)**2 + (point.y - mouseY)**2 <= 25){
        this.clicked = !this.clicked;
        this.dragging = true;
        for(point of this.points){
          this.offset.push(createVector(point.x-mouseX,point.y-mouseY));
        }
      }
    }
  }

  released(){
    this.dragging = false;
    this.offset = [];
  }
}

//test
