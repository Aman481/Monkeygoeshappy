//Global Variables
var monkey, monkey_running, monkeyStopping;
var banana, bananaImage;
var obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score, bananasEaten;
var bg, bgImage;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover_img,restart_img;
var gameover,restart;
var ground,ground_img1,ground_img2;
var bkground;

//function preload
function preload() {
 monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkeyStopping = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jfif");
  gameover_img = loadImage("gameover.png");
  restart_img = loadImage("restart.png");
}

//function setup
function setup() {
//scores and number of bananas eaten  
  score = 0;
  eatenbananas = 0;
  
  bkground=createSprite(0,0,600,600);
  bkground.addImage(bgImage);
  bkground.scale = 4.5

//creating canavas
  createCanvas(400, 400);
//creating new groups
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();

//Gameover and restart
  gameover = createSprite(200,200);
  gameover.addImage(gameover_img);
  
  restart = createSprite(200,350);
  restart.addImage(restart_img);
  
//scaling them 
  gameover.scale = 2.5;
  restart.scale = 0.2;
  
//Invisble ground for monkey to collide
  invisibleGround = createSprite(50, 400, 600, 10);
  invisibleGround.visible = false;
  
//creating monkey
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
}


function draw() {
  background(bgImage);
  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate()/60);
    if (monkey.isTouching(bananasGroup)) {
      bananasGroup.destroyEach();
      eatenbananas = eatenbananas + 1;
      
    }
//moving background
    bkground.velocityX = -3 
  if (bkground.x < 0){
   bkground.x = bkground.width/2;
  }
    
    obstacles();
    bananas();
//making them invisible
  gameover.visible = false;
  restart.visible = false;    
    
    if (monkey.isTouching(obstaclesGroup)) {
      gameState = END;
    }
  }

//game state = end
  if (gameState === END) {
    monkey.addImage("monkey", monkeyStopping);
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    bkground.velocity = 0;
    gameover.visible = true;
    restart.visible = true;
    obstacles.visible = false;
    bananas.visible = false;
//restarting the game
    if(mousePressedOver(restart)) {
      reset();
    }
    monkey.changeAnimation(monkey_running);
    
//lifetime for obstacles and banana
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);

  }

  if (keyDown("space") && monkey.y > 110) {
    monkey.velocityY = -13;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);



  drawSprites();

  fill(rgb(76, 0, 247));
  textSize(20);
  textFont("italic");
  text("Scores: " + score + "", 10, 50);
  textSize(15);
  textFont("bold");
  text("Eaten Bananas:" + eatenbananas, 250, 50);
  
}

//function to reset the game
function reset(){
  gameState = PLAY;  
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  score = 0;
  eatenbananas = 0;
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 390, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX = -5
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstaclesGroup.add(obstacle);
  }
}

function bananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(600,300,20,20);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 200;
    bananasGroup.add(banana);
  }
}