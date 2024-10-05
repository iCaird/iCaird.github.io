let liams;
let level = 1;
let bossLevel = 5;
let maxLevels = 5;
let images = ["alex.png","liam.png","jenny.png"];
let alex,liam,jenny;
let bossLiam;
let gameOver = false;
let finalTime;

function preload() {
  soundFormats("mp3", "wav");
  popSound = loadSound("assets/pop.mp3");
  music = loadSound("assets/music.mp3");
  laugh = loadSound("assets/bossLaugh.mp3");
  bossHit = loadSound("assets/bossHit.wav");
  winSound = loadSound("assets/winSound.wav");

  alex = loadImage("assets/alex.png");
  liam = loadImage("assets/liam.png");
  jenny = loadImage("assets/jenny.png");
}

function setup() {
  textAlign(CENTER);
  music.loop();
  winSound.playMode("untilDone");
  angleMode(RADIANS);

  createCanvas(window.innerWidth, window.innerHeight);
  alex.resize(0,150);
  jenny.resize(0,150);
  liam.resize(0,150 );
  //image(alex,0,0);
  
  //image(liam,0,0);
  //image(jenny,0,0);
  liams = new Group();
  //liams.w = 170;
  liams.h = 100;
  liams.bounciness = 1;
  liams.friction = 0;
  liams.debug = false;

  makeBoundaries();

  makeLiams();
}

function draw() {
  background(220);

  checkClicked();
  textSize(32);
  if(gameOver){
    music.stop();
    winSound.play();
    
    text(`Your time: ${finalTime}`, width/2,height/2);
    if (finalTime < localStorage.getItem("highScore") || !localStorage.getItem("highScore")) {
      console.log(localStorage.getItem("highScore"));
      localStorage.setItem("highScore", finalTime);
    } 
  
  }else{
    text(floor(millis()/1000),30,50);
    }
  text("Best time: " + localStorage.getItem("highScore"),width-150,50);

  if (liams.length == 0 && !gameOver) {
    level++;
    
    if(level > maxLevels){
      gameOver = true;
      finalTime = floor(millis())/1000;
      
    }
    else if (level == bossLevel) {
      
      makeLiams();
      makeBoss();
    } else{
      makeLiams();
    }
  }
  
}

function makeLiams() {
  liams.removeAll();

  for (let i = 0; i < level; i++) {
    let liam = new liams.Sprite(random(0, width), random(0, height));

    let angle = random(0, TWO_PI);
    let x = random(1, 5) * cos(angle);
    let y = random(1, 5) * sin(angle);
    liam.vel.x = x;
    liam.vel.y = y;
    liam.health = 1;
    liam.img = `assets/${random(images)}`;
    liam.width = liam.img.width;
  }
}

function makeBoss() {
  bossLiam = new liams.Sprite(random(0, width), random(0, height));

  let angle = random(0, TWO_PI);
  let x = random(1, 5) * cos(angle);
  let y = random(1, 5) * sin(angle);
  bossLiam.vel.x = x;
  bossLiam.vel.y = y;
  bossLiam.scale = 3;
  bossLiam.height = bossLiam.scale*150;;
  
  bossLiam.health = 10;
  bossLiam.img = `assets/${random(images)}`;
  bossLiam.width = bossLiam.scale*bossLiam.img.width;
  laugh.play();
}

function checkClicked() {
  let hov = false;
  for (let liam of liams) {
    console.log(liam.health);
    if (liam.mouse.hovering()) {
      hov = true;
    }
    if (liam.mouse.presses()) {
      liam.health--;
      if(liam == bossLiam){
        bossHit.play();
      }
      if(liam.health == 0){
        liam.remove();
        popSound.play();
      }
    }
  }
  if (hov) {
    mouse.cursor = "grab";
  } else {
    mouse.cursor = "default";
  }
}

function makeBoundaries() {
  boundaries = new Group();
  boundaries.collider = "kinetic";

  walls = new boundaries.Group();
  walls.height = height;
  walls.width = 10;
  walls.y = height / 2;

  let left = new walls.Sprite();
  left.x = 0;

  let right = new walls.Sprite();
  right.x = width;

  floorCeil = new boundaries.Group();
  floorCeil.width = width;
  floorCeil.height = 10;
  floorCeil.x = width / 2;

  let floor = new floorCeil.Sprite();
  floor.y = height;

  let ceil = new floorCeil.Sprite();
  ceil.y = 0;
}
