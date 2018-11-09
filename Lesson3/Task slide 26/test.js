var xotakerArr=[];
var Grass=require('./grass.class');
var matrix=require('./matrix');
for (var i =0;i<=10;i++){
    matrix[i]=[]
    for(var j = 0;j<=10;j++){
        matrix[i][j]=0;
    }
}


matrix[5][1]=1;

for (var i =0;i<=10;i++){
    for(var j = 0;j<=10;j++){
        if(matrix[i][j]==1){
            xotakerArr.push(new Grass(i,j));
        }
    }
}

for(var k in xotakerArr){
    xotakerArr[k].bazmanal();
}
