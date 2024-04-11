let box;
let floor, ceiling, left,right;
let cont;
let liams;
let circ = [];
let hov = false;
let alive = 1;
let level = 1;
let first = true;
let endmsg;


function preload(){
  popSound = loadSound("assets/pop.mp3");
  music = loadSound("assets/music.mp3");
  
  
}
function setup() {
  music.playMode("untilDone");
  music.play();
  createCanvas(800, 800);
  textSize(32);
  angleMode(RADIANS);
  liams = [];
  cont = new Sprite(width/2, height/2 + 40,200,34);
cont.text = "continue";
cont.visible = false;

  for(i = 0; i < alive; i++){
  box = new Sprite(random(0,width),random(0,height));
  box.img = "assets/liamcropped.png";
  let angle = random(0,TWO_PI);
  let y = random(1,5)*sin(angle);
  let x = random(1,5)*cos(angle);
  box.w = 170;
  box.h = 210;
  box.color = "red";
  box.scale = 0.5;
  box.vel.y = y;
  box.vel.x = x;
  box.bounciness = 1;
  box.friction = 0;
  box.debug = false;
  liams.push(box);
  circ.push([x,y])
    }

 

  floor = new Sprite(width/2,height,800,10);
  floor.collider = "kinematic";
  floor.bounciness = 1;
  floor.friction = 0;
  
  ceiling = new Sprite(width/2,0,800,10);
  ceiling.collider = "kinematic";
  ceiling.bounciness = 1;
  ceiling.friction = 0;
  
  left = new Sprite(0,height/2,10,800);
  left.collider = "kinematic";
  left.bounciness = 1;
  left.friction = 0;

  right = new Sprite(width,height/2,10,800);
  right.collider = "kinematic";
  right.bounciness = 1;
  right.friction = 0;
}

function draw() {
  background(220);
  mouse.cursor = "default";
  for(let liam of liams){
    if(liam.mouse.hovering()){
      hov = true;
      break;
    } else{
      hov = false;
    }
  }

  for(let liam of liams){
    if(liam.mouse.pressing()){
      popSound.play();
      liam.life = 0;
      alive -= 1;
    }
  }
  if(hov) mouse.cursor = "grab";
  console.log(hov);

  if(alive == 0){
    if(first){
    textAlign(CENTER);
    textSize(32);
    text("Liam has been vanquished... or has he?", width/2,height/2);
    endmsg = new Sprite(width/2, height/2,600,34);
    endmsg.text = "Liam has been vanquished... or has he?";
    cont.visible = true;
    
    cont.debug = false;
    first = false;
    }

    
  }

  if(cont.mouse.pressing()){
    cont.colour = "green";
    cont.life = 0;
    endmsg.life = 0;
    level++;
    alive = level;
    first = true;
    setup();
  }
}


