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

    halvel(index) {
        return super.mahanal(index,saruycArr);
    }
}