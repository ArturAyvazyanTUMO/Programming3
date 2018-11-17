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
        }else{
            norVandak=random(this.yntrelVandak(7));
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

    mahanal(index) {
        return super.mahanal(index,gishatichArr);
    }
}