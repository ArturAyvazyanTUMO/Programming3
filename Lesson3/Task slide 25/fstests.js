const fs=require('fs');

var obj={
    "first_name":"Vardan",
    "last_name":"Hovsepyan",
    "age":13,
    "tumo_student":true
}

var myJSON = JSON.stringify(obj); 
fs.writeFile("Task\ slide\ 25/obj.json", myJSON, function(err){
    console.log("fs.writeFile ended");
});
