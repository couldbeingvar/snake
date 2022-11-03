const N = 11;

let snake = [
    [6,5],
    [7,5],
    [8,5]
];

let apple = false;

let bonusAudio = new Audio('tap.wav');

let canPlay = true;
let lastMove = 'top';
let speed = 400;
let point = snake.length;

function getApple() {
    let x = Math.floor(Math.random() * N);
    let y = Math.floor(Math.random() * N);

    let isSnake = false;

    for (var s = 0; s < snake.length; s++) {
        if(snake[s][0] == y && snake[s][1] == x){
            isSnake = true;
            break;
        }
    }

    if(isSnake){
        getApple();
    }else{
        apple = [y, x];
    }
}

function draw() {

    if(!apple){
        getApple();
    }

    let templateRow = '<div class="row">[c]</div>';
    let templateItem = '<div class="item [className]" y="[y]" x="[x]"></div>';

    let html = '';

    for (let y = 0; y < N; y++) {
        let rowHtml = '';
        for (let x = 0; x< N; x++) {
            let className = '';

            for (var s = 0; s < snake.length; s++) {
                if(snake[s][0] == y && snake[s][1] == x){
                    className = 'snake';
                    break;
                }
            }
            // if(apple[0] == y && apple[1] == x){
            //     className = 'apple';
            // }
            className = (apple[0] == y && apple[1] == x) ? 'apple' : className;
            rowHtml += templateItem
                        .replace('[className]', className)
                        .replace('[y]', y)
                        .replace('[x]', x);
        }
        html += templateRow.replace('[c]', rowHtml);
    }

    document.getElementById('snake').innerHTML = html;
    document.getElementById('point').innerHTML = point;
    setTimeout(start, speed);
}

function moveLeft() {
    let newItem = getSnakeHead();
    newItem[1] = (newItem[1] - 1 < 0) ? N - 1 : --newItem[1];
    next(newItem);
}

function moveTop() {
    let newItem = getSnakeHead();
    newItem[0] = (newItem[0] - 1 < 0) ? N - 1 : --newItem[0];
    next(newItem);
}

function moveRight() {
    let newItem = getSnakeHead();
    newItem[1] = (newItem[1] + 1 >= N) ? 0 : ++newItem[1];
    next(newItem);
}

function moveDown() {
    let newItem = getSnakeHead();
    newItem[0] = (newItem[0] + 1 >= N) ? 0 : ++newItem[0];
    next(newItem);
}

function getSnakeHead() {
    return [
        snake[0][0],
        snake[0][1]
    ];
}

function next(newItem) {

    for (var s = 0; (s < snake.length && canPlay); canPlay = !(snake[s][0] == newItem[0] && snake[s][1] == newItem[1]), s++){}

    snake.unshift(newItem);

    if(newItem[0] == apple[0] && newItem[1] == apple[1]){
        apple = false;
        bonusAudio.play();
        speed -= 3;
        point++;
    }else{
        snake.pop();
    }

    if(!canPlay) return false;

    draw();
}

document.addEventListener('keyup', move);

function move(event) {
    // if(event.keyCode == 37){
    //     if(lastMove == 'right') return false;
    //     lastMove = 'left';
    // }else if(event.keyCode == 38){
    //     if(lastMove == 'down') return false;
    //     lastMove = 'top';
    // }else if(event.keyCode == 39){
    //     if(lastMove == 'left') return false;
    //     lastMove = 'right';
    // }else if(event.keyCode == 40){
    //     if(lastMove == 'top') return false;
    //     lastMove = 'down';
    // }
    switch (event.keyCode) {
        case 37:
            if(lastMove == 'right') return false;
            lastMove = 'left';
            break;
        case 38:
            if(lastMove == 'down') return false;
            lastMove = 'top';
            break;
        case 39:
            if(lastMove == 'left') return false;
            lastMove = 'right';
            break;
        case 40:
            if(lastMove == 'top') return false;
            lastMove = 'down';
            break;
    }
}

function start() {
    // if(lastMove == 'left'){
    //     moveLeft();
    // }else if(lastMove == 'top'){
    //     moveTop();
    // }else if(lastMove == 'right'){
    //     moveRight();
    // }else if(lastMove == 'down'){
    //     moveDown();
    // }
    switch (lastMove) {
        case 'left': moveLeft(); break;
        case 'top': moveTop(); break;
        case 'right': moveRight(); break;
        case 'down': moveDown(); break;
    }
}

draw();
//
// function test() {
//     console.log('test');
// }


// setTimeout(function(){
//     console.log('test');
// }, 2000);

// setInterval(function(){
//     console.log(Math.random());
// }, 1000);
