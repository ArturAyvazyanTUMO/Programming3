class Xotaker extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.energy = 8;
        this.index = 2;
        this.turn = 0;
        this.chutel = 0;
        this.gender=Math.round(Math.random());
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
                    statistics.waterDieCount++;
                    break;
                }
            }
        }else{
            norVandak=random(this.yntrelVandak(8));
        }
    }


    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        var anotherXotaker=random(this.yntrelVandak(2));
        var foundedObj;
        this.turn = 0;
        if (norVandak) {
            if(anotherXotaker){
                for(var i in xotakerArr){
                    if(xotakerArr[i].x==anotherXotaker[0]){
                        if(xotakerArr[i].y==anotherXotaker[1]){
                            if(xotakerArr[i].gender!=this.gender){
                                var norXotaker = new Xotaker(norVandak[0], norVandak[1]);
                                xotakerArr.push(norXotaker);
                                matrix[norVandak[1]][norVandak[0]] = 2;
                            }
                        }
                    }
                }
            }
        }
    }

    mahanal(index) {
        return super.mahanal(index,xotakerArr);
    }
}