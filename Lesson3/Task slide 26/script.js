var arrays = require('./arrays');
var matrix = require('./matrix');

var Grass = require('./grass.class');
var Xotaker = require('./xotaker.class');
var Water = require('./water.class');
var Gishatich = require('./gishatich.class');
var Saruyc = require('./saruyc.class');

// Kecce maisi 9y

var chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var side = 1;

var frps = 5;

var windowWidth = 30;
var windowHeight = 10;

function setup() {
    var col = Math.floor(windowWidth / side);
    var row = Math.floor(windowHeight / side);
    for (var y = 0; y < row; y++) {
        matrix[y] = [];
        for (var x = 0; x < col; x++) {
            matrix[y][x] = random(chance);
        }
    }
    fps = 1;
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                arrays.grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var xk = new Xotaker(x, y);
                arrays.xotakerArr.push(xk);
            }
            else if (matrix[y][x] == 3) {
                var gt = new Gishatich(x, y);
                arrays.gishatichArr.push(gt);
            }
            else if (matrix[y][x] == 4) {
                var saruyc = new Saruyc(x, y);
                arrays.saruycArr.push(saruyc);
            }
            else if (matrix[y][x] == 5) {
                var water = new Water(x, y);
                arrays.waterArr.push(water);
            }
        }
    }

}

function draw() {

    // for (var y = 0; y < matrix.length; y++) {
    //     for (var x = 0; x < matrix[y].length; x++) {

    //         if (matrix[y][x] == 1)
    //             console.log("Grass=>1");
    //         else if (matrix[y][x] == 2)
    //             console.log("Xotaker=>2");
    //         else if (matrix[y][x] == 3)
    //             console.log("Gishatich=>3");
    //         else if (matrix[y][x] == 4)
    //             console.log("Saruyc=>4");
    //         else if (matrix[y][x] == 5)
    //             console.log("Water=>5");
    //         else if (matrix[y][x] == 0)
    //             console.log("Void=>0");
    //     }
    // }

    for (var i in arrays.grassArr)
        arrays.grassArr[i].bazmanal();
    for (var i in arrays.xotakerArr) {
        var xotka = random(arrays.xotakerArr[i].yntrelVandak(1));
        if (arrays.xotakerArr[i] && arrays.xotakerArr[i].chutel == 5)
            arrays.xotakerArr[i].mahanal(i, arrays.xotakerArr);
        else if (arrays.xotakerArr[i] && arrays.xotakerArr[i].turn == 5) {
            arrays.xotakerArr[i].utel();
            arrays.xotakerArr[i].bazmanal();
        }
        else if (arrays.xotakerArr[i] && xotka)
            arrays.xotakerArr[i].utel();
        else
            arrays.xotakerArr[i].sharjvel();
    }

    for (var i in arrays.gishatichArr) {
        arrays.gishatichArr[i].frames++;
        if (arrays.gishatichArr[i].frames >= 30)
            arrays.gishatichArr[i].mahanal(i, arrays.gishatichArr);
        else if (random(arrays.gishatichArr[i].yntrelVandak(2)))
            arrays.gishatichArr[i].utel();
        else if (random(arrays.gishatichArr[i].yntrelVandak(5)))
            arrays.gishatichArr[i].xmel();
        else
            arrays.gishatichArr[i].sharjvel();
    }

    for (var i in arrays.waterArr)
        arrays.waterArr[i].main();

    for (var i in arrays.saruycArr) {
        arrays.saruycArr[i].main();
        var fps = frameRate();
        if (arrays.saruycArr[i].frames >= fps / 10)
            arrays.saruycArr[i].halvel(i, arrays.saruycArr);
    }
    console.table(matrix);
}


const frameRate = () => (frps);

const random=(items)=>(items[Math.floor(Math.random() * items.length)]);

setup();

setInterval(draw, 1000 / frps);


