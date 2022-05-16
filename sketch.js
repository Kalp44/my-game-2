var path, mainCar;
var player1, player2, player3, player4;
var pathImg, mainRacerImg1, mainRacerImg2;

var oppPink1Img, oppPink2Img;
var oppYellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;
var crime1Img, crime2Img;
var gameOverImg, cycleBell;

var pinkCG, yellowCG, redCG, crimeCG;

/*var ep1, ep2, ep3, p1, p2, p3;*/

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation(
    "images/police.png",
    "images/abc.png"
  );
  mainRacerImg2 = loadAnimation("images/mainpolice.png");

  oppPink1Img = loadAnimation("opponent1.png", "opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");

  oppYellow1Img = loadAnimation("opponent4.png", "opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");

  oppRed1Img = loadAnimation("opponent7.png", "opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  crime1Img = loadAnimation("images/thief.png", "images/def.png");
  crime2Img = loadAnimation("images/mainThief.png");

  cycleBell = loadSound("sound/siren.mp3");
  gameOverImg = loadImage("gameOver.png");

  /*ep1 = loadImage("images/extraP1.png");
  ep2 = loadImage("images/extraP2.png");
  ep3 = loadImage("images/extraP3.png");*/
}

function setup() {
  createCanvas(1200, 300);
  // Moving background

  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCar = createSprite(70, 150);
  mainCar.addAnimation("SahilRunning", mainRacerImg1);
  mainCar.scale = 0.5;

  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

 /* p1 = createSprite(100,mainCar.y+90);
  p1.addImage(ep1);
  p1.scale = 0.3;
  p1.visible = false;

  p2 = createSprite(140,mainCar.y-50);
  p2.addImage(ep2);
  p2.scale = 0.3;
  p2.visible = false;

  p3 = createSprite(320,mainCar.y+20);
  p3.addImage(ep3);
  p3.scale = 0.3;
  p3.visible = false;*/

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  crimeCG = new Group ()
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 900, 30);

  if (gameState === PLAY) {
    distance = distance + Math.round(getFrameRate() / 50);
    path.velocityX = -(6 + (2 * distance) / 150);

    mainCar.y = World.mouseY;

    edges = createEdgeSprites();
    mainCar.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }

    //code to play cycle bell sound
   /* if (keyDown("space")) {
      cycleBell.play();
    }*/cycleBell.play(gameState = PLAY);
       cycleBell.loop = true;
       cycleBell.scale=-7;
    //creating continous opponent players
    var select_oppPlayer = 1;

    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        thiefCar();
     // } else if (select_oppPlayer == 2) {
        yellowCyclists();
    //  } else if (select_oppPlayer == 3){
        redCyclists();
    //  } else  {
       pinkCyclists();
      }
    }
    if (crimeCG.isTouching(mainCar)) {
      gameState = END;
      player4.scale = 0.25;
      player4.velocityY = 0;
      player4.addAnimation("opponentPlayer4", crime2Img);
    }
    if (pinkCG.isTouching(mainCar)) {
    pinkCG.destroyEach();
    
   //   gameState = END;
    player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1", oppPink2Img);
    }

    if (yellowCG.isTouching(mainCar)) {
    yellowCG.destroyEach();
     // gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2", oppYellow2Img);
    }

    if (redCG.isTouching(mainCar)) {
    redCG.destroyEach();
     // gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3", oppRed2Img);
    }

    
  } else if (gameState === END) {
    gameOver.visible = true;
    /*p1.visible = true;
    p2.visible = true;
    p3.visible = true;*/
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500, 200);

    path.velocityX = 0;
    mainCar.velocityY = 0;
    mainCar.addAnimation("SahilRunning", mainRacerImg2);

    


    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);

    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);

    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    crimeCG.setVelocityXEach(0);
    crimeCG.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }
  }
}

function pinkCyclists() {
  player1 = createSprite(1400, Math.round(random(50, 250)));
  player1.scale = 0.06;
  player1.velocityX = -(6 + (2 * distance) / 150);
  player1.addAnimation("opponentPlayer1", oppPink1Img);
  player1.setLifetime = 170;
  pinkCG.add(player1);
}

function yellowCyclists() {
  player2 = createSprite(1600, Math.round(random(50, 250)));
  player2.scale = 0.2;
  player2.velocityX = -(6 + (2 * distance) / 150);
  player2.addAnimation("opponentPlayer2", oppYellow1Img);
  player2.setLifetime = 170;
  yellowCG.add(player2);
}

function redCyclists() {
  player3 = createSprite(1900, Math.round(random(50, 250)));
  player3.scale = 0.06;
  player3.velocityX = -(6 + (2 * distance) / 150);
  player3.addAnimation("opponentPlayer3", oppRed1Img);
  player3.setLifetime = 170;
  redCG.add(player3);
}



function thiefCar() {
  player4 = createSprite(1100, Math.round(random(50, 250)));
  player4.scale = 0.17;
  player4.velocityX = -(6 + (2 * distance) / 150);
  player4.addAnimation("opponentPlayer4", crime1Img);
  player4.setLifetime = 170;
  crimeCG.add(player4);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  /*p1.visible = false;
  p2.visible = false;
  p3.visible = false;*/
  mainCar.addAnimation("SahilRunning", mainRacerImg1);

  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  crimeCG.destroyEach();
  
  distance = 0;
}
