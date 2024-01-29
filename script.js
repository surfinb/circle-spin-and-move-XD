"use strict"

// grabbing the canvas element in the html and making it a "2d context" so i can draw shit on it
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// declaring variables n shit
const centerX = canvas.width/2,centerY = canvas.height/2;
var dist = distanceFromCenter(x, y);
var ang = angleFromCenter(x, y);
var x = 250, y = 250, objAng = 0, speed = 1, objDis = 100;
var actX = 350, actY = 411;
let WASD = [0,0,0,0];

//give this function a position and it will calculate the distance from the center and round it up to the closest integer
function distanceFromCenter(x2, y2) {
  var dist2 = Math.sqrt((x2 - centerX) ** 2 + (y2 - centerY) ** 2);
  dist2 = Math.round(dist2);
  return dist2;
}

//this function calculates the angle. the result is in radians which gets converted to degrees and rounded up.
function angleFromCenter(x2, y2) {
  var angle = Math.atan2(y2 - centerY, x2 - centerX) * 180 / Math.PI;
  angle = Math.round(angle);
  if (angle < 0) {
    angle += 360;
  }
  return angle;
}

// this draws a green circle in the center
function center() {
	ctx.beginPath();
	ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
	ctx.fillStyle = "green";
	ctx.fill();
}

//this draws the red circle
function circle() {
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2, );
  ctx.fillStyle = "red";
  ctx.fill();
}

//this finds the new location for the red circle by calculating the distance and angle from the center
function move() {
  dist = distanceFromCenter(x, y);
  ang = angleFromCenter(x, y);
  objAng += speed;
  x = centerX + Math.cos(objAng * Math.PI / 180) * objDis;
  y = centerY + Math.sin(objAng * Math.PI / 180) * objDis;
  
}

//this function calls a bunch of other functions and executes them every frame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  center();
  move();
  circle();
  playerMove()
  objAng = objAng % 360;
  if (objAng < 0) {
    objAng += 360;
  }
  requestAnimationFrame(draw);
}

// this takes the red circle's location and increments/decrements the position based on what keys are pressed(WASD)
// it then uses the distance and angleFromCenter function to calculate what the distance and angle would be from the center
// the result is assigned to the red circle
function playerMove(){
let tempx = x;
let tempy = y;
if(WASD[0] == 1){
tempy-= 5;
objDis = distanceFromCenter(tempx, tempy);
objAng = angleFromCenter(tempx, tempy);
}
if(WASD[1] == 1){
  tempx-= 5;
  objDis = distanceFromCenter(tempx, tempy);
  objAng = angleFromCenter(tempx, tempy);
}
if(WASD[2] == 1){
  tempy+= 5;
  objDis = distanceFromCenter(tempx, tempy);
  objAng = angleFromCenter(tempx, tempy);
}
if(WASD[3] == 1){
  tempx+= 5;
  objDis = distanceFromCenter(tempx, tempy);
  objAng = angleFromCenter(tempx, tempy);
}

}
// here the draw function gets activated
draw();


// this thing registers what keys are being pressed, like E,Q and WASD
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "e":
      speed = 1;
      break;
    case "q":
      speed = -1;
      break;
      case "w":
       WASD[0] = 1;
        break;
      case "a":
        WASD[1] = 1;
        break;
        case "s":
          WASD[2] = 1;
        break;
        case "d":
          WASD[3] = 1;
        break;
  }
});

// this one registers when i let go of keys, also press spacebar to log shit in the console( for testing)
document.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "e":
      speed = 0;
      break;
      case "t":
        speed = 1;
        break;
      case "q":
        speed = 0;
        break;
        case " ":
          console.log(WASD);
      console.log(x,y);
      console.log(objDis);
      console.log(objAng);
      console.log(`The distance between the center and the location is ${dist} pixels.`);
      console.log(`The angle between the center and the location is ${ang} degrees.`);
      break;
      case "w":
        WASD[0] = 0;
         break;
       case "a":
         WASD[1] = 0;
         break;
         case "s":
           WASD[2] = 0;
         break;
         case "d":
           WASD[3] = 0;
         break;
  }
});


