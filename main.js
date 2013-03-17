var stage = new Kinetic.Stage({
    container : "main",
    width:1366,
    height:667
});
var layer = new Kinetic.Layer();

var circle = new Kinetic.Circle({

    x : 20,
    y: 20,
    radius : 20,
    fill:"red",
    stroke:"black",
    strokeWidth:1
});

layer.add(circle);
stage.add(layer);

var currentX = 0 ,
       currentY = 0 ,
       directionX = "right",
       directionY = "down";

var anim = new Kinetic.Animation(function  (frame) {

   currentX = circle.getX();
   currentX>1360 ? directionX = "left" : null ;
   currentX< 10 ? directionX = "right" : null ;
   directionX === "right" ?  circle.setX(currentX+5) : null ;
   directionX === "left" ?  circle.setX(currentX-5) : null ;

   currentY = circle.getY();
   currentY>660 ? directionY = "up" : null ;
   currentY< 10 ? directionY = "down" : null ;
   directionY === "down" ?  circle.setY(currentY+5) : null ;
   directionY === "up" ?  circle.setY(currentY-5) : null ;

},layer);

anim.start();