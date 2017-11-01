window.onload = function () {

    var game_on = true;
    var lgth_snake = 1;
    var dir = 0;
    var canvas;
    var ctx;
    ctx.fillStyle = '#0000ff';

    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.border = "2px solid";
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
        ctx.fillRect(21,21,19,19);
    }
    
    function update() {
        
    }

}
