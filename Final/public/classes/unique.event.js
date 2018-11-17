class UniqueEvent extends LivingCreature {
    constructor(x, y, arrayOrder) {
        super(x, y, arrayOrder);
        this.moveDir = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x, this.y + 3],
            [this.x, this.y + 4],
            [this.x, this.y + 5],
            [this.x, this.y - 3],
            [this.x, this.y - 4],
            [this.x, this.y - 5],
            [this.x + 3, this.y],
            [this.x + 4, this.y],
            [this.x + 5, this.y],
            [this.x - 3, this.y],
            [this.x - 4, this.y],
            [this.x - 5, this.y]
        ];
        matrix[this.y][this.x] = 6;
    }

    main() {
        for (var i in this.moveDir) {
            if (matrix[this.moveDir[i][1]] !== undefined) {
                if (matrix[this.moveDir[i][1]][this.moveDir[i][0]] != 6) {
                    let arr = this.arrayOrder[matrix[this.moveDir[i][1]][this.moveDir[i][0]]];
                    if(arr){
                    for(var j in arr){
                        if(arr[j].x==this.moveDir[i][0]&&arr[j].y==this.moveDir[i][1]){
                            arr.splice(j,1);
                            break;
                        }
                    }
                    }
                    var norEvntObj = new UniqueEvent(this.moveDir[i][0], this.moveDir[i][1]);
                    eventObjects.push(norEvntObj);
                    matrix[this.moveDir[i][1]][this.moveDir[i][0]] = 6;
                }

            }
        }
    }
}
