n = 8;
k = 3;
let max = 20;
//label = [1,4,5];
let label = [];
let rims = [];
let entry1;
let button;
let resetR;
let weightSlider;
let stepSlider;
let select;

function setup() {
  createCanvas(500,500);
  weightSlider = createSlider(0, 10, 2);
  entry1 = createInput();
  button = createButton("Enter");
  resetR = createButton("Reset");
  select = createSelect();
  for(i = 1; i <= max; i++){
    select.option(i);
  }
  select.changed(selectEvent);
  button.mouseClicked(buttonClicked);
  resetR.mouseClicked(resetRims);
  rim = new Rim(label,n,[255,0,0]);
  rim2 = new Rim([1,2,5],n,[0,255,0])
  rim3 = new Rim([1,2,3],n,[0,0,255]);
  
}

function draw() {
  background(220);
  //translate((width-n*rim.step)/2,height/2);
  stroke(173, 3, 252);
  let sw = weightSlider.value();
  strokeWeight(sw);
  for (rim of rims){
    rim.update();
    rim.show();
  }
}

function mousePressed(){
 for(rim of rims){
   rim.pressed();
 }
}

function mouseReleased(){
  for(rim of rims){
    rim.released();
  }
}

function buttonClicked(){
  label = (entry1.value().split("").map(Number));
  rims.push(new Rim(label,n,[0,0,255]));
}

function selectEvent(){
  n = select.value();
}

function resetRims(){
  rims = [];
}
