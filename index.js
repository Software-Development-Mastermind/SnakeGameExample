let canvas = document.getElementById('game-canvas');
let canvasContext = canvas.getContext('2d');
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let snakedX = 10;
let snakedY = -10;
let snakeLength = 25;
let snakeWidth = 25;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function drawSnake() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(snakeX, snakeY, snakeLength, snakeWidth);

}

function snakeGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();

    if (snakeX + snakedX > canvas.width - snakeLength / 2 || snakeX + snakedX < 0) {
        //game over
        //snakedX = -snakedX;
    }
    if (snakeY + snakedY > canvas.height - snakeWidth / 2 || snakeY + snakedY < 0) {
        //snakedY = -snakedY;
        //game over;
    }

    if (rightPressed) {
        //leftPressed = false;
        snakeX += snakedX;
    } else if (leftPressed) {
        //rightPressed = false;
        snakeX -= snakedX;
    } else if (upPressed) {
        //rightPressed = false;
        snakeY += snakedY;
    } else if (downPressed) {
        //rightPressed = false;
        snakeY -= snakedY;
    }

    //snakeX += snakedX;
    // snakeY += snakedY;
}

document.addEventListener('keydown', keyDownHanlder, false);
//document.addEventListener('keyup', keyUpHanlder, false);

function keyDownHanlder(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
        leftPressed = false;
        upPressed = false;
        downPressed = false;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        rightPressed = false;
        leftPressed = true;
        upPressed = false;
        downPressed = false;
    } else if (e.key == 'Up' || e.key == 'ArrowUp') {
        rightPressed = false;
        leftPressed = false;
        upPressed = true;
        downPressed = false;
    } else if (e.key == 'Down' || e.key == 'ArrowDown') {
        rightPressed = false;
        leftPressed = false;
        upPressed = false;
        downPressed = true;
    }
}

// function keyUpHanlder(e) {
//     if (e.key == 'Right' || e.key == 'ArrowRight') {
//         rightPressed = false;
//     } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
//         leftPressed = false;
//     } else if (e.key == 'Up' || e.key == 'ArrowUp') {
//         upPressed = false;
//     } else if (e.key == 'Down' || e.key == 'ArrowDown') {
//         downPressed = false;
//     }
// }

setInterval(snakeGame, 100);