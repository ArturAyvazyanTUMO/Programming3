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