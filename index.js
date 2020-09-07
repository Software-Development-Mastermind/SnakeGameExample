let canvas = document.getElementById('game-canvas');
let canvasContext = canvas.getContext('2d');

let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakedX = 25;
let snakedY = -25;
let snakeWidth = 25;
let snakeHeight = 25;
let snake = [];

let appleX;
let appleY;
let appleWidth = 25;
let appleHeight = 25;
let apples = 0;
let appleHit = true;

let borderX = 25;
let borderY = 25;
let borderWidth = 750;
let borderHeight = 550;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let isGameOver = false;
let interval;

function drawSnake() {
    for (i = snake.length - 1; i >= 0; i--) {
        canvasContext.fillStyle = '#b8c500';
        canvasContext.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight);
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(snake[i].x, snake[i].y, snakeWidth - 1, snakeHeight - 1);
    }
}

function drawApple() {
    if (appleHit) {
        appleX = (Math.round(Math.floor(Math.random() * ((borderWidth - appleWidth) + 1) / 25) * 25) + 25);
        appleY = (Math.round(Math.floor(Math.random() * ((borderHeight - appleHeight) + 1) / 25) * 25) + 25);
        appleHit = false;
    }
    canvasContext.beginPath();
    canvasContext.arc((appleX + (appleWidth / 2)), (appleY + (appleHeight / 2)), 10, 0, Math.PI * 2, false);
    canvasContext.fillStyle = '#e02737';
    canvasContext.fill();
    canvasContext.closePath();
}

function drawBorder() {
    canvasContext.beginPath();
    canvasContext.rect(borderX, borderY, borderWidth, borderHeight);
    canvasContext.stroke();
}

function drawScore() {
    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Score: ' + apples * 10, 25, 20);

    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Apples: ' + apples, canvas.width - 120, 20);
}

function drawGameOver() {
    canvasContext.font = '48px Arial';
    canvasContext.fillStyle = '#b8c500';
    canvasContext.fillRect((borderWidth / 2) - 125, (borderHeight / 2) - 50, 315, 120);
    canvasContext.fillStyle = 'black';

    canvasContext.beginPath();
    canvasContext.rect((borderWidth / 2) - 125, (borderHeight / 2) - 50, 315, 120);
    canvasContext.stroke();
    canvasContext.closePath();

    canvasContext.fillText('GAME OVER!', (borderWidth / 2) - 120, (borderHeight / 2));
    canvasContext.fillRect((borderWidth / 2) - 60, (borderHeight / 2) + 10, 200, 55);

    canvasContext.fillStyle = '#b8c500';
    canvasContext.fillText('Hit Enter', (borderWidth / 2) - 55, (borderHeight / 2) + 55);
}

function moveSnake() {
    for (i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }

    if (rightPressed) {
        snake[0].x += snakedX;
    } else if (leftPressed) {
        snake[0].x -= snakedX;
    } else if (upPressed) {
        snake[0].y += snakedY;
    } else if (downPressed) {
        snake[0].y -= snakedY;
    }
}

function snakeCollision() {
    for (i = snake.length - 1; i > 0; i--) {
        if (snake[0].x > snake[i].x - 25 && snake[0].x < snake[i].x + 25
            && snake[0].y > snake[i].y - 25 && snake[0].y < snake[i].y + 25) {
            gameOver();
        }
    }
}

function edgeCollision() {
    if (snake[0].x > borderWidth || snake[0].x < borderX ||
        snake[0].y > borderHeight || snake[0].y < borderY) {
        gameOver();
    }
}

function appleCollision() {
    if (snake[0].x > appleX - 25 && snake[0].x < appleX + 25
        && snake[0].y > appleY - 25 && snake[0].y < appleY + 25) {
        snake.push({ x: -25, y: -25 });
        appleHit = true;
        apples++;
        drawApple();
    }
}

function collisionDetect() {
    appleCollision();
    edgeCollision();
    snakeCollision();
}

function gameOver() {
    interval = clearInterval(interval);
    isGameOver = true;
    drawGameOver();
}

document.addEventListener('keydown', keyDownHanlder, false);

function keyDownHanlder(e) {
    if ((e.key === 'Right' || e.key === 'ArrowRight') && (!leftPressed)) {
        rightPressed = true;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    } else if ((e.key === 'Left' || e.key === 'ArrowLeft') && (!rightPressed)) {
        rightPressed = false;
        leftPressed = true;
        upPressed = false;
        downPressed = false;
    } else if ((e.key === 'Up' || e.key === 'ArrowUp') && (!downPressed)) {
        rightPressed = false;
        leftPressed = false;
        upPressed = true;
        downPressed = false;
    } else if ((e.key === 'Down' || e.key === 'ArrowDown') && (!upPressed)) {
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = true;
    } else if ((e.key === 'Enter') && (isGameOver)) {
        isGameOver = false;
        document.location.reload();
        apples = 0;
    }
}

window.onload = function() {
    snake.push({ x: snakeX, y: snakeY });
    drawApple();
}

function snakeGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBorder();
    drawScore();
    collisionDetect();

    if (isGameOver) {
        drawGameOver();
    } else {
        drawApple();
        drawSnake();
        moveSnake();
    }
}

interval = setInterval(snakeGame, 100);