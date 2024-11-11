const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

// Параметры холста
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2; // Центр холста по X
const centerY = height / 2; // Центр холста по Y

// Параметр R
const R = 100; // Задаем произвольное значение для R


// Функция для рисования координатных осей и подписей
function drawAxis() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Горизонтальная ось
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);

    // Вертикальная ось
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);

    // Рисуем оси
    ctx.stroke();

    // Добавляем стрелки на концах осей
    drawArrow(width, centerY, "x", "R");  // Стрелка на конце оси X
    drawArrow(centerX, 0, "y" ,"R");      // Стрелка на конце оси Y

    // Подписи для осей
    ctx.fillStyle = "black";
    ctx.font = "13px Arial";

    // Добавляем метки и линии на оси X и Y
    addLabelsAndPoints(R);
}

// Функция для добавления подписей и точек на координатных осях
function addLabelsAndPoints(R) {
    // Подписи и линии на осях X и Y
    drawPoint(centerX + R, centerY, "R");          // Метка на R справа
    drawPoint(centerX + R / 2, centerY, "R/2");    // Метка на R/2 справа
    drawPoint(centerX - R, centerY, "-R");         // Метка на -R слева
    drawPoint(centerX - R / 2, centerY, "-R/2");   // Метка на -R/2 слева
    drawPoint(centerX, centerY - R, "R");          // Метка на R сверху
    drawPoint(centerX, centerY - R / 2, "R/2");    // Метка на R/2 сверху
    drawPoint(centerX, centerY + R, "-R");         // Метка на -R снизу
    drawPoint(centerX, centerY + R / 2, "-R/2");   // Метка на -R/2 снизу
}

function drawArrow(x, y, axis, label) {
    const arrowSize = 10; // Длина и ширина стрелки
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (axis === "x") {
        // Стрелка на оси X
        ctx.moveTo(x, y);                   // Начальная точка (конец оси X)
        ctx.lineTo(x - arrowSize, y - arrowSize / 2); // Левая линия стрелки
        ctx.moveTo(x, y);                   // Снова начальная точка
        ctx.lineTo(x - arrowSize, y + arrowSize / 2); // Правая линия стрелки
    } else if (axis === "y") {
        // Стрелка на оси Y
        ctx.moveTo(x, y);                   // Начальная точка (конец оси Y)
        ctx.lineTo(x - arrowSize / 2, y + arrowSize); // Левая линия стрелки
        ctx.moveTo(x, y);                   // Снова начальная точка
        ctx.lineTo(x + arrowSize / 2, y + arrowSize); // Правая линия стрелки

    }
    if (y === centerY) {
        ctx.fillText(label, x - 10, y - 10); // Подпись над линией (для оси X)
    } else if (x === centerX) {
        ctx.fillText(label, x + 7, y + 10);  // Подпись рядом с линией (для оси Y)
    }
    ctx.stroke(); // Отображаем стрелку
}

//label - пометка
// Функция для рисования линии и метки на заданной позиции
function drawPoint(x, y, label) {
    ctx.beginPath();
    ctx.strokeStyle = "black";         // Цвет линии — черный
    ctx.lineWidth = 2;                 // Толщина линии

    // Автоматическое определение, рисовать вертикальную или горизонтальную линию
    if (y === centerY) {
        // Рисуем небольшую горизонтальную линию на оси X
        ctx.moveTo(x, y - 5); // Линия идет вверх и вниз от оси
        ctx.lineTo(x, y + 5);
    } else if (x === centerX) {
        // Рисуем небольшую вертикальную линию на оси Y
        ctx.moveTo(x - 5, y); // Линия идет влево и вправо от оси
        ctx.lineTo(x + 5, y);
    }

    ctx.stroke(); // Отображаем линию

    // Добавляем подпись рядом с линией
    ctx.fillStyle = "black";           // Цвет подписи — черный

    // Подпись рядом с линией: смещение зависит от типа линии
    if (y === centerY) {
        ctx.fillText(label, x - 5, y - 10); // Подпись над линией (для оси X)
    } else if (x === centerX) {
        ctx.fillText(label, x + 7, y + 5);  // Подпись рядом с линией (для оси Y)
    }
}

// Функция для рисования области фигуры
function drawShape(R) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; // Полупрозрачный синий цвет

    // Рисование квадрата
    ctx.moveTo(centerX, centerY); // Центр координат
    ctx.lineTo(centerX - R, centerY); // Влево на -R по X
    ctx.lineTo(centerX - R, centerY + R); // Вниз на +R по Y
    ctx.lineTo(centerX, centerY + R); // Вправо до центра

    // Рисование треугольника (левый верхний квадрант)
    ctx.moveTo(centerX, centerY); // Центр координат
    ctx.lineTo(centerX + R, centerY); // Влево на -R по X
    ctx.lineTo(centerX, centerY - R); // Вверх на -R по Y

    // Рисование четверти окружности (правый нижний квадрант)
    ctx.moveTo(centerX, centerY); // Центр координат
    ctx.arc(centerX, centerY, R, 0, Math.PI / 2, false); // Четверть круга в четвертом квадранте

    // Закрыть путь и залить
    ctx.closePath();
    ctx.fill();
}

// Рисуем координатные оси с метками и точками
drawAxis();

// Рисуем объединенную область с параметром R
drawShape(R);
canvas.style.border = "none";