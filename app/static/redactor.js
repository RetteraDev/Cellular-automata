

// Выполняем по завершении загрузки страницы
window.addEventListener("load", function onWindowLoad() {
  let pixelData;
  var can = document.getElementById('canvas'); // Ищем элемент по id
  click1.onclick = function click1() {
      var w = document.getElementById('width1').value; // Получаем введённое значение
      can.setAttribute('width', w); // Меняем ширину canvas элемента
      var h = document.getElementById('height1').value; // Получаем введённое значение
      can.setAttribute('height', h); // Меняем ширину canvas элемента
  };

  $(document).ready(function() {
    var socket = io.connect('http://192.168.43.217:5050/');
  
    socket.on('new_cells', data => {
        // $(".wrapper").append('<li>'+"J = "+data.J+'</li>'); 
      pixelData['data'] = data['C'];

      context.putImageData(pixelData, 0, 0);
      console.log(data['C'], pixelData);
      
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
          var imageInfo = imageToC()['data'];

          // // Создаем массив прозрачности закрашенных элементов канваса и добавляем ее
          // var transparency = [];
          // var temp = [];
          // for (i = 3; i < imageInfo.length; i += 4) {
          //   temp.push(imageInfo[i]);
          //   if (temp.length == canvas.width) {
          //     transparency.push(temp);
          //     temp = [];
          //   }
          // }
          // Добавляем массив С и размеры поля в массив
          // data.push(transparency);
          data.push(imageToC()['data']);
          data.push(canvas.width);
          data.push(canvas.height);

          socket.emit('send_cellaular_json', data);
      }
      else {
          alert("Неверные данные");
      }

      
  });
});

    // Инициализируем переменные
    // Генерируем палитру в элемент #palette
    generatePalette(document.getElementById("palette"));
 
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
 
    // переменные для рисования
    context.lineCap = "round";
    context.lineWidth = 8;
 
    // вешаем обработчики на кнопки
    // очистка изображения
    document.getElementById("clear").onclick = function clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
 
    // На любое движение мыши по canvas будет выполнятся эта функция
    canvas.onmousemove = function drawIfPressed (e) {
      // в "e"  попадает экземпляр MouseEvent
      let x = e.offsetX;
      let y = e.offsetY;
      let dx = e.movementX;
      let dy = e.movementY;
 
      // Проверяем зажата ли какая-нибудь кнопка мыши
      // Если да, то рисуем
      if (e.buttons > 0) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - dx, y - dy);
        context.stroke();
        context.closePath();
      }
    };
 
    function generatePalette(palette) {
      // генерируем палитру
      // в итоге 5^3 цветов = 125
      for (let r = 0, max = 4; r <= max; r++) {
        for (let g = 0; g <= max; g++) {
          for (let b = 0; b <= max; b++) {
            let paletteBlock = document.createElement('div');
            paletteBlock.className = 'button';
            paletteBlock.addEventListener('click', function changeColor(e) {
              context.strokeStyle = e.target.style.backgroundColor;
            });
 
            paletteBlock.style.backgroundColor = (
              'rgb(' + Math.round(r * 255 / max) + ", "
              + Math.round(g * 255 / max) + ", "
              + Math.round(b * 255 / max) + ")"
            );
 
            palette.appendChild(paletteBlock);
          }
        }
      }
    }
    
    function imageToC() {
      pixelData = context.getImageData(0,0,canvas.width,canvas.height);
      return pixelData;
    }
    
});


