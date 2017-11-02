window.onload = function () {

    var game_on = true; //did the player lose
    var lgth_snake = 1; //the length of the snake
    var dir = 0;    //where the snake is heading 0:right 1:down 2:left 3:up
    var canvas; //the size of the main window where the snake will move
    var ctx;    //the snake
    var slp = 300; //the refreshing rate (in ms)
    var snake = new Array();
    var pos_x;
    var pos_y;
    var lg_x;
    var lg_y;
    var mov_x;
    var mov_y;
    var color_snake = '#0000ff';
    var color_bg = '#ffffff';   //color of the background
    var color_apple = '#00b60a';
    var apple = false;  //is there an apple on the field ?
    var lg_box_x;   //how many positions on x axis
    var lg_box_y;   //how many positions on y axis
    var posa_x; //where the apple is
    var posa_y;
    var bigger_snake = false; //should the last element of snake move? (ie same length)

    function init_keys() {
        document.getElementById("up").addEventListener("click", moveUp);
        document.getElementById("down").addEventListener("click", moveDown);
        document.getElementById("left").addEventListener("click", moveLeft);
        document.getElementById("right").addEventListener("click", moveRight);
    }

    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.fillStyle = color_snake;
        pos_x = 41,pos_y = 1;    //where is initialy placed the snake
        lg_x = 18,lg_y = 18;     //the size of a part of the snake
        mov_x = 20 //Math.floor((pos_x + lg_x)/2);   //how much will the head move of on the x axis
        mov_y = 20 //Math.floor((pos_y + lg_y)/2);   //how much will the head move of on the y axis
        snake=[[pos_x,pos_y]];
        lg_box_x = Math.floor(canvas.width / mov_x);
        lg_box_y = Math.floor(canvas.height / mov_y);
    }
     
    function update_snake() {
        if (!bigger_snake) {
            ctx.fillStyle = color_bg;   //we erase the end of the snake
            ctx.fillRect(snake[lgth_snake - 1][0], snake[lgth_snake - 1][1], lg_x, lg_y);
            for (i=lgth_snake-1; i>0; i--) {    //we put the block n at the place of n-1
                snake[i] = snake[i-1];
            }
        }
        else {
            bigger_snake = false;
            snake.push(snake[lgth_snake-1]);
            for (i=lgth_snake-1; i>0; i--) {    //we put the block n at the place of n-1
                snake[i] = snake[i-1];
            }
            lgth_snake++;
        }
        var i;

        switch (dir) { //we treat the head differently
            case 0:
                snake[0] = [ snake[0][0] + mov_x, snake[0][1] ];
                if (snake[0][0] > canvas.width) {
                    snake[0][0] -= canvas.width;
                }
                break;
            case 1:
                snake[0] = [ snake[0][0], snake[0][1] + mov_y];
                if (snake[0][1] > canvas.height) {
                    snake[0][1] -= canvas.height;
                }
                break;
            case 2:
                snake[0] = [ snake[0][0] - mov_x ,snake[0][1] ];
                if (snake[0][0] < 0) {
                    snake[0][0] += canvas.width;
                }
                break;
            default:
                snake[0] = [ snake[0][0], snake[0][1] - mov_y];
                if (snake[0][1] < 0) {
                    snake[0][1] += canvas.height;
                }
                break;
        }
        ctx.fillStyle = color_snake;
        ctx.fillRect(snake[0][0],snake[0][1],lg_x,lg_y);  //we draw the new head of the snake
    }

    function create_apple() {
        var rdx = Math.random();
        var rdy = Math.random();
        posa_x = 1 + mov_x * Math.floor(rdx * lg_box_x);
        posa_y = 1 + mov_y * Math.floor(rdy * lg_box_y);
        ctx.fillStyle = color_apple;
        ctx.fillRect(posa_x,posa_y,lg_x,lg_y);
        apple = true;
    }

    function apple_eaten() {//TODO:INCREASE LENGTH, ADD A NEW RECT, UPDATE SNAKE AND CTX
        ctx.fillStyle = color_snake;
        ctx.fillRect(posa_x,posa_y,lg_x,lg_y);
        apple = false;
        bigger_snake = true;
        document.getElementById("score").innerHTML = lgth_snake + 1;

    }

    function sleep(ms) {    //used to update the snake when we need to
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var i = 0;

    async function start_game() {
        while (i<100*lg_box_x) {
            if (!apple) create_apple();
            if ((posa_x == snake[0][0]) && (posa_y == snake[0][1])) apple_eaten();
            update_snake();
            i++;
            await sleep(slp);
        }
    }

    init_keys();
    init();
    start_game();

    function moveUp() {
        dir = 3;
        //console.log('moveup')
    }

    function moveDown() {
        dir = 1;
        //console.log('movedown')
    }

    function moveLeft() {
        dir = 2;        //myGamePiece.speedY -= 1;

        //console.log('moveleft')
    }

    function moveRight() {
        dir = 0;
        //console.log('moveright')
    }
}
