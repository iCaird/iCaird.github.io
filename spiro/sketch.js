let theta = 0;
let R = 130;
let r = 3;
let d = 100;
let speed = 2;
let s1 = 3;
let s2 = 5;
let x,y;

let RSlider, rSlider, dSlider, speedSlider, s1Slider, s2Slider;
let sliderDiv;
let sliders = [];
let labels = ["R","r","d","S","s1","s2"];

let pLayer;
let Rtext;

let showLines = true;
let drawPoints = true;

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("sketchDiv");
  background(220);
  pointsLayer = createGraphics(800,800);
  sliderDiv = createDiv();
  sliderDiv.position(0,height-130)
           .size(130,130);
  
  // sliderDiv.style("background","red");

  RSlider = createSlider(0,width/2,width/4).parent(sliderDiv);
  
  rSlider = createSlider(0,width/2,3/5 * width/4).parent(sliderDiv);
  dSlider = createSlider(0,width/2,width/4).parent(sliderDiv);
  speedSlider = createSlider(0,5,2).parent(sliderDiv);
  s1Slider = createSlider(0,10,3).parent(sliderDiv);
  s2Slider = createSlider(0,20,2).parent(sliderDiv);

  sliders.push(RSlider, rSlider, dSlider, speedSlider, s1Slider, s2Slider);

}

function draw() {
  
  R = RSlider.value();
  r = rSlider.value();
  d = dSlider.value();
  speed = speedSlider.value();
  s1 = s1Slider.value();
  s2 = s2Slider.value();
  
  for(let i = 0; i<speed; i++){
    background(220);
    
    stroke(0);
    noFill();
    textAlign(LEFT,CENTER);
    drawSliderValues();
    
  push();
  translate(width/2,height/2);
  if(showLines) circle(0,0,2*R);
  //line(0,0,r*cos(s1*theta),r*sin(s1*theta)); //uncomment for line from center to center of outer circle
  let x1 = (R-r)*cos(s1*theta);
  let y1 = (R-r)*sin(s1*theta);

  translate(x1,y1);

  let x2 = d*cos(-s2*theta);
  let y2 = d*sin(-s2*theta);

  if(showLines) {
    line(0,0,x2,y2);
    circle(0,0,2*r);
  }
  pop();

  pointsLayer.noStroke();
  pointsLayer.colorMode(HSB);
  pointsLayer.fill((360*theta) % 360,100,100);
  if(drawPoints){
  pointsLayer.circle(width/2 + x1 + x2,height/2+y1+y2,5);
  }
  image(pointsLayer,0,0);
  
  theta += 0.005;
}
}


function keyPressed(){
  if(key == " "){
    showLines = !showLines;
  }

  if(key == "c"){
    pointsLayer.clear();
  }

  if(key == "p"){
    drawPoints = !drawPoints;
  }
}


function drawSliderValues(){
  for(let slider of sliders){
    text(`${labels[sliders.indexOf(slider)]} = ${slider.value()}`,sliderDiv.position().x + slider.position().x + sliderDiv.width ,sliderDiv.position().y + slider.position().y + RSlider.height/2);
  }
}
