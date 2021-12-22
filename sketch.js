  var bg,bgImg
  var sam,samRunning,samCollided;
  var score;
  var obstGroup, obst1, obst2, obst3
  var gameOverImg,restartImg;
  var invisibleGroung;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  function preload(){
  bgImg = loadImage("assets/bg.jpg");

  samRunning = loadAnimation("assets/running-1.png","assets/running-2.png");
  samCollided = loadImage("assets/running-1.png")
  obst1 = loadImage("assets/car-obst1.png");
  obst2 = loadImage("assets/garbage-obst2.png");
  obst3 = loadImage("assets/dog-obst3.png");
  gameOverImg = loadImage("assets/gameover.jpg");
  restartImg = loadImage("assets/restart.png")

  }

  function setup() {
  createCanvas(1000,440);
  
  bg = createSprite(500,250,1000,00);
  bg.addImage("bg",bgImg);
  bg.x = bg.width /2;

  sam = createSprite(100,420,50,50);
  sam.addAnimation("running",samRunning)
  sam.scale = 0.5;

  invisibleGround = createSprite(200,430,400,10);
  invisibleGround.visible = false;

  gameOver = createSprite(500,130);
  gameOver.addImage(gameOverImg);

  restart = createSprite(500,220);
  restart.addImage(restartImg);

  gameOver.scale = 0.3;
  restart.scale = 0.3;

  obstGroup = createGroup();

  
  score = 0;
  }

  function draw() {
  background(180)
 
    //displaying score
    text("Score: "+ score, 500,50);

    if (gameState === PLAY) {
        
    gameOver.visible = false;
    restart.visible = false;

    bg.velocityX = -(1 + 1* score/500)

    //scoring
    score = score + Math.round(getFrameRate()/4);

    if (bg.x < 400){
    bg.x = bg.width/2;
    }
    
    if(keyDown("space")&& sam.y >= 100) {
    sam.velocityY = -12;
    }

    spawnObstacles()
    //add gravity
    sam.velocityY = sam.velocityY + 0.8;

    if(obstGroup.isTouching(sam)){
    gameState = END;  
    }

    } else if(gameState === END){
      gameOver.visible = true;
      restart.visible = true;  

      sam.changeImage(" samCollided ");

      if(mousePressedOver(restart)) {
        reset();
      }

      bg.velocityX = 0;
      sam.velocityY = 0

      obstGroup.setLifetimeEach(-1);
      obstGroup.setLifetimeEach(-1);


    }

    sam.collide(invisibleGround);

  drawSprites()
  }

  function reset(){

  score = 0;
  gameState = PLAY;
  obstGroup.destroyEach();
  sam.changeAnimation("running", samRunning);

  }

  function spawnObstacles(){
    if (frameCount % 60 === 0){
    var obstacle = createSprite(600,400,10,40);
    obstacle.velocityX = -(6 + score/100);
      
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
    case 1: obstacle.addImage(obst1);
    break;
    case 2: obstacle.addImage(obst2);
    break;
    case 3: obstacle.addImage(obst3);
    break;
    default: break;
    }

   //assign scale and lifetime to the obstacle           
   obstacle.scale = 0.3;
   obstacle.lifetime = 300;
   
   //add each obstacle to the group
   obstGroup.add(obstacle);
 }
}
