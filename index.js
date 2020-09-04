let canvas = document.getElementById('game-canvas');
let canvasContext = canvas.getContext('2d');
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakedX = 25;
let snakedY = -25;
let snakeLength = 25;
let snakeWidth = 25;

let score = 0;
let applesHit = 0;

let interval;

let snake = [];

let appleX = 200;
let appleY = 225;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

window.onload = function() {
    snake.push({ x: snakeX, y: snakeY });
    console.log(snake);
}

function drawApple() {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(appleX, appleY, 25, 25);
}

function drawSnake() {
    for (i = snake.length - 1; i >= 0; i--) {
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(snake[i].x, snake[i].y, snakeLength, snakeWidth);
    }
}

function drawScore() {
    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Score: ' + score, 8, 20);

}

function drawAppleHits() {
    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Apples Hit: ' + applesHit, canvas.width - 110, 20);
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
    if (snake[0].x > canvas.width || snake[0].x < 0) {
        gameOver();
    }
    if (snake[0].y > canvas.height || snake[0].y < 0) {
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
        applesHit++;
        score += 10;
    }
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
    }

}


interval = setInterval(snakeGame, 100);


    // if (snake[0].x + snakedX > canvas.width - snakeLength / 2 || snake[0].x + snakedX < 0) {
    //     gameOver();
    // }
    // if (snake[0].y + snakedY > canvas.height - snakeWidth / 2 || snake[0].y + snakedY < 0) {
    //     gameOver();
    // }