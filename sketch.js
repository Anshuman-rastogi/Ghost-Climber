var PLAY=1;

var OVER=0;
var gameState=PLAY;

var ghost, ghostImage, tower, towerImage;

var door, doorImage, climber, climberImage, doorsGroup, climbersGroup;

var invisibleBlock, invisibleBlocksGroup, spookySound;

var score=0;

function preload() {
  
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  tower.scale=1.1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlocksGroup=new Group();
  
  ghost=createSprite(300,300);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;

  

  fill("yellow");
}

function draw() {
  background("black");
  
if(gameState===PLAY){
  if(tower.y>400){
     tower.y=300;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5; 
  }  
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(keyDown(LEFT_ARROW)){
   ghost.x=ghost.x-3; 
  } 
  
  if(keyDown(RIGHT_ARROW)){
   ghost.x=ghost.x+3; 
  } 
  
  if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0; 
   } 
  
  score=score+Math.round(getFrameRate()/60);
  
  
  if(ghost.y>600 || invisibleBlocksGroup.isTouching(ghost)){
    gameState=OVER; 
  } 
  
  spawnDoor();
  
   drawSprites();
  textSize(20);
  text("Score:"+score,450,30);
  
} else if(gameState===OVER){
  ghost.destroy();
  textSize(40);
  text("Game Over", 200,300);
}
  
}

function spawnDoor() {
 if(frameCount%240===0){ 
    door=createSprite(300,-30);
    door.addImage(doorImage);
    door.velocityY=1;
   
    door.x=Math.round(random(130,440));
    door.lifetime=800;
   
   doorsGroup.add(door);
   
   climber=createSprite(300,30);
   climber.addImage(climberImage);
   climber.x=door.x;
   climber.velocityY=1;
   climber.lifetime=800;
   
   climbersGroup.add(climber);
   
   door.depth=ghost.depth;
      
   climber.depth=ghost.depth;
   ghost.depth=ghost.depth+=1;
   
   invisibleBlock=createSprite(300,35);
   invisibleBlock.width=climber.width;
   invisibleBlock.height=2;
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=1;
   invisibleBlock.debug=true;
   invisibleBlock.lifetime=800;
   
   invisibleBlocksGroup.add(invisibleBlock);
 }
}