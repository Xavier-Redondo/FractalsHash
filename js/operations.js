var Operations = function(config){
    this.config = config;
};

Operations.prototype.mandelbrot = function (real, imaginary) {
    return function(real, imaginary) {
        var i = 0,
            seedReal = real,
            auxReal = real,
            seedIm = imaginary,
            auxIm = imaginary,
            loopReal,
            loopIm;
        do {
            loopReal = auxReal * auxReal - auxIm * auxIm;
            loopIm = 2 * auxReal * auxIm;
            auxReal = loopReal + seedReal;
            auxIm = loopIm + seedIm;
            i += 1;
        } while (i < this.config.maxIte &&
            (auxReal * auxReal + auxIm * auxIm) <= this.config.maxValue);

        return i;
    };
};

Operations.prototype.julia = function(seedReal, seedIm){
    return function(real, imaginary){
        var i = 0,
            auxReal = real,
            auxIm = imaginary,
            loopReal,
            loopIm;
        do {
            loopReal = auxReal * auxReal - auxIm * auxIm;
            loopIm = 2 * auxReal * auxIm;
            auxReal = loopReal + seedReal;
            auxIm = loopIm + seedIm;
            i += 1;
        } while (i < this.config.maxIte &&
            (auxReal * auxReal + auxIm * auxIm) <= this.config.maxValue);

        return i;
    };
};


