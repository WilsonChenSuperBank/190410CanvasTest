// var canvasDiv = document.getElementById("canvasDiv");
var canvas = document.getElementById("canvasConverse");
// var canvas = document.createElement('canvas');
// var screenwidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var canvasWidth = ($('.electronic-canvas-all').width()-4);
var canvasHeight = 200;
document.addEventListener("touchmove", onDocumentTouchMove, false);
var point = {};
point.notFirst = false;
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
// canvas.setAttribute('id', 'canvas');
// canvasDiv.appendChild(canvas);
// if (typeof G_vmlCanvasManager != "undefined") {
//   canvas = G_vmlCanvasManager.initElement(canvas);
// }
var context = canvas.getContext("2d");
/*var ptrn = context.createPattern(img, 'no-repeat');
context.fillStyle = ptrn;
context.fillRect(0, 0, canvas.width, canvas.height);
*/

var paint;

canvas.addEventListener("touchstart", function(e) {
  
  var mouseX = e.touches[0].pageX - this.offsetLeft;
  var mouseY = e.touches[0].pageY - this.offsetTop;
  paint = true;
  addClickPush(
    e.touches[0].pageX - $("#canvasConverse").offset().left,
    e.touches[0].pageY - $("#canvasConverse").offset().top
  );
  //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
  // redraw();
});

canvas.addEventListener("touchend", function(e) {
  //console.log("touch end");
  paint = false;
});

canvas.addEventListener("touchmove", function(e) {
  if (paint) {
    //console.log("touchmove");
    
    addClickPush(
      e.touches[0].pageX - $("#canvasConverse").offset().left,
      e.touches[0].pageY - $("#canvasConverse").offset().top,
      true
    );
    //console.log(e.touches[0].pageX - this.offsetLeft, e.touches[0].pageY - this.offsetTop);
    // redraw();
  }
});

canvas.addEventListener("mousedown", function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClickPush(e.pageX - $("#canvasConverse").offset().left, e.pageY - $("#canvasConverse").offset().top);
  // redraw();
});
canvas.addEventListener("mousemove", function(e) {
  
  if (paint) {
    addClickPush(e.pageX - $("#canvasConverse").offset().left, e.pageY - $("#canvasConverse").offset().top, true);
    // redraw();
  }
});
canvas.addEventListener("mouseup", function(e) {
  paint = false;
});
canvas.addEventListener("mouseleave", function(e) {
  paint = false;
});
document.getElementById("btn_clear").addEventListener("click", function() {
  canvas.width = canvas.width;
});
document.getElementById("btn_submit").addEventListener("click", function() {
  $("#electronic-imgoutput").attr("src", canvas.toDataURL("image/png"));
  controlElectronicWindow(false);
  canvas.width = canvas.width;
});
document.getElementById("open-electronic-all").addEventListener("click", function() {
  $(".electronic-canvas-all").addClass("appear");
  $(".electronic-mask").addClass("appear");
});

$(".electronic-mask").click(function(){
  controlElectronicWindow();
});

var disableScroll = function(){
  canvas.allowTouchScrolling = false;
};

var enableScroll = function(){
  canvas.allowTouchScrolling = true;
};

// canvas.on('object:moving', disableScroll);
// canvas.on('object:scaling', disableScroll);
// canvas.on('object:rotating', disableScroll);
// canvas.on('mouse:up', enableScroll);


function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    // Faking double click for touch devices
    var now = new Date().getTime();
    if (now - timeOfLastTouch < 250) {
      reset();
      return;
    }
    timeOfLastTouch = now;
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
    isMouseDown = true;
  }
  event.preventDefault();
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
  }
  event.preventDefault();
}

function onDocumentTouchEnd(event) {
  if (event.touches.length == 0) {
    event.preventDefault();
    isMouseDown = false;
  }
  event.preventDefault();
}

function addClickPush(x, y, dragging){
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var paint;

  addClick(x, y, dragging,clickX,clickY,clickDrag,paint);
  redraw(clickX,clickY,clickDrag,paint);

}



function addClick(x, y, dragging,clickX,clickY,clickDrag,paint) {
  // console.log(x);
  // console.log(y);
  // console.log(dragging);
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(clickX,clickY,clickDrag,paint) {
  //canvas.width = canvas.width; // Clears the canvas
  context.strokeStyle = "#111";
  context.lineJoin = "round";
  context.lineWidth = 1;
  while (clickX.length > 0) {
    point.bx = point.x;
    point.by = point.y;
    point.x = clickX.pop();
    point.y = clickY.pop();
    point.drag = clickDrag.pop();
    context.beginPath();
    if (point.drag && point.notFirst) {
      context.moveTo(point.bx, point.by);
    } else {
      point.notFirst = true;
      context.moveTo(point.x - 1, point.y);
    }
    context.lineTo(point.x, point.y);
    context.closePath();
    context.stroke();
  }
}

function controlElectronicWindow(ctrlBoolean){
  if(ctrlBoolean){
    console.log("Open!!");
  }
  else{
    $(".electronic-canvas-all").removeClass("appear");
    $(".electronic-mask").removeClass("appear");
  }
}
