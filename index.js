const CELL_SIZE = 20
const CANVAS_SIZE = 600
const CANVAS_SIZE_NYAWA = 600
const CELL_SIZE_NYAWA = 20
const REDRAW_INTERVAL = 50
const WIDTH = CANVAS_SIZE / CELL_SIZE
const HEIGHT = CANVAS_SIZE / CELL_SIZE
var audio = new Audio('./gameover.mp3');
var audiolevel = new Audio('./levelup.mp3');
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
}
let MOVE_INTERVAL = 100

function initPosition () {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
  }
}

function initHeadAndBody () {
  let head = initPosition()
  let body = [{ x: head.x, y: head.y }]
  return {
    head: head,
    body: body
  }
}

function initDirection () {
  return Math.floor(Math.random() * 4)
}

function initSnake (sorce, bdn) {
  return {
    src: sorce,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    badan: bdn,
    nyawa1 :3,
    level : 1,
  }
}
let snake1 = initSnake(
  'https://cdn4.iconfinder.com/data/icons/nuuline-fill-animals/150/animal_head_face_cartoon-23-512.png',
  './snake-kor.JPG'
)

let apple = {
  color: 'red',
  position: initPosition()
}

let app2 = {
  color: 'red',
  position: initPosition()
}

let nyawa = {
  position: initPosition(),
  status : false
}
let balok = {
  position: initbalok(),
  status : false
}


function drawCell (ctx, x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}
function drawsanke (ctx, x, y, sorce) {
  const image = new Image()
  image.src = sorce
  ctx.drawImage(image, x * CELL_SIZE , y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}
function drawlipe (ctx, x, y,stat) {
  const image = new Image()
  image.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/1200px-Love_Heart_symbol.svg.png"
  if(stat == true){     
      ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
  }

}
function initbalok(){
return{
  x:9,
  y:10
}
}

function levelup(snake){
  if(snake.score % 5 == 0 ){
    MOVE_INTERVAL = MOVE_INTERVAL - 15
    snake.level = snake.level + 1
    balok.status = true
    if(snake.level <5){
    alert("Level " + snake.level + " complete")
    audiolevel.play()
    }
  }
}
function drawblok(ctx,x,y,level){
  const image = new Image()
  image.src = "https://e7.pngegg.com/pngimages/69/467/png-clipart-cube-computer-icons-three-dimensional-space-ice-block-angle-rectangle.png"
  for(let i =0 ; i <=5; i++){
          if(level == 2){
            ctx.drawImage(image,(x+i)*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE)  
            ctx.drawImage(image,(x+i)*CELL_SIZE,(y+5)*CELL_SIZE,CELL_SIZE,CELL_SIZE)
          }else if(level == 3){
            ctx.drawImage(image,(x+i)*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE)
            ctx.drawImage(image,(x+i)*CELL_SIZE,(y+5)*CELL_SIZE,CELL_SIZE,CELL_SIZE)
            ctx.drawImage(image,(x+i)*CELL_SIZE,(y+10)*CELL_SIZE,CELL_SIZE,CELL_SIZE)
          }else if(level == 4){
            ctx.drawImage(image,x*CELL_SIZE,(y+i)*CELL_SIZE,CELL_SIZE,CELL_SIZE)
            ctx.drawImage(image,(x+14)*CELL_SIZE,(y+i)*CELL_SIZE,CELL_SIZE,CELL_SIZE)
          }
        }
}
function drawScore (snake) {
  let scoreCanvas
  scoreCanvas = document.getElementById('score1Board')
  let scoreCtx = scoreCanvas.getContext('2d')
  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  scoreCtx.font = '20px Arial'
  scoreCtx.fillStyle = 'red'
  scoreCtx.fillText("Level: "+snake.level, 10,30)
  scoreCtx.fillStyle = 'blue'
  scoreCtx.fillText(snake.score, 5, scoreCanvas.scrollHeight/1.2)
}
function drawLife (snake) {
  let life = document.getElementById('life')
  const scoreCanvas = document.getElementById('nyawa1')
  let scoreCtx = scoreCanvas.getContext('2d')
  scoreCtx.clearRect(0, 0, CANVAS_SIZE_NYAWA,CELL_SIZE_NYAWA)
  let lebar = 1;
  let tinggi = 1;
  let a = snake.nyawa1;
  for(let i = 0; i < a; i++){
    scoreCtx.drawImage(life,lebar,tinggi,20,20)
    lebar = lebar +29
  }
}


function draw(){
  setInterval(function () {
    let snakeCanvas = document.getElementById('snakeBoard')
    let ctx = snakeCanvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    drawsanke(ctx, snake1.head.x, snake1.head.y, snake1.src)
    for (let i = 1; i < snake1.body.length; i++) {
      drawsanke(ctx, snake1.body[i].x, snake1.body[i].y, snake1.badan)
    }

    let app = document.getElementById('apple')
    ctx.drawImage(
      app,
      apple.position.x * CELL_SIZE,
      apple.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
      )
    ctx.drawImage(
      app,
      app2.position.x * CELL_SIZE,
      app2.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
      )
      drawblok(ctx,balok.position.x, balok.position.y,snake1.level) 
      drawScore(snake1)
      drawLife(snake1)
      setInterval(function () {
        drawlipe(ctx, nyawa.position.x, nyawa.position.y,nyawa.status)
      },1000)
      
    }, REDRAW_INTERVAL)
  }
function teleport (snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0
  }
  
}

