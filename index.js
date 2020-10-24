let canvas = document.getElementById('game-canvas');
let canvasContext = canvas.getContext('2d');

const snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dX: 25,
    dY: -25,
    width: 25,
    height: 25,
    body: [],
    direction: null,
    move: function() {
        for (i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        if (this.direction === 'RIGHT') {
            this.body[0].x += this.dX;
        }
        if (this.direction === 'LEFT') {
            this.body[0].x -= this.dX;
        }
        if (this.direction === 'UP') {
            this.body[0].y += this.dY;
        }
        if (this.direction === 'DOWN') {
            this.body[0].y -= this.dY;
        }
    },
    isSnakeCollidingWithSelf: function() {
        for (let i = this.body.length - 1; i > 0; i--) {
            if (this.body[0].x > this.body[i].x - 25 && this.body[0].x < this.body[i].x + 25
                && this.body[0].y > this.body[i].y - 25 && this.body[0].y < this.body[i].y + 25) {
                return true;
            }
        }
        return false;
    },
    isSnakeCollidingWithEdge: function() {
        return this.body[0].x > borderWidth || this.body[0].x < borderX ||
            this.body[0].y > borderHeight || this.body[0].y < borderY;
    },
    isSnakeCollidingWithApple: function() {
        return snake.body[0].x > apple.x - 25 && snake.body[0].x < apple.x + 25
            && snake.body[0].y > apple.y - 25 && snake.body[0].y < apple.y + 25;
    }
}

const apple = {
    x: null,
    y: null,
    width: 25,
    height: 25,
    count: 0,
    randomizeLocation: function() {
        this.x = (Math.round(Math.floor(Math.random() * ((borderWidth - this.width) + 1) / 25) * 25) + 25);
        this.y = (Math.round(Math.floor(Math.random() * ((borderHeight - this.height) + 1) / 25) * 25) + 25);
    }
}

let borderX = 25;
let borderY = 25;
let borderWidth = 750;
let borderHeight = 550;

let isGameOver = false;
let interval;

function drawSnake() {
    for (i = snake.body.length - 1; i >= 0; i--) {
        canvasContext.fillStyle = '#b8c500';
        canvasContext.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(snake.body[i].x, snake.body[i].y, snake.width - 1, snake.height - 1);
    }
}

function drawApple() {
    canvasContext.beginPath();
    canvasContext.arc((apple.x + (apple.width / 2)), (apple.y + (apple.height / 2)), 10, 0, Math.PI * 2, false);
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
    canvasContext.fillText('Score: ' + apple.count * 10, 25, 20);

    canvasContext.font = '16px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('Apples: ' + apple.count, canvas.width - 120, 20);
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

function gameOver() {
    interval = clearInterval(interval);
    isGameOver = true;
    drawGameOver();
}

document.addEventListener('keydown', keyDownHanlder, false);

function keyDownHanlder(e) {
    if ((e.key === 'Right' || e.key === 'ArrowRight') && (snake.direction !== 'LEFT')) {
        snake.direction = 'RIGHT';
    } else if ((e.key === 'Left' || e.key === 'ArrowLeft') && (snake.direction !== 'RIGHT')) {
        snake.direction = 'LEFT';
    } else if ((e.key === 'Up' || e.key === 'ArrowUp') && (snake.direction !== 'DOWN')) {
        snake.direction = 'UP';
    } else if ((e.key === 'Down' || e.key === 'ArrowDown') && (snake.direction !== 'UP')) {
        snake.direction = 'DOWN';
    } else if ((e.key === 'Enter') && (isGameOver)) {
        isGameOver = false;
        document.location.reload();
        apple.count = 0;
    }
}

window.onload = function() {
    apple.randomizeLocation();
    snake.body.push({ x: snake.x, y: snake.y });
    drawApple();
}

function snakeGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawBorder();
    drawScore();

    if (snake.isSnakeCollidingWithApple()) {
        snake.body.push({ x: -25, y: -25 });
        apple.count++;
        apple.randomizeLocation();
        drawApple();
    }

    if (snake.isSnakeCollidingWithSelf() ||
        snake.isSnakeCollidingWithEdge()) {
        gameOver();
    };

    if (isGameOver) {
        drawGameOver();
    } else {
        drawApple();
        drawSnake();
        snake.move();
    }
}

interval = setInterval(snakeGame, 100);