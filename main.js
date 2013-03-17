var stage = new Kinetic.Stage({
    container : "main",
    width:1366,
    height:667
});
var layer = new Kinetic.Layer();

var circle = new Kinetic.Circle({

    x : 20,
    y: 20,
    radius : 10,
    fill:"black",
});

var rect = new Kinetic.Rect({
  x: 220,
  y: 300,
  width: 100,
  height: 50,
  fill: 'green',
  name:"rect",
  id : "rect1"
});

var rect2 = new Kinetic.Rect({
  x: 700,
  y: 300,
  width: 100,
  height: 50,
  fill: 'green',
  name:"rect",
  id : "rect2"
});

//rect.rotateDeg(30);

layer.add(circle);
layer.add(rect);
layer.add(rect2);
stage.add(layer);

var allRects = layer.get(".rect");
var rectArray = [];

for (var i = allRects.length - 1; i >= 0; i--) {
  var obj = {};
  obj.startx = allRects[i].getX();
  obj.starty = allRects[i].getY();
  obj.stopx = allRects[i].getX()+allRects[i].getWidth();
  obj.stopy = allRects[i].getY()+allRects[i].getHeight();
  rectArray.push(obj);
};

var centreX = 0 ,
       endpoints = [
                                 {x:0,y:0,name:"up"},
                                 {x:0,y:0,name:"right"},
                                 {x:0,y:0,name:"down"},
                                 {x:0,y:0,name:"left"},
                               ],
       centreY = 0 ,
       clashX = 0,
       clashY = 0,
       currentAngle = 315,
       isClashing = true,
       booleanList = true,
       directionX = "right",
       directionY = "down";

var anim = new Kinetic.Animation(function  (frame) {

   centreX = circle.getX();
   centreX>1360 ? directionX = "left" : null ;
   centreX< 10 ? directionX = "right" : null ;
   directionX === "right" ?  circle.setX(centreX+5) : null ;
   directionX === "left" ?  circle.setX(centreX-5) : null ;

   centreY = circle.getY();
   centreY>660 ? directionY = "up" : null ;
   centreY< 10 ? directionY = "down" : null ;
   directionY === "down" ?  circle.setY(centreY+5) : null ;
   directionY === "up" ?  circle.setY(centreY-5) : null ;

   //Check Below condition for all the rectangles
   for (var i = allRects.length - 1; i >= 0; i--) {
      //Check For the Four Edges
      for (var j = 0; j < 4; j++) {

         if(allRects[i].intersects(endpoints[j].x,endpoints[j].y))
         {
            /*There's is a clash between the brick and ball*/
            console.log("Has Intersected the brick");
            changePath(endpoints[j].name);
            //anim.stop();
         }
      };

   };
   calculateEdges();
},layer);

var changePath = function  (i,name) {
  //Do Inverse
  var posObj = {x:centreX,y:centreY};

  //If true then ball hits horizontal
  if(centreX > rectArray[i].startx&&centreX < rectArray[i].stopx)
  {
    console.log("Has hit horizontal");
    directionY==="down" ? directionY = "up" : directionY==="down";
    return;
  };
  //if true then ball hits vertical
  if (centreY > rectArray[i].starty&&centreY < rectArray[i].stopy)
  {
    directionX==="right" ? directionX = "left" : directionX==="right";
    console.log("Has hit vertical");
    return
  };
}

var calculateEdges = function  () {
  for (var i = 0; i < endpoints.length; i++) {
    if(endpoints[i].name==="up")
    {
      endpoints[i].x = centreX;
      endpoints[i].y = centreY-10;
    };
    if (endpoints[i].name==="down") {
      endpoints[i].x = centreX;
      endpoints[i].y = centreY+10;
    };
    if (endpoints[i].name==="down") {
      endpoints[i].x = centreX+10;
      endpoints[i].y = centreY;
    };
    if (endpoints[i].name==="down") {
      endpoints[i].x = centreX-10;
      endpoints[i].y = centreY;
    };
  };
}
calculateEdges();
anim.start();