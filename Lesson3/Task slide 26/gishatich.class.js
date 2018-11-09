var arrays=require('./arrays');
var matrix=require('./matrix');
var LivingCreature=require('./base.class');
module.exports=class Gishatich extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.frames = 0;
        this.baq = 0;
    }


    sharjvel() {
        var norVandak = this.random(this.yntrelVandak(0));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 3;
        } else {
            norVandak = this.random(this.yntrelVandak(1))
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
        var norVandak = this.random(this.yntrelVandak(2));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 3;
            for (var i in arrays.xotakerArr) {
                if (arrays.xotakerArr[i].x == this.x && arrays.xotakerArr[i].y == this.y) {
                    arrays.xotakerArr.splice(i, 1);
                }
            }
        }
    }

    xmel() {
        if (this.baq <= 10) {
            this.frames -= 5;
        }
        var norVandak = this.random(this.yntrelVandak(5));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.baq++;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 3;
            for (var i in arrays.waterArr) {
                if (arrays.waterArr[i].x == this.x && arrays.waterArr[i].y == this.y) {
                    arrays.waterArr.splice(i, 1);
                }
            }
        }
    }

    bazmanal() {
        var norVandak = this.random(this.yntrelVandak(0));
        if (norVandak) {
            var norGishatich = new Gishatich(norVandak[0], norVandak[1]);
            arrays.gishatichArr.push(norGishatich);
            matrix[norVandak[1]][norVandak[0]] = 3;
        }
    }
}