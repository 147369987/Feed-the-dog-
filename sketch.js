var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed , lastfed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bgImg = loadImage("bg.jpg")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed Dog");
  feed.position(700,95);
  feed.mousePressed(FeedDog);

}

function draw() {
  background(bgImg);
  foodObj.display();
 

 
  drawSprites();
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastfed=data.val();
  })
  fill("black");
  textSize(35);
  if(lastfed>=12){
    text("Last Fed : "+ lastfed%12 + " PM", 150,35);
   }else if(lastfed==0){
     text("Last Fed : 12 AM",150,35);
   }else{
     text("Last Fed : "+ lastfed + " AM", 150,35);
   }
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}




  function FeedDog() {
    dog.addImage(happyDog);
  
    foodObj.deductFood(foodStock);
    database.ref("/").update({
      food: foodStock,
      feedTime: hour()
    })
  }



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
