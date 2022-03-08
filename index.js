const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,

    }
}
let snake1 = initSnake("purple");
let snake2 = initSnake("blue");
let snake3 = initSnake("orange");

let apple = {
    color: "red",
    position: initPosition(),
}

let app2 = {
    color: "red",
    position: initPosition(),
}
function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
function drawsanke(ctx , x,y){
        const image = new Image();
        image.src = "https://thumbs.dreamstime.com/b/snake-icon-isolated-white-background-snake-icon-isolated-white-background-simple-vector-logo-173925536.jpg";
        ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }else if(snake.color == snake2.color) {
        scoreCanvas = document.getElementById("score2Board");
    }else{
        scoreCanvas = document.getElementById("score3Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawsanke(ctx, snake1.head.x, snake1.head.y, snake1.color);
        for (let i = 1; i < snake1.body.length; i++) {
            drawsanke(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }
        drawCell(ctx, snake2.head.x, snake2.head.y, snake2.color);
        for (let i = 1; i < snake2.body.length; i++) {
            drawCell(ctx, snake2.body[i].x, snake2.body[i].y, snake2.color);
        }
        drawCell(ctx, snake3.head.x, snake3.head.y, snake3.color);
        for (let i = 1; i < snake3.body.length; i++) {
            drawCell(ctx, snake3.body[i].x, snake3.body[i].y, snake3.color);
        }
        
        let app = document.getElementById("apple");
        ctx.drawImage(app, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.drawImage(app, app2.position.x * CELL_SIZE, app2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        drawScore(snake1);
        drawScore(snake2);
        drawScore(snake3);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }else if(snake.head.x == app2.position.x && snake.head.y == app2.position.y){
        app2.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        alert("Game over");
        snake1 = initSnake("purple");
        snake2 = initSnake("blue");
        snake3 = initSnake("green");
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1, snake2,snake3])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }

    if (event.key === "a") {
        turn(snake2, DIRECTION.LEFT);
    } else if (event.key === "d") {
        turn(snake2, DIRECTION.RIGHT);
    } else if (event.key === "w") {
        turn(snake2, DIRECTION.UP);
    } else if (event.key === "s") {
        turn(snake2, DIRECTION.DOWN);
    }
    if (event.key === "j") {
        turn(snake3, DIRECTION.LEFT);
    } else if (event.key === "l") {
        turn(snake3, DIRECTION.RIGHT);
    } else if (event.key === "i") {
        turn(snake3, DIRECTION.UP);
    } else if (event.key === "k") {
        turn(snake3, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
    move(snake2);
    move(snake3)
}

initGame();