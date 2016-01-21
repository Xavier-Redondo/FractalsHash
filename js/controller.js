var iniX;
var iniY;
var config;
var funcName;
var grid;
var initTime;
var mousePos;
var result;
var canvas;
var fractalCanvas;
var zoomCanvas;
var backgroundCanvas;
var seedReal;
var seedIm;

var redraw = function redraw(grid){
    canvas.detach();
    clearCanvas(zoomCanvas);
    clearCanvas(backgroundCanvas);
    clearCanvas(fractalCanvas);
    drawFractal(fractalCanvas, grid);
    result.html(canvas);
}

$(document).ready(function(){
    result = $("#result");
    canvas = $(".canvas");
    fractalCanvas = $("#fractalCanvas").get(0);
    zoomCanvas = $("#zoomCanvas").get(0);
    backgroundCanvas = $("#backgroundCanvas").get(0);

    $(".fractals").on("click", ".fractal", function(){
        initTime = performance.now();
        seedReal = +($("#seedReal").get(0).value);
        seedIm = +($("#seedIm").get(0).value);
        funcName = $(this).attr('id');
        config = CONFIG[funcName];
        config.setSize(fractalCanvas.height, fractalCanvas.width);
        config.setSeed(seedReal, seedIm);
        grid = generateFractal(config, funcName);
        redraw(grid);
        log("Call to generateFractal took " + (performance.now() - initTime) + " milliseconds.");
    });

    result.on("mousedown", ".canvas", function(event){
        mousePos = getMousePos(this, event);
        iniX = mousePos.x;
        iniY = mousePos.y;
    });

    result.on("mouseup", ".canvas", function(event){
        initTime = performance.now();
        if (config){
            var mousePos = getMousePos(this, event);
            config = config.zoom(iniX, iniY, mousePos.x, mousePos.y);
            grid = generateFractal(config, funcName);
            redraw(grid);
        }
        log("Call to zoom took " + (performance.now() - initTime) + " milliseconds.");
        iniX = undefined;
        iniY = undefined;
    });

    result.on("mousemove", ".canvas", function(event){
        if (iniX){ // Otherwise we have not clicked the mouse and nothing to be done
            mousePos = getMousePos(this, event);
            var x = mousePos.x;
            var y = mousePos.y;
            canvas.detach();
            drawZoom(zoomCanvas, x, y);
            result.html(canvas);
        }
    });
});

var log = function log(text){
    var logElem = $("#mainLog");
    logElem.text(logElem.text() + text + "\n")
};

var getMousePos = function getMousePos (canvas, evt){
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
        y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
    };
};

var clearCanvas = function clearCanvas(canvas){
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
};

var drawZoom = function drawZoom(canvas, x, y){
    var ctx = canvas.getContext("2d");
    clearCanvas(canvas);
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = "rgb(255, 255, 255)";
    // This is really what is selected, maintaining the aspect ratio in the canvas (instead of y - iniY)
    ctx.rect(iniX, iniY, x - iniX, (x - iniX) * (canvas.height / canvas.width));
    ctx.stroke();
};

var drawFractal = function drawFractal(canvas, grid){
    var ctx = canvas.getContext("2d");
    var aux;
    Object.keys(grid).forEach(function(col, index){
        aux = grid[col];
        Object.keys(aux).forEach(function(row, index2){
            ctx.fillStyle = aux[row];
            ctx.fillRect( col, row, 1, 1 );
        });
    });
};
