class Fish extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.energy = 8;
        this.index = 7;
        this.turn = 0;
        this.chutel = 0;
        this.gender=Math.round(Math.random());
    }

    sharjvel() {
        this.chutel++;
        var norVandak = random(this.yntrelVandak(5));
        if (norVandak) {
            matrix[this.y][this.x] = 5;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 7;
        }
    }

    utel() {
        this.turn++;
        this.chutel = 0;
        var norVandak = random(this.yntrelVandak(8));
        if (norVandak) {
            matrix[this.y][this.x] = 0;
            this.x = norVandak[0];
            this.y = norVandak[1]
            matrix[norVandak[1]][norVandak[0]] = 7;
            for (var i in waterGrassArr) {
                if (waterGrassArr[i].x == this.x && waterGrassArr[i].y == this.y) {
                    waterGrassArr.splice(i, 1);
                    statistics.waterGrassDieCount++;
                    break;
                }
            }
        }
    }


    bazmanal() {
        var norVandak = random(this.yntrelVandak(0));
        var anotherFish=random(this.yntrelVandak(7));
        this.turn = 0;
        if (norVandak) {
            if(anotherFish){
                for(var i in fishArr){
                    if(fishArr[i].x==anotherFish[0]){
                        if(fishArr[i].y==anotherFish[1]){
                            if(fishArr[i].gender!=this.gender){
                                var norFish = new Fish(norVandak[0], norVandak[1]);
                                fishArr.push(norFish);
                                matrix[norVandak[1]][norVandak[0]] = 7;
                            }
                        }
                    }
                }
            }
        }
    }

    mahanal(index) {
        return super.mahanal(index,fishArr);
    }
}