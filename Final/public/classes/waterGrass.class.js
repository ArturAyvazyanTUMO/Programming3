class WaterGrass extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.multiply = 0;
    }

    bazmanal() {
        this.multiply++;
        var norVandak = random(this.yntrelVandak(5));
        if (this.multiply >= 100 && norVandak) {
            var norWaterGrass = new WaterGrass(norVandak[0], norVandak[1]);
            waterGrassArr.push(norWaterGrass);
            for(var i in waterArr){
                if(waterArr[i].x==norVandak[0]&&waterArr[i].y==norVandak[1]){
                    waterArr.splice(i,1);
                    break;
                }
            }
            matrix[norVandak[1]][norVandak[0]] = 8;
            this.multiply = 0;
        }
    }
}