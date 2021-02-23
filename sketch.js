var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.1;
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.scale=0.5;
  invisibleground = createSprite(400,350,900,10);
  console.log(ground.x)
  var survivalTime=0;
  bGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {
  background(220);
  if(gameState===PLAY){
    stroke("white");
    textSize(20);
    fill("white");
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time:"+ survivalTime, 100, 50);
    if(keyDown("space")&&monkey.y>=209){
      monkey.velocityY=-12;
    }
    if(monkey.isTouching(bGroup)){
      bGroup.destroyEach();
    }
    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0){
       ground.x = ground.width/2;
    }
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
    monkey.collide(invisibleground);
    banana();
    obstacle();
  } else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bGroup.setLifetimeEach(-1);
  }
  drawSprites();
}

function banana(){
  if (frameCount % 60 === 0) {
    var b = createSprite(600,120,40,10);
    b.y = Math.round(random(300,20));
    b.addImage(bananaImage);
    b.scale = 0.1;
    b.velocityX = -3;
    b.lifetime = 200;
    bGroup.add(b);
  }  
}
function obstacle(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(500,326,10,40);
    obstacle.addImage(obstaceImage);           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.velocityX=-4;
    obstaclesGroup.add(obstacle);
  }
}






