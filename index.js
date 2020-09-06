let canvas = document.getElementById('game-canvas');
let canvasContext = canvas.getContext('2d');
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakedX = 25;
let snakedY = -25;
let snakeWidth = 25;
let snakeHeight = 25;

let borderX = 25;
let borderY = 25;
let borderWidth = 750;
let borderHeight = 550;

let score = 0;
let applesHit = 0;

let interval;

let snake = [];

let appleHit = true;
let appleX;
let appleY;
let appleWidth = 25;
let appleHeight = 25;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

window.onload = function() {
    snake.push({ x: snakeX, y: snakeY });
    drawApple();
}

function drawBorder() {
    canvasContext.beginPath();
    canvasContext.rect(borderX, borderY, borderWidth, borderHeight);
    canvasContext.stroke();
}

function drawApple() {
    if (appleHit) {
        appleX = (Math.round(Math.floor(Math.random() * ((borderWidth - appleWidth) + 1) / 25) * 25) + 25);
        appleY = (Math.round(Math.floor(Math.random() * ((borderHeight - appleHeight) + 1) / 25) * 25) + 25);
        appleHit = false;
    }
    canvasContext.beginPath();
    canvasContext.arc((appleX + (appleWidth / 2)), (appleY + (appleHeight / 2)), 10, 0, Math.PI * 2, false);
    canvasContext.fillStyle = 'red';
    canvasContext.fill();
    canvasContext.closePath();
}

function drawSnake() {
    for (i = snake.length - 1; i >= 0; i--) {
        canvasContext.fillStyle = '#b8c500';
        canvasContext.fillRect(snake[i].x, snake[i].y, snakeWidth, snakeHeight);
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(snake[i].x, snake[i].y, snakeWidth - 1, snakeHeight - 1);
    }
}

function drawScore() {
    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Score: ' + score, 25, 20);

}

function drawAppleHits() {
    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Apples Hit: ' + applesHit, canvas.width - 140, 20);
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



function snakeGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBorder();
    drawScore();
    drawAppleHits();
    drawApple();
    moveSnake();
    drawSnake();
    collisionDetect();

}

function collisionDetect() {
    appleCollision();
    edgeCollision();
    snakeCollision();
}

function snakeCollision() {
    for (i = snake.length - 1; i > 0; i--) {
        if (snake[0].x > snake[i].x - 25 && snake[0].x < snake[i].x + 25
            && snake[0].y > snake[i].y - 25 && snake[0].y < snake[i].y + 25) {
            gameOver();
        }
    }
}

function gameOver() {
    alert('Game Over');
    document.location.reload();
    interval = clearInterval(interval);
    applesHit = 0;
    score = 0;
}

function edgeCollision() {
    if (snake[0].x > borderWidth || snake[0].x < borderX) {
        gameOver();
    }
    if (snake[0].y > borderHeight || snake[0].y < borderY) {
        gameOver();
    }
}

function appleCollision() {
    if (snake[0].x > appleX - 25 && snake[0].x < appleX + 25
        && snake[0].y > appleY - 25 && snake[0].y < appleY + 25) {
        if (rightPressed) {
            snake.push({ x: snake[snake.length - 1].x - snakedX, y: snake[snake.length - 1].y });
        } else if (leftPressed) {
            snake.push({ x: snake[snake.length - 1].x + snakedX, y: snake[snake.length - 1].y });
        } else if (upPressed) {
            snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y - snakedY });
        } else if (downPressed) {
            snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y + snakedY });
        }
        appleHit = true;
        applesHit++;
        score += 10;
        drawApple();
    }
}


document.addEventListener('keydown', keyDownHanlder, false);

function keyDownHanlder(e) {
    console.log(e.key);
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
    }
}

interval = setInterval(snakeGame, 100);