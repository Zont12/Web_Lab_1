const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

const R = 100;

function drawAxis() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);

    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);

    ctx.stroke();

    drawArrow(width, centerY, "x", "R");
    drawArrow(centerX, 0, "y" ,"R");

    ctx.fillStyle = "black";
    ctx.font = "13px Arial";

    addLabelsAndPoints(R);
}

function addLabelsAndPoints(R) {
    drawPoint(centerX + R, centerY, "R");
    drawPoint(centerX + R / 2, centerY, "R/2");
    drawPoint(centerX - R, centerY, "-R");
    drawPoint(centerX - R / 2, centerY, "-R/2");
    drawPoint(centerX, centerY - R, "R");
    drawPoint(centerX, centerY - R / 2, "R/2");
    drawPoint(centerX, centerY + R, "-R");
    drawPoint(centerX, centerY + R / 2, "-R/2");
}

function drawArrow(x, y, axis, label) {
    const arrowSize = 10;
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (axis === "x") {
        ctx.moveTo(x, y);
        ctx.lineTo(x - arrowSize, y - arrowSize / 2);
        ctx.moveTo(x, y);
        ctx.lineTo(x - arrowSize, y + arrowSize / 2);
    } else if (axis === "y") {
        ctx.moveTo(x, y);
        ctx.lineTo(x - arrowSize / 2, y + arrowSize);
        ctx.moveTo(x, y);
        ctx.lineTo(x + arrowSize / 2, y + arrowSize);
    }
    if (y === centerY) {
        ctx.fillText(label, x - 10, y - 10);
    } else if (x === centerX) {
        ctx.fillText(label, x + 7, y + 10);
    }
    ctx.stroke();
}

function drawPoint(x, y, label) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    if (y === centerY) {
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x, y + 5);
    } else if (x === centerX) {
        ctx.moveTo(x - 5, y);
        ctx.lineTo(x + 5, y);
    }

    ctx.stroke();

    ctx.fillStyle = "black";

    if (y === centerY) {
        ctx.fillText(label, x - 5, y - 10);
    } else if (x === centerX) {
        ctx.fillText(label, x + 7, y + 5);
    }
}

function drawShape(R) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - R, centerY);
    ctx.lineTo(centerX - R, centerY + R);
    ctx.lineTo(centerX, centerY + R);

    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + R, centerY);
    ctx.lineTo(centerX, centerY - R);

    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, R, 0, Math.PI / 2, false);

    ctx.closePath();
    ctx.fill();
}

drawAxis();
drawShape(R);
canvas.style.border = "none";
