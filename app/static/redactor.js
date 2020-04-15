// Выполняем по завершении загрузки страницы
window.addEventListener("load", function onWindowLoad() {
  
  can = document.getElementById('canvas'); // Ищем элемент по id

  document.getElementById("resize").onclick = function resize() {
      var w = document.getElementById('width').value; // Получаем введённое значение
      can.setAttribute('width', w); // Меняем ширину canvas элемента
      var h = document.getElementById('height').value; // Получаем введённое значение
      can.setAttribute('height', h); // Меняем ширину canvas элемента
  };

  $(document).ready(function() {
    var socket = io.connect('http://192.168.43.217:5050/');

    socket.on('new_cells', data => {

      // var C = new Uint8ClampedArray(data.C);
      var data = new ImageData(data.C, canvas.width, canvas.height);

      ctx.putImageData(data, 0, 0);

      delete data;
    });

  $('.JSON_form').on('click', function(event) {
      event.preventDefault();
      
      if (validateForm()) {
          // Сериализуем форму
          var D = document.forms["Start"]["D"].value;
          var h = document.forms["Start"]["h"].value;
          var delta_T = document.forms["Start"]["delta_T"].value;
          var steps = document.forms["Start"]["steps"].value;

          var data = [ D, h, delta_T, steps];

          // Получаем массив информации о изображении
          data.push(imageToC()['data']);
          data.push(canvas.width);
          data.push(canvas.height);

          console.log(data);
          socket.emit('send_cellaular_json', data);
          delete data;
      }
      else {
          alert("Неверные данные");
      }

      
  });
});

    // Выводим концентрацию
    $('#canvas').mousemove(function(e) {
      var pos = findPos(this);
      var x = e.pageX - pos.x;
      var y = e.pageY - pos.y;
      var coord = "x=" + x + ", y=" + y;
      var c = this.getContext('2d');
      var p = c.getImageData(x, y, 1, 1).data; 
      $('#status').html(coord + "<br>" + p[3]);
    });

    // Отслеживаем положение мыши
    function findPos(obj) {
      var curleft = 0, curtop = 0;
      if (obj.offsetParent) {
          do {
              curleft += obj.offsetLeft;
              curtop += obj.offsetTop;
          } while (obj = obj.offsetParent);
          return { x: curleft, y: curtop };
      }
      return undefined;
    }

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var lastX;
var lastY;
var strokeColor="red";
var strokeWidth=5;
var mouseX;
var mouseY;
var isMouseDown=false;
var brush_mode="pen";
ctx.lineCap = "round";


function handleMouseDown(e){
  ctx.lineWidth = document.getElementById('brush_size').value;
  ctx.lineCap = brush_type;
  mouseX=parseInt(e.offsetX);
  mouseY=parseInt(e.offsetY);

  // Put your mousedown stuff here
  lastX=mouseX;
  lastY=mouseY;
  isMouseDown=true;
}

function handleMouseUp(e){
  mouseX=parseInt(e.offsetX);
  mouseY=parseInt(e.offsetY);

  // Put your mouseup stuff here
  isMouseDown=false;
}
function handleMouseOut(e){
  mouseX=parseInt(e.offsetX);
  mouseY=parseInt(e.offsetY);

  // Put your mouseOut stuff here
  isMouseDown=false;
}
function handleMouseMove(e){
  mouseX=parseInt(e.offsetX);
  mouseY=parseInt(e.offsetY);

  // Put your mousemove stuff here
  if(isMouseDown){
    ctx.beginPath();
    if(brush_mode=="pen"){
      ctx.globalCompositeOperation="source-over";
      ctx.moveTo(lastX,lastY);
      ctx.lineTo(mouseX,mouseY);
      ctx.stroke();     
    }else{
      ctx.globalCompositeOperation="destination-out";
      ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
      ctx.fill();
    }
    lastX=mouseX;
    lastY=mouseY;
  }
}

$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

$("#pen").click(function(){ brush_mode="pen"; });
$("#eraser").click(function(){ brush_mode="eraser"; });

$("#round").click(function(){ ctx.lineCap="round"; });
$("#square").click(function(){ ctx.lineCap="square"; });

    function imageToC() {
      var pixelData = ctx.getImageData(0,0,canvas.width,canvas.height);
      return pixelData;
    }
    
});


