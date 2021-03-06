var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var saruycArr = [];
var waterArr = [];
var matrix = [];
var eventObjects = [];
var fishArr = [];
var waterGrassArr = [];

var socket = io();

// Kecce maisi 9y

var statistics = {
    fps: 0,
    windowWidth: 0,
    windowHeight: 0,
    side: 0,
    frameWhenEventWillPlay: 0,
    gameIsRunning: false,
    eventWasPlayed: false,
    grassCount: 0,
    xotakerCount: 0,
    gishatichCount: 0,
    saruycCount: 0,
    waterCount: 0,
    fishCount: 0,
    waterGrassCount: 0,
    grassMultiplyCount: 0,
    xotakerMultiplyCount: 0,
    fishMultiplyCount: 0,
    waterMultiplyCount: 0,
    waterGrassMultiplyCount: 0,
    grassDieCount: 0,
    xotakerDieCount: 0,
    gishatichDieCount: 0,
    saruycDieCount: 0,
    waterDieCount: 0,
    fishDieCount: 0,
    waterGrassDieCount: 0,
    xotakerEatCount: 0,
    gishatichEatCount: 0,
    gishatichDrinkCount: 0,
    fishEatCount: 0,
    xotakerMoveCount: 0,
    gishatichMoveCount: 0,
    fishMoveCount: 0,
    currentWeather: "",
    framesPassed: 0
}

var chance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 3, 4, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,];
var side = 20;

var possibleWeathers = ["Winter", "Spring", "Summer", "Autumn"]
var currentWeather = "Summer";
var weatherFramedPassed = 0;

var xotakerInDiffWeathers = {
    turnsToDie: 100,
    turnsToMultiply: 1
};

var whenUniqueEventWillPlay;
var TotalFramesPassed = 0;

//Declaring colors which we will change after with weathers
var grassClr = "green";

var arrORD = [null, grassArr, xotakerArr, gishatichArr, saruycArr, waterArr, eventObjects, fishArr, waterGrassArr];

var evnt;

var playGame = true;

function setup() {
    whenUniqueEventWillPlay = Math.round(random(0, 10 ** 3));
    var col = Math.floor(windowWidth / side);
    var row = Math.floor(windowHeight / side);
    for (var y = 0; y < row; y++) {
        matrix[y] = [];
        for (var x = 0; x < col; x++) {
            matrix[y][x] = random(chance);
        }
    }
    let fpsCount = 30;
    frameRate(fpsCount);
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
            else if (matrix[y][x] == 7) {
                var fish = new Fish(x, y);
                fishArr.push(fish);
            }
            else if (matrix[y][x] == 8) {
                var waterGrass = new WaterGrass(x, y);
                waterGrassArr.push(waterGrass);
            }
        }
    }
    textSize(50);

    //statistics part in setup function
    statistics.fps = fpsCount;
    statistics.windowWidth = windowWidth;
    statistics.windowHeight = windowHeight;
    statistics.side = side;
    statistics.frameWhenEventWillPlay = whenUniqueEventWillPlay;
    statistics.grassCount = grassArr.length;
    statistics.xotakerCount = xotakerArr.length;
    statistics.gishatichCount = gishatichArr.length;
    statistics.saruycCount = saruycArr.length;
    statistics.waterCount = waterArr.length;
    statistics.fishCount = fishArr.length,
    statistics.waterGrassCount = waterGrassArr.length;
}

function draw() {
    //statistics part in draw function
    statistics.grassCount = grassArr.length;
    statistics.xotakerCount = xotakerArr.length;
    statistics.gishatichCount = gishatichArr.length;
    statistics.saruycCount = saruycArr.length;
    statistics.waterCount = waterArr.length;
    statistics.fishCount = fishArr.length,
        statistics.waterGrassCount = waterGrassArr.length;
    statistics.framesPassed = TotalFramesPassed;
    statistics.gameIsRunning = playGame;
    statistics.currentWeather = currentWeather;
    //Send statistics
    textFont('Archivo Black');
    if (playGame) {
        weatherFramedPassed++;
        TotalFramesPassed++;
        if (TotalFramesPassed % 60 == 0) {
            socket.emit('get statistics', statistics);
        }
        noStroke();
        if (TotalFramesPassed == whenUniqueEventWillPlay) {
            evnt = new UniqueEvent(Math.floor(random(0, matrix[0].length - 1)), Math.floor(random(0, matrix.length - 1)));
            eventObjects.push(evnt);
            statistics.eventWasPlayed = true;
        }
        if (weatherFramedPassed == 50) {
            changeWeather();
            weatherFramedPassed = 0;
        }

        if (TotalFramesPassed >= 70 && TotalFramesPassed <= 100) {
            convertTheCharacter(waterArr, fishArr, Fish);
            statistics.waterDieCount++;
        }
        if (TotalFramesPassed >= 40 && TotalFramesPassed <= 200) {
            convertTheCharacter(waterArr, waterGrassArr, WaterGrass);
            statistics.waterDieCount++;
        }
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
                else if (matrix[y][x] == 6) {
                    let colorFactor = random(0, 100)
                    fill([colorFactor, colorFactor, colorFactor]);
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 7) {
                    fill("purple");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 8) {
                    fill([70, 70, 0]);
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 0) {
                    fill("#acacac");
                    rect(x * side, y * side, side, side);
                }
            }
        }


        for (var i in eventObjects) {
            eventObjects[i].main();
        }

        if (conv2Dto1DArray(matrix).every((val, i, arr) => val == 6)) {
            fill(255);
            text("Game Over!", 10, 120);
            statistics.grassCount = 0;
            statistics.xotakerCount = 0;
            statistics.gishatichCount = 0;
            statistics.saruycCount = 0;
            statistics.waterCount = 0;
            statistics.fishCount = 0,
            statistics.waterGrassCount = 0;
            socket.emit('get statistics', statistics);
            playGame = false;
        }

        for (var i in grassArr) {
            if (currentWeather != "Winter") {
                grassArr[i].bazmanal();
                statistics.grassMultiplyCount++;
            }
        }

        for (var i in waterGrassArr) {
            waterGrassArr[i].bazmanal();
            statistics.waterGrassMultiplyCount++;
        }

        for (var i in xotakerArr) {
            var xotka = random(xotakerArr[i].yntrelVandak(1));
            if (xotakerArr[i] && (xotakerArr[i].chutel >= xotakerInDiffWeathers.turnsToDie)) {
                xotakerArr[i].mahanal(i);
                statistics.xotakerDieCount++;
                console.log(statistics.xotakerDieCount);
            }
            else if (xotakerArr[i] && xotakerArr[i].turn >= xotakerInDiffWeathers.turnsToMultiply) {
                xotakerArr[i].bazmanal();
                statistics.xotakerMultiplyCount++;
            }
            else if (xotakerArr[i] && xotka) {
                xotakerArr[i].utel();
                statistics.xotakerEatCount++;
            }
            else {
                xotakerArr[i].sharjvel();
                statistics.xotakerMoveCount++;
            }
        }

        for (var i in gishatichArr) {
            gishatichArr[i].frames++;
            if (gishatichArr[i].frames >= 50) {
                gishatichArr[i].mahanal(i);
                statistics.gishatichDieCount++;
            }
            else if (random(gishatichArr[i].yntrelVandak(2))) {
                gishatichArr[i].utel();
                statistics.gishatichEatCount++;
            }
            else if (random(gishatichArr[i].yntrelVandak(5))) {
                gishatichArr[i].xmel();
                statistics.gishatichDrinkCount++;
            }
            else {
                gishatichArr[i].sharjvel();
                statistics.gishatichMoveCount++;
            }
        }



        for (var i in waterArr) {
            waterArr[i].main();
            statistics.waterMultiplyCount++;
        }

        for (var i in saruycArr) {
            saruycArr[i].main();
            var fps = frameRate();
            if (saruycArr[i].frames >= fps * 10) {
                saruycArr[i].halvel(i);
                statistics.saruycDieCount++;
            }
        }

        for (var i in fishArr) {
            var areThereWaterGrass = random(fishArr[i].yntrelVandak(8));
            if (fishArr[i] && (fishArr[i].chutel >= 250)) {
                fishArr[i].mahanal(i);
                statistics.fishDieCount++;
            }
            else if (fishArr[i] && fishArr[i].turn >= 3) {
                fishArr[i].bazmanal();
                statistics.fishMultiplyCount++;
            }
            else if (fishArr[i] && areThereWaterGrass) {
                fishArr[i].utel();
                statistics.fishEatCount++;
            }
            else {
                fishArr[i].sharjvel();
                statistics.fishMoveCount++;
            }
        }


        //Weather mechanism
        if (currentWeather == "Winter") {
            //Xoti guyni poxum
            grassClr = [143, 190, 203];
            //
            xotakerInDiffWeathers.turnsToDie = 10;
            xotakerInDiffWeathers.turnsToMultiply = 2;
            //Jri sarcakalum
            let index = floor(random(0, waterArr.length));
            let waterObject = waterArr[index];
            if (waterObject) {
                waterArr.splice(index, 1);
                matrix[waterObject.y][waterObject.x] = 4;
                saruycArr.push(new Saruyc(waterObject.x, waterObject.y));
            } else {
                index = floor(random(0, saruycArr.length));
                waterObject = waterArr[index];
            }
            convertTheCharacter(waterArr, saruycArr, Saruyc);
            statistics.waterDieCount++;
        }
        else if (currentWeather == "Spring") {
            grassClr = [129, 199, 67];
            convertTheCharacter(saruycArr, waterArr, Water);
            statistics.saruycDieCount++;
        }
        else if (currentWeather == "Summer") {
            grassClr = [0, 178, 56];
            xotakerInDiffWeathers.turnsToDie = 100;
            xotakerInDiffWeathers.turnsToMultiply = 10;
            convertTheCharacter(waterArr, grassArr, Grass);
            statistics.waterDieCount++;
        }
        else if (currentWeather == "Autumn") {
            grassClr = [218, 103, 44];
            convertTheCharacter(grassArr, waterArr, Water);
            statistics.grassDieCount++;
        }
        fill(255);
        stroke(2);
        text(currentWeather, 10, 50);
        text(whenUniqueEventWillPlay, 500, 50);
        text(TotalFramesPassed, 900, 50);
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

function conv2Dto1DArray(arrToConvert) {
    var newArr = [];
    for (var i = 0; i < arrToConvert.length; i++) {
        newArr = newArr.concat(arrToConvert[i]);
    }
    return newArr;
}

function convertTheCharacter(objArr, toArr, Character) {
    let index = floor(random(0, objArr.length));
    let newObj = objArr[index];
    if (newObj) {
        objArr.splice(index, 1);
        let newCharacterIndex;
        for (var i in arrORD) {
            if (arrORD[i] == toArr) {
                newCharacterIndex = i;
                break;
            }
        }
        matrix[newObj.y][newObj.x] = newCharacterIndex;
        toArr.push(new Character(newObj.x, newObj.y));
    } else {
        index = floor(random(0, saruycArr.length));
        newObj = objArr[index];
    }
}
