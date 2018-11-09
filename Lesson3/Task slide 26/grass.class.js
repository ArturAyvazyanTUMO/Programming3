var arrays=require('./arrays');
var matrix=require('./matrix');
var LivingCreature=require('./base.class');
module.exports=class Grass extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.multiply = 0;
    }

    bazmanal() {
        this.multiply++;
        var norVandak = this.random(this.yntrelVandak(0));
        if (this.multiply >= 8 && norVandak) {
            var norXot = new Grass(norVandak[0], norVandak[1]);
            arrays.grassArr.push(norXot);
            matrix[norVandak[1]][norVandak[0]] = 1;
            this.multiply = 0;
        }
    }
}