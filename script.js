window.onload = function () {

    var game_on = true; //did the player lose
    var lgth_snake = 1; //the length of the snake
    var dir = 0;    //where the snake is heading
    var canvas; //the size of the main window where the snake will move
    var ctx;    //the snake
    var slp = 1000; //the refreshing rate (in ms)


    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0000ff';  //color of the snake
        ctx.fillRect(21,21,19,19);
    }
    
    function update() {

    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var i = 0;

    async function start_game() {
        while (game_on) {

            await
            sleep(slp);
            console.log("we waited for " + i + ' seconds\n');
            i++;
        }
    }
    start_game();
}
