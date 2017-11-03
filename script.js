window.onload = function () {

    var game_on = true; //did the player lose
    var lgth_snake = 1; //the length of the snake
    var dir = 0;    //where the snake is heading 0:right 1:down 2:left 3:up
    var canvas; //the size of the main window where the snake will move
    var ctx;    //the snake
    var slp = 100; //the refreshing rate (in ms)
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
    var color_rotten_apple = '#ff0000';
    var apple = false;  //is there an apple on the field ?
    var lg_box_x;   //how many positions on x axis
    var lg_box_y;   //how many positions on y axis
    var posa_x; //where the apple is
    var posa_y;
    var posr_x; //where the rotten apple is
    var posr_y;
    var bigger_snake = false; //should the last element of snake move? (ie same length)
    var nb_rooten_apple = 0;
    var rooten_apple_array = new Array();
    var alive = true;

    /*function init_keys() {
        document.getElementById("up").addEventListener("click", moveUp);
        document.getElementById("down").addEventListener("click", moveDown);
        document.getElementById("left").addEventListener("click", moveLeft);
        document.getElementById("right").addEventListener("click", moveRight);
    }*/

    function init_mode() {
        document.getElementById('easy').onclick = easyMode;
        document.getElementById('medium').onclick = mediumMode;
        document.getElementById('hard').onclick = hardMode;
        document.getElementById('extreme').onclick = extremeMode;
    }

    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.fillStyle = color_snake;
        pos_x = 40,pos_y = 0;    //where is initialy placed the snake
        lg_x = 20,lg_y = 20;     //the size of a part of the snake
        mov_x = 20 //Math.floor((pos_x + lg_x)/2);   //how much will the head move of on the x axis
        mov_y = 20 //Math.floor((pos_y + lg_y)/2);   //how much will the head move of on the y axis
        snake=[[pos_x,pos_y]];
        lg_box_x = Math.floor(canvas.width / mov_x);
        lg_box_y = Math.floor(canvas.height / mov_y);
    }
     
    function update_snake() {
        if (!bigger_snake) {
            ctx.fillStyle = color_bg;   //we erase the end of the snake
            var k;
            var not_seen = true;   //to ensure the snake can walk across his body without having a part becoming invisible
            for (k=0; k< lgth_snake-1; k++) {
                if (snake[k][0] == snake[lgth_snake-1][0] && snake[k][1] == snake[lgth_snake-1][1]) not_seen = false;
            }
            if (not_seen) ctx.fillRect(snake[lgth_snake - 1][0], snake[lgth_snake - 1][1], lg_x, lg_y);
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
        var dead = isRootenAppleThere(snake[0]);
        if (dead) alive = false;
    }

    function create_apple() {
        var rdx = Math.random();
        var rdy = Math.random();
        posa_x = mov_x * Math.floor(rdx * lg_box_x);
        posa_y = mov_y * Math.floor(rdy * lg_box_y);
        ctx.fillStyle = color_apple;
        ctx.fillRect(posa_x,posa_y,lg_x,lg_y);
        apple = true;
    }

    function apple_eaten() {
        ctx.fillStyle = color_snake;
        ctx.fillRect(posa_x,posa_y,lg_x,lg_y);
        apple = false;
        bigger_snake = true;
        document.getElementById("score").innerHTML = lgth_snake + 1;
    }

    function rooten_apple() {
        posr_x = mov_x * Math.floor((Math.random()) * lg_box_x);
        posr_y = mov_y * Math.floor((Math.random()) * lg_box_y);
        ctx.fillStyle = color_rotten_apple;
        ctx.fillRect(posr_x,posr_y,lg_x,lg_y);
        nb_rooten_apple++;
        rooten_apple_array.push([posr_x,posr_y]);
    }

    function create_rooten_apple() {
        if (lgth_snake < 3) return null;
        if (lgth_snake < 10) {
            if(Math.random() < 0.01 && nb_rooten_apple < 4) rooten_apple();
            return
        }
        if (lgth_snake < 20) {
            if (Math.random() < 0.03 && nb_rooten_apple << 15) rooten_apple();
            return
        }
        if (lgth_snake < 30) {
            if (Math.random() < 0.10 && nb_rooten_apple << 60) rooten_apple();
            return;
        }
        if (Math.random() < (1 - nb_rooten_apple/100)) rooten_apple();
    }

    function sleep(ms) {    //used to update the snake when we need to
        return new Promise(resolve => setTimeout(resolve , ms));
    }

    var i = 0;

    async function start_game() {
        while (alive) {
            if (!apple) create_apple();
            if ((posa_x == snake[0][0]) && (posa_y == snake[0][1])) apple_eaten();
            update_snake();
            await sleep(slp);
            create_rooten_apple();
        }
        console.log("Game over");
    }

    //init_keys();  now useless
    init_mode();
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


    /**
     * This block is to use the keyboard to control the snake
     * @type {Element}
     */
    var body = document.querySelector('body');
    body.onkeydown = function (e) {
        var nb_key = e.keyCode;
        if ( nb_key == 37 || nb_key == 38 || nb_key == 39 || nb_key == 40) {
            e.preventDefault();
        }
        switch (nb_key) {
            case 37:
                if (dir == 1 || dir == 3) moveLeft();
                break;
            case 38:
                if (dir == 0 || dir == 2) moveUp();
                break;
            case 39:
                if (dir == 1 || dir == 3) moveRight();
                break;
            case 40:
                if (dir == 0 || dir == 2) moveDown();
                break;
        }
    };

    function easyMode() {
        slp = 1000;
    }
    function mediumMode() {
        slp = 300;
    }
    function hardMode() {
        slp = 100;
    }
    function extremeMode() {
        slp = 30;
    }


    function isRootenAppleThere(x) {
        for (k=0; k < nb_rooten_apple; k++) {
            if (rooten_apple_array[k][0] == x[0] && rooten_apple_array[k][1] == x[1]) return true;
        }
        return false;
    }
}
