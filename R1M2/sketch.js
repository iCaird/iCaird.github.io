maxGrid = 12;
n = 5;
rims = [];

function setup() {
  createCanvas(400, 600);
  setupGUI();
}

function draw() {
  background(220);
  drawGrid();
  drawRims();
  updateRims();
  
  
}


function setupGUI(){
  labelEntry = createInput();
  labelEntry.elt.focus();
  labelEntry.id("labelEntry");
  labelEntry.elt.focus();
  
  enterButton = createButton("Enter");
  enterButton.mouseClicked(enter);
  enterButton.id("enterButton");
  
  undoButton = createButton("Undo");
  undoButton.mouseClicked(undo);
  
  
  resetButton = createButton("Reset");
  resetButton.mouseClicked(reset);
  
  nSelect = createSelect();
  nSelect.size(40,21);
  for(i = 1; i <= 20; i++){
    nSelect.option(i);
  }
  nSelect.selected(n);
  nSelect.changed(changeN);
  
  createP();
  
  trapButton = createButton("Trapeziums");
  trapButton.mouseClicked(makeTrap);
  
  //maybe this should be a slider
  
  
}

function drawGrid(){
  push();
  strokeWeight(0);
  fill(180);
  for(i = 0; i <= n+2; i++){
    for(j = 0; j <= n+2; j++){
      circle(10 + i * 2 * width / (n + 3), 10 + j *2 * width / (n + 3),10);
      circle(10 + (i+0.5)*2*width/(n+3),10 + (j+0.5)*2*width/(n+3),10);
    }
  }
  pop();
}



function mousePressed(){
  
  
}

function mouseReleased(){
  
}

function keyPressed(){
  console.log(keyCode);
  switch(keyCode) {
      
    case 13: //enter
      enter();
      break;
    
    default:
      console.log("DEFAULT");
      break;
  }
}

function enter(){
  //try {
    label = labelEntry.value().split(" ").map(Number);
    r = random(255);
    g = random(255);
    b = random(255);
    rim = new Rim(label,n,[r,g,b]);
    rims.push(rim);
  //}
  //catch(err){
     //errorMessage = createP("TRY AGAIN");
  //}
}

function reset(){
  rims = [];
}

function makeTrap(){
  
}

function undo(){
  
}

function changeN(){
  n = int(nSelect.value());
}

function drawRims(){
  for(rim of rims){
    rim.show();
  }
}

function updateRims(){
  for(rim of rims){
    rim.update();
  }
}

function mousePressed(){
  for(rim of rims){
    rim.checkClicked();
  }
}

function mouseReleased(){
  for(rim of rims){
    rim.released();
  }
}

// function touchStarted(){
//   mousePressed();
//   }

// function touchEnded(){
//   mouseReleased();
// }