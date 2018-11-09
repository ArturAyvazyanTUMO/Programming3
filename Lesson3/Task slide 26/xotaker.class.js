var matrix=require('./matrix');
var arrays=require('./arrays');
var LivingCreature=require('./base.class');
module.exports=class Xotaker extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.energy = 8;
        this.index = 2;
        this.turn = 0;
        this.chutel = 0;
    }

    sharjvel() {
        this.chutel++;
        var norVandak = this.random(this.yntrelVandak(0));
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
        var norVandak = this.random(this.yntrelVandak(1));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 2;
            for (var i in arrays.grassArr) {
                if (arrays.grassArr[i].x == this.x && arrays.grassArr[i].y == this.y) {
                    arrays.grassArr.splice(i, 1);
                    break;
                }
            }
        }
    }


    bazmanal() {
        var norVandak = this.random(this.yntrelVandak(0));
        this.turn = 0;
        if (norVandak) {
            var norXotaker = new Xotaker(norVandak[0], norVandak[1]);
            arrays.xotakerArr.push(norXotaker);
            matrix[norVandak[1]][norVandak[0]] = 2;
        }
    }
}