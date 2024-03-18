let maxGrid = 12;
let n = 5;
let rims = [];

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


function setupGUI() {
  labelEntry = createInput();
  labelEntry.elt.focus();
  labelEntry.id("labelEntry");
  labelEntry.elt.focus();

  enterButton = createButton("Enter");
  enterButton.mouseClicked(enter);
  enterButton.id("enterButton");

  undoButton = createButton("Undo");
  undoButton.mouseClicked(() => rims.pop());


  resetButton = createButton("Reset");
  resetButton.mouseClicked(() => rims = []);

  nSelect = createSelect();
  nSelect.size(40, 21);
  for (i = 1; i <= 20; i++) {
    nSelect.option(i);
  }
  nSelect.selected(n);
  nSelect.changed(() => n = int(nSelect.value()));

  createP();

  trapButton = createButton("Trapeziums");
  trapButton.mouseClicked(makeTrap);

  //maybe this should be a slider


}

function drawGrid() {
  push();
  strokeWeight(0);
  fill(180);
  for (let i = 0; i <= n + 2; i++) {
    for (let j = 0; j <= n + 2; j++) {
      circle(10 + i * 2 * width / (n + 3), 10 + j * 2 * width / (n + 3), 10);
      circle(10 + (i + 0.5) * 2 * width / (n + 3), 10 + (j + 0.5) * 2 * width / (n + 3), 10);
    }
  }
  pop();
}



function mousePressed() {


}

function mouseReleased() {

}

function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {

    case 13: //enter
      enter();
      break;

    case 67: //c
      cycleSelectedRims();
      break;
    default:
      console.log("DEFAULT");
      break;
  }
}

function enter() {

  let label = labelEntry.value().split(" ").map(Number);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let rim = new Rim(label, n, [r, g, b]);
  rims.push(rim);
}
  

function cycleSelectedRims(){
  for(let rim of rims){
    if(rim.clicked) {
      console.log("CYCLING: " + rim);
      rim.cycle();
    }
  }
}


function makeTrap() {

}

function rimAction(callback) {
  for (let rim of rims) {
    callback(rim);
  }
}

function drawRims() {
  rimAction((rim) => rim.show());
}

function updateRims() {
  rimAction((rim) => rim.update());
}

function mousePressed() {
  rimAction((rim) => rim.checkClicked());
}

function mouseReleased() {
  rimAction((rim) => rim.released());
}



function touchStarted(){
  mousePressed();
  }

function touchEnded(){
  mouseReleased();
}


function hom(m,n){
  let mLabel = m.label;
  let nLabel = n.label;

  let mys = [];
  let count = 0;
  mys[0] = 0;
  for(let i=1; i <= n; i++){
    if( mLabel.includes[i]){
      console.log("INCLUDES!");
      count -= 1;
      mys.push(count);
    }else{
      count += 1;
      mys.push(count);
    }
  }
  console.log(mys);
}