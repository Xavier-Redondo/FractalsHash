/**
 * Created by xavierr on 09/01/2016.
 */
var generateFractal = function generateFractal(config, funcName){
    var op = new Operations(config);
    return grid = createArray(config, op[funcName]);   // Here function to be used is op[type]
};

var createArray = function createArray(config, func){
    var real,
        minIm = config.minIm,
        minRe = config.minRe,
        height = config.height,
        width = config.width,
        reFactor = config.reFactor,
        imFactor = config.imFactor,
        getColor = defineGetColor(config),
        grid = Grid(),
        faux = func(config.seedReal, config.seedIm);

    for (var w = 0; w < width; w++){
        real = minRe + w * reFactor;
        for (var h = 0; h < height; h++){
            grid.add(w, h, getColor(faux(real, minIm + h * imFactor)));
        }
    }
    return grid;
};

var defineGetColor = function defineGetColor(config){
    var aux = 0;
    return function getColor(r){
        if (r === 0 || r >= config.maxIte - 1){
            return undefined;
        }
        else if (r < Math.floor(config.maxIte/2)){
            aux = parseInt((2 * 255 * r / config.maxIte), 10);
            return "rgb(" + aux + ", 0 , 0)";
        }
        else if (r < config.maxIte - 1 ){
            aux = parseInt(255 * ((2 * r / config.maxIte) - 1 ), 10);
            return "rgb(255," + aux + ", " + aux + ")";
        }
    };
};