function cekbalok(snake){
  if(snake.level == 2){
  for(let i = 0; i <= 5; i++){
  if ((snake.head.x == (balok.position.x+i) && snake.head.y == balok.position.y)|| (snake.head.x == (balok.position.x+i) && snake.head.y == (balok.position.y+5)) && balok.status == true){
    for(let j = 1; j < snake.body.length; j++){
    snake.body.pop()
    if(snake.body.length > 1){
      snake.body.pop() 
      }
    }
}
}
  }else if( snake.level == 3){
    for(let i = 0; i <= 5; i++){
      if ((snake.head.x == (balok.position.x+i) && snake.head.y == balok.position.y)|| (snake.head.x == (balok.position.x+i) && snake.head.y == (balok.position.y+5)) || (snake.head.x == (balok.position.x+i) && snake.head.y == (balok.position.y+10)) && balok.status == true){
        for(let j = 1; j < snake.body.length; j++){
        snake.body.pop()
        if(snake.body.length > 1){
          snake.body.pop() 
          }
        }
    }
    }
  }else if(snake.level == 4){
    for(let i = 0; i <= 5; i++){
      if ((snake.head.x == balok.position.x && snake.head.y == (balok.position.y+i)|| snake.head.x == (balok.position.x+14) && snake.head.y == (balok.position.y+i))  && balok.status == true){
        for(let j = 1; j < snake.body.length; j++){
        snake.body.pop()
        if(snake.body.length > 0){
          snake.body.pop() 
          }
        }
    }
    }
  }
}

