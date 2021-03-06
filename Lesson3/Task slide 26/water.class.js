var arrays=require('./arrays');
var matrix=require('./matrix');
var LivingCreature=require('./base.class');
module.exports=class Water extends LivingCreature {
    constructor(x, y, directions) {
        super(x, y, directions);
        this.multiply = 0;
    }

    main() {
        this.multiply++;
        var norVandak = this.random(this.yntrelVandak(0));
        if (this.multiply >= 15 && norVandak) {
            var wt = new Water(norVandak[0], norVandak[1]);
            arrays.waterArr.push(wt);
            matrix[norVandak[1]][norVandak[0]] = 5;
            this.multiply = 0;
        }
    }
}