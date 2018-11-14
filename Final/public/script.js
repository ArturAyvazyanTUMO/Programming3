var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var saruycArr = [];
var waterArr = [];
var matrix = [];

// Kecce maisi 9y

var chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var side = 20;

var possibleWeathers = ["Winter", "Spring", "Summer", "Autumn"]
var currentWeather = "Summer";
var weatherFramedPassed = 0;

//Declaring colors which we will change after with weathers
var grassClr="green";

function setup() {
    var col = Math.floor(windowWidth / side);
    var row = Math.floor(windowHeight / side);
    for (var y = 0; y < row; y++) {
        matrix[y] = [];
        for (var x = 0; x < col; x++) {
            matrix[y][x] = random(chance);
        }
    }
    frameRate(10);
    var canvas = createCanvas(col * side, row * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var xk = new Xotaker(x, y);
                xotakerArr.push(xk);
            }
            else if (matrix[y][x] == 3) {
                var gt = new Gishatich(x, y);
                gishatichArr.push(gt);
            }
            else if (matrix[y][x] == 4) {
                var saruyc = new Saruyc(x, y);
                saruycArr.push(saruyc);
            }
            else if (matrix[y][x] == 5) {
                var water = new Water(x, y);
                waterArr.push(water);
            }
        }
    }
}

function draw() {
    weatherFramedPassed++;
    if (weatherFramedPassed == 20) {
        changeWeather();
        weatherFramedPassed = 0;
    }
    console.log(currentWeather);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill(grassClr);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill(255, 174, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("lightblue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }

    for (var i in grassArr) {
        if(currentWeather!="Winter"){
            grassArr[i].bazmanal();
        }
    }
    for (var i in xotakerArr) {
        var xotka = random(xotakerArr[i].yntrelVandak(1));
        if (xotakerArr[i] && xotakerArr[i].chutel == 5) {
            xotakerArr[i].mahanal(i);
        }
        else if (xotakerArr[i] && xotakerArr[i].turn == 5) {
            xotakerArr[i].utel();
            xotakerArr[i].bazmanal();
        }
        else if (xotakerArr[i] && xotka) {
            xotakerArr[i].utel();
        }
        else {
            xotakerArr[i].sharjvel();
        }
    }

    for (var i in gishatichArr) {
        gishatichArr[i].frames++;
        if (gishatichArr[i].frames >= 30) {
            gishatichArr[i].mahanal(i);
        }
        else if (random(gishatichArr[i].yntrelVandak(2))) {
            gishatichArr[i].utel();
        }
        else if (random(gishatichArr[i].yntrelVandak(5))) {
            gishatichArr[i].xmel();
        }
        else {
            gishatichArr[i].sharjvel();
        }
    }

    for (var i in waterArr) {
        waterArr[i].main();
    }

    for (var i in saruycArr) {
        saruycArr[i].main();
        var fps = frameRate();
        if (saruycArr[i].frames >= fps * 10) {
            saruycArr[i].halvel(i);
        }
    }

    //Weather mechanism
    if(currentWeather=="Winter"){
        //Xoti guyni poxum
        grassClr=[115,115,115];
        //Jri sarcakalum
        let index=floor(random(0,saruycArr.length));
        let waterObject=waterArr[index];
        if(waterObject){
            waterArr.splice(index,1);
            matrix[waterObject.y][waterObject.x]=4;
            saruycArr.push(new Saruyc(waterObject.x,waterObject.y));
        }else{
            index=floor(random(0,saruycArr.length));
            waterObject=waterArr[index];
        }
    }
    else if(currentWeather=="Summer" || currentWeather=="Spring"){
        grassClr="green";
        //Saruyci halum
        let index=floor(random(0,waterArr.length));
        let saruycObject=saruycArr[index];
        if(saruycObject){
            saruycArr.splice(index,1);
            matrix[saruycObject.y][saruycObject.x]=5;
            waterArr.push(new Water(saruycObject.x,saruycObject.y));
        }else{
            index=floor(random(0,saruycArr.length));
            saruycObject=saruycArr[index];
        }
    }
    else if(currentWeather=="Autumn"){
        grassClr=[102,74,59];
    }
}


function changeWeather() {
    for (var i = 0; i < possibleWeathers.length; i++) {
        if (currentWeather == possibleWeathers[i]) {
            if (currentWeather == possibleWeathers[possibleWeathers.length - 1]) {
                currentWeather = possibleWeathers[0];
            } else {
                currentWeather = possibleWeathers[i + 1];
            }
            break;
        }
    }
}