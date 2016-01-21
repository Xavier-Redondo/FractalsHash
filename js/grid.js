/**
 * Created by xavierr on 19/01/2016.
 */
var Grid = function(){
    var x = {};

    x.add = function add(col, row, val){
        if (val){
            x[col] = x[col] || {};
            x[col][row] = val;
        }
    };

    return x;
}