function cekbalokcollecsion(snake){
  let isCollide = false
  if(snake.level == 2){
  for(let i = 0; i <= 5; i++){
    if ((snake.head.x == (balok.position.x+i) && snake.head.y == balok.position.y)|| (snake.head.x == (balok.position.x+i) && snake.head.y == (balok.position.y+5)) && balok.status == true){
      cekbalok(snake)
      snake.nyawa1--
      snake.head = initPosition()
      if(snake.nyawa1 == 0){
        isCollide = true
      }
    }
  }
}else if(snake.level == 3){
  for(let i = 0; i <= 5; i++){
    if ((snake.head.x == (balok.position.x+i) && snake.head.y == balok.position.y)|| (snake.head.x == (balok.position.x+i) && snake.head.y == (balok.position.y+5)) || (snake.head.x == (balok.position.x+i) && snake.head.y == (balok.position.y+10)) && balok.status == true){
      cekbalok(snake)
      snake.nyawa1--
      snake.head = initPosition()
      if(snake.nyawa1 == 0){
        isCollide = true
      }
    }
  }
}else if(snake.level == 4){
  for(let i = 0; i <= 5; i++){
    if ((snake.head.x == balok.position.x && snake.head.y == (balok.position.y+i))|| (snake.head.x == (balok.position.x+14) && snake.head.y == (balok.position.y+i))  && balok.status == true){
      cekbalok(snake)
      snake.nyawa1--
      snake.head = initPosition()
      if(snake.nyawa1 == 0){
        isCollide = true
      }
    }
  }
}
return isCollide

}
function eat (snake, apple) {
cekbalok(snake)
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition()
    snake.score++
    levelup(snake)
    snake.body.push({ x: snake.head.x, y: snake.head.y })
    if((snake.score % 2 != 0 && snake.score >1) || snake.score == 2){
      nyawa.status = true
      if(nyawa.status == true){
      setTimeout(function(){
      cekbalok(snake)
      nyawa.position = initPosition()
        nyawa.status = false
      },3000)
    }
    }else{
      setTimeout(function(){
        nyawa.status = false  
    }) 
  }
  } else if (
    (snake.head.x == nyawa.position.x && snake.head.y == nyawa.position.y) && nyawa.status == true
  ) {
    nyawa.position = initPosition()
    nyawa.status = false
    snake.nyawa1++
  }else if (
    snake.head.x == app2.position.x && snake.head.y == app2.position.y
  ) {
    app2.position = initPosition()
    snake.score++
    levelup(snake)
    snake.body.push({ x: snake.head.x, y: snake.head.y })
    if((snake.score % 2 != 0 && snake.score >1) || snake.score == 2){
    nyawa.status = true
    if(nyawa.status == true){
    setTimeout(function(){
      nyawa.status = false
      nyawa.position = initPosition()
      cekbalok(snake)
    },3000)
  }
  }else{
    setTimeout(function(){
      nyawa.status = false  
  }) 
}
  }

}
function moveLeft (snake) {
  snake.head.x--
  teleport(snake)
  eat(snake, apple)
}

function moveRight (snake) {
  snake.head.x++
  teleport(snake)
  eat(snake, apple)
}

function moveDown (snake) {
  snake.head.y++
  teleport(snake)
  eat(snake, apple)
}

function moveUp (snake) {
  snake.head.y--
  teleport(snake)
  eat(snake, apple)
}

function checkCollision (snakes) {
  let isCollide = false
  let isWin = false;
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          (snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y )
        ) {
          snakes[i].nyawa1--
          if(snakes[i].nyawa1 == 0){
            isCollide = true
          }
         }
      }
    }
  }
  if(cekbalokcollecsion(snakes[0]) == true){
        isCollide = true
        
  }


  for(let i = 0 ; i < snakes.length; i++){
    if(snakes[i].level == 5){
      isWin = true
    }
  }
  if (isCollide) {
    MOVE_INTERVAL = 100
    alert('Game over')  
    audio.play()
    snake1 = initSnake(
        'https://cdn4.iconfinder.com/data/icons/nuuline-fill-animals/150/animal_head_face_cartoon-23-512.png',
        './snake-kor.JPG'
      )
      return isCollide
  }else if(isWin){
    MOVE_INTERVAL = 100
    alert('Selamat Anda Menang')
    snake1 = initSnake(
        'https://cdn4.iconfinder.com/data/icons/nuuline-fill-animals/150/animal_head_face_cartoon-23-512.png',
        './snake-kor.JPG'
      )
    return isWin
  }

}

function move (snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake)
      break
    case DIRECTION.RIGHT:
      moveRight(snake)
      break
    case DIRECTION.DOWN:
      moveDown(snake)
      break
    case DIRECTION.UP:
      moveUp(snake)
      break
  }
  moveBody(snake)
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake)
    }, MOVE_INTERVAL)
  } else {
    initGame()
  }
}

function moveBody (snake) {
snake.body.unshift({ x: snake.head.x, y: snake.head.y })
snake.body.pop()
}

function turn (snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN
  }

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    turn(snake1, DIRECTION.LEFT)
  } else if (event.key === 'ArrowRight') {
    turn(snake1, DIRECTION.RIGHT)
  } else if (event.key === 'ArrowUp') {
    turn(snake1, DIRECTION.UP)
  } else if (event.key === 'ArrowDown') {
    turn(snake1, DIRECTION.DOWN)
  }
})

function initGame () {
  move(snake1)
}

initGame()
