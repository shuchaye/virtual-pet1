var dog,sadDog,happyDog,database;
var foods,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;


function preload(){
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happyDog.png");

}

	


function setup() {
	createCanvas(100, 400);
  database = firebase.database();

  foodObj = new foodObj();

  foodStock = database.ref('Food');
  foodStock.on("value,readStock");

  dog = createSprite(800,200,150,150);
  dog = addImage(sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed the dog");
feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("AddFood");
  addFood.position(800,95);

  addFood.mousePressed(addFoods);
}


function draw() {  
 background(46,139,87);
 foodObj.display();

 fedTime = database.ref('FeedTime');
 fedTime.on("value",function(data) {
    lastFed = data.val()
  });

  Fil(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("last Feed:"+lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed:12 AM",350,30);
  }else{
    text("Last Feed:"+ lastFed+"AM",350,30);
  }
  
 drawSprites();
}

//function to read foodStock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to updatefood stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}else{
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
}
database.ref("/").update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
  //function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
     food:foodS 
    })
  }
  

    function readPosition(data){
      position = data.val();
      console.log(position);
      dog.x = position.x;
      dog.y = position.y;
    }

    function showError(){
      console.log("showerror");
    }



