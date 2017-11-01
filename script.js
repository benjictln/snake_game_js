window.onload = function () {

    var game_on = true; //did the player lose
    var lgth_snake = 1; //the length of the snake
    var dir = 0;    //where the snake is heading 0:right 1:down 2:left 3:up
    var canvas; //the size of the main window where the snake will move
    var ctx;    //the snake
    var slp = 1000; //the refreshing rate (in ms)
    var snake;
    var pos_x;
    var pos_y;
    var lg_x;
    var lg_y;
    var mov_x;
    var mov_y;


    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0000ff';  //color of the snake
        pos_x,pos_y= 21;    //where is initialy placed the snake
        lg_x,lg_y = 19;     //the size of a part of the snake
        mov_x = Math.floor((pos_x + lg_x)/2);   //how much will the head move of on the x axis
        mov_y = Math.floor((pos_y + lg_y)/2);   //how much will the head move of on the y axis
        ctx.fillRect(pos_x,pos_x,lg_x,lg_y);
        snake = [[pos_x,pos_y]];
    }
    
    function update() {
        var i;
        for (i=lgth_snake-1; i>0; i--) {    //we put the block n at the place of n-1
            snake[i] = snake[i-1];
        }
        switch (dir) { //we treat the head differently
            case 0:
                snake[0] = [ snake[0][0] + mov_x, snake[0][1] ];
            break;
            case 1:
                snake[0] = [ snake[0][0], snake[0][1] - mov_y];
            break;
            case 2:
                snake[0] = [ snake[0][0] - mov_x ,snake[0][1] ];
                break;
            default:
                snake[0] = [ snake[0][0], snake[0][1] + mov_y];
                break;
        }
    }

    function apple_eaten() {//TODO:INCREASE LENGTH, ADD A NEW RECT, UPDATE SNAKE AND CTX
        return null;
    }

    function sleep(ms) {    //used to update the snake when we need to
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var i = 0;

    async function start_game() {
        while (game_on) {

            await
            sleep(slp);
            console.log("we waited for " + i + ' seconds\n');
            console.log('the snake is located' + snake[0]);
            i++;
        }
    }
    start_game();
}
