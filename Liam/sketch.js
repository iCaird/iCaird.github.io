let box;


let liams = [];


function setup() {
  createCanvas(800, 800);

  

  for(i = 0; i < 30; i++){
  box = new Sprite(random(0,800),random(-50,0),20,20);
  box.img = "assets/liamcropped.png";
  box.scale = 0.5;
  box.vel.y = random(1,10);
  liams.push(box);
    }

  test = new Sprite(200,200,20,20);
}

function draw() {
  background(220);

  for(let liam of liams){
    if(liam.y - 40 > 800){
      liam.y = -40;
    
    }
  }


}
