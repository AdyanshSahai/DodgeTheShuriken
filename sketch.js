var player;
var groundImg, ground;
var missile,missileImg;
var grimReaper, grimReaperImg
var score = 0;
var q,w;
var time = 500;
var gameOver, gameOverImg;
var gameState = 'play';
var resetButton, resetButtonImg;
var death, checkPoint;
var backtrack;

/*  
Loads images, sprites, etc.
It is only run once.
*/
function preload(){
  groundImg = loadImage('ground2.png');
  gameOverImg = loadImage('GameOver.png');
  missileImg = loadImage('Missile.png');
  resetButtonImg = loadImage('ResetButton.png');
  grimReaperImg = loadImage('GrimReaper.png');
  death = loadSound('Death.m4a');
  checkPoint = loadSound('checkPoint.mp3');
  backtrack = loadSound('backingTrack.mp3');
}

/*
This loads the main parts of the game and defines sprites better.
It is also run once.
*/
function setup(){
  createCanvas(windowWidth, windowHeight);

  ground = createSprite(width/2-125,height-10);
  ground.addImage(groundImg);
  ground.scale = 0.75;

  player = createSprite(25, height-17.5, 20, 20);
  player.shapeColor = 'green';
  q = createSprite(0,height/2,1,height);
  w = createSprite(width,height/2,1,height);
  q.visible = false;
  w.visible = false;

  backtrack.play();
  backtrack.setVolume(0.25);

  gameOver = createSprite(width/2, height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
 
  missiles = new Group();

  missile = createSprite(random(1,width));
  missile.addImage(missileImg);
  missile.velocityY = 5;
  missiles.add(missile);

  resetButton = createSprite(width/2, height/2 + height/7);
  resetButton.addImage(resetButtonImg);
  resetButton.scale = 0.075;

  grimReaper = createSprite(width/2+width/3, height/2+height/3);
  grimReaper.addImage(grimReaperImg);
  grimReaper.scale = 0.075;
}

/*
This function runs the game and contains all interactions.
It also calls functions that I have written, such as spawn() and reset().
It is run repeatedly throughout the game.
*/
function draw(){
 
  if(time >= 50){
    time = time-25;
  }

  player.collide(q);
  player.collide(w);

  //player
  //player movement
  if(gameState == 'play'){
    background(255);

    score += 0.25
    fill(75)
    textSize(15);
    text('Score: '+ Math.round(score), 15, 25);

    player.visible= true;
    gameOver.visible = false;
    resetButton.visible = false;
    grimReaper.visible = false;

    if (keyDown(RIGHT_ARROW)){
      player.x += 5;
    }
    else if (keyDown(LEFT_ARROW)){
      player.x -= 5;
    }

    if(score%100 == 0){
      checkPoint.play();
    }

    //death
    if (player.isTouching(missiles)){
      gameState = 'end';
      death.play();
    }
    spawn();
    missiles.setRotationSpeedEach(5);
  }
  if(gameState == 'end'){
    backtrack.stop();

    player.visible = false;
    gameOver.visible = true;
    resetButton.visible = true;
    grimReaper.visible = true;
    grimReaper.scale += 0.0075;

    if(mousePressedOver(resetButton)){
      reset();
    }

    background(30);

    fill('white');
    textSize(15);
    text('Score: '+ Math.round(score), 15, 25);
    missiles.destroyEach()
  }
  drawSprites();
}

/*
resets the game when the reset button is pressed (in the end) 
*/
function reset(){
  score = 0;
  gameState = 'play';
  grimReaper.scale = 0.075;
  backtrack.play();
  backtrack.setVolume(0.25);
}

/*
Spawns missiles
*/
function spawn(){
  if(frameCount%time == 0){
    missile = createSprite(random(1,width));
    missile.addImage(missileImg);
    missile.velocityY = 5+(score/10);
    missiles.add(missile);
    missiles.setColliderEach('circle');
  }
}