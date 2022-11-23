var fs = require('fs');
fs.readFile('sample.txt', 'utf-8', function(err, data){
    console.log(data);
});

var args = process.argv;
console.log(args[2]);

if (args[2] === '1'){
    console.log("1을 입력하셨군요");
} else {
    console.log("1이 아닌것을 입력하셨군요");
}