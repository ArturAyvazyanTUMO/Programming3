class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mahanal(s) {
        matrix[this.y][this.x] = 0;
    }
}

class Grass extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.multiply = 0;
    }

    bazmanal() {
        this.multiply++;
        var norVandak = random(this.yntrelVandak(0));
        if (this.multiply >= 8 && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            grassArr.push(norXot);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }


}




class Xotaker extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.energy = 8;
        this.index = 2;
        this.turn = 0;
        this.chutel = 0;
    }

    sharjvel() {
        this.chutel++;
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 2;
        }
    }

    utel() {
        this.turn++;
        this.chutel = 0;
        var norVandak = random(this.yntrelVandak(1));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 2;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }


    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        this.turn = 0;
        if (norVandak) {
            var norXotaker = new Xotaker(norVandak[0], norVandak[1]);
            xotakerArr.push(norXotaker);
            matrix[norVandak[1]][norVandak[0]] = 2;
        }
    }

    mahanal(s) {
        return super.mahanal(s);
        xotakerArr.splice(s, 1);
    }
}

class Gishatich extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.frames = 0;
        this.baq = 0;
    }


    sharjvel() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 3;
        } else {
            norVandak = random(this.yntrelVandak(1))
            if (norVandak) {
                matrix[this.y][this.x] = 0;
                this.x = norVandak[0];
                this.y = norVandak[1]
                matrix[norVandak[1]][norVandak[0]] = 3;
            }
        }
    }

    utel() {
        this.frames -= 5;
        var norVandak = random(this.yntrelVandak(2));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 3;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
    }

    xmel() {
        if (this.baq <= 10) {
            this.frames -= 5;
        }
        var norVandak = random(this.yntrelVandak(5));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.baq++;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 3;
            for (var i in waterArr) {
                if (waterArr[i].x == this.x && waterArr[i].y == this.y) {
                    waterArr.splice(i, 1);
                }
            }
        }
    }

    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        if (norVandak) {
            var norGishatich = new Gishatich(norVandak[0], norVandak[1]);
            gishatichArr.push(norGishatich);
            matrix[norVandak[1]][norVandak[0]] = 3;
        }
    }

    mahanal(s) {
        return super.mahanal(s);
        gishatichArr.splice(s, 1);
    }


}


class Saruyc extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.frames = 0;
    }

    main() {
        var norVandak = this.yntrelVandak(5);
        if (norVandak) {
            this.frames++;
        } else {
            norVandak = this.yntrelVandak(1);
            if (norVandak) {
                this.frames++;
            }
        }
    }

    halvel(s) {
        return super.mahanal(s);
        saruycArr.splice(s, 1);
    }
}

class Water extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.multiply = 0;
    }

    main() {
        this.multiply++;
        var norVandak = random(this.yntrelVandak(0));
        if (this.multiply >= 15 && norVandak) {
            var wt = new Water(norVandak[0], norVandak[1]);
            waterArr.push(wt);
            matrix[norVandak[1]][norVandak[0]] = 5;
            this.multiply = 0;
        }
    }

}

