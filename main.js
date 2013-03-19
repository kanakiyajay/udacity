var stage = new Kinetic.Stage({
    container : "main",
    width:1366,
    height:667
});

var door = new Kinetic.Circle({
  x : 900,
  y:  600,
  radius : 20,
  fill : "blue"
});
var layer = new Kinetic.Layer();
var layer2 = new Kinetic.Layer();

var circle = new Kinetic.Circle({

    x : 20,
    y: 20,
    radius : 9,
    fill:"black",
});

var rect = new Kinetic.Rect({
  x: 220,
  y: 300,
  width: 100,
  height: 50,
  fill: 'brown',
  name:"rect",
  id : "rect1"
});

var rect2 = new Kinetic.Rect({
  x: 600,
  y: 300,
  width: 100,
  height: 50,
  fill: 'green',
  name:"rect",
  id : "rect2"
});

var rect3 = new Kinetic.Rect({
  x: 400,
  y: 100,
  width: 100,
  height: 50,
  draggable : true,
  fill: 'yellow',
  name:"rect",
  id : "rect3",
  dragBoundFunc: function(pos) {
          return {
            x: pos.x,
            y: this.getAbsolutePosition().y
          }
        }
});

rect3.on('mouseover', function() {
    document.body.style.cursor = 'move';
});
rect3.on('mouseout', function() {
    document.body.style.cursor = 'default';
});

var rect4 = new Kinetic.Rect({
  x: 400,
  y: 500,
  width: 100,
  height: 50,
  fill: 'green',
  name:"rect",
  id : "rect4"
});
//rect.rotateDeg(30);
//Layer2 Contains the ball
layer2.add(circle);
layer.add(rect);
layer.add(rect2);
layer.add(rect3);
layer.add(rect4);
layer.add(door);
stage.add(layer2);
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
      timecount = 0,
       timeclash = 0,
       endpoints = [
                                 {x:0,y:0,name:"up"},
                                 {x:0,y:0,name:"right"},
                                 {x:0,y:0,name:"down"},
                                 {x:0,y:0,name:"left"},
                               ],
       centreY = 0 ,
       totalRect =allRects.length ,
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
   directionX === "right" ?  circle.setX(centreX+4) : null ;
   directionX === "left" ?  circle.setX(centreX-4) : null ;

   centreY = circle.getY();
   centreY>660 ? directionY = "up" : null ;
   centreY< 10 ? directionY = "down" : null ;
   directionY === "down" ?  circle.setY(centreY+4) : null ;
   directionY === "up" ?  circle.setY(centreY-4) : null ;

   //For General TimeDIfference
   if (frame.timeDiff>18) {
   //For Clashing Time Difference
     if (door.intersects(centreX,centreY)) {
        anim.stop();
        alert("You Have Won the Game");
     };
   if (frame.time>timeclash+200) {
   //Check Below condition for all the rectangles
     for (var i = 0; i < allRects.length; i++) {
        //Check For the Four Edges
           if(allRects[i].intersects(centreX,centreY))
           {
              /*There's is a clash between the brick and ball*/
              console.log("Has Intersected the brick");
              timeclash = frame.time;
              //console.log(timeclash);
              calculateEdges(function(){
                  for (var j = 0; j < endpoints.length; j++){
                    //Only one point wont be intersecting.
                    if (!allRects[i].intersects(endpoints[j])) {
                      console.log(endpoints[j].name);
                      changePath(endpoints[j].name);
                      //anim.stop();
                    };
                  };
              });
           }
     };
   };
   };
},layer2);

var changePath = function  (name) {

  name==="left"||name==="right"? directionX = name : directionY = name ;

}

var calculateEdges = function  (done) {
  for (var i = 0; i < endpoints.length; i++) {
    switch(endpoints[i].name)
      {
      case "up":
        endpoints[i].x = centreX;
        endpoints[i].y = centreY-10;
        break;
      case "down":
        endpoints[i].x = centreX;
        endpoints[i].y = centreY+10;
        break;
      case "right" :
        endpoints[i].x = centreX+10;
        endpoints[i].y = centreY;
        break;
      default:
        endpoints[i].x = centreX-10;
        endpoints[i].y = centreY;
      }
  };
  done();
}

anim.start();