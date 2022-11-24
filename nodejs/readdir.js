var testFoler = 'data';
var fs = require('fs');

fs.readdir(testFoler, function(error, filelist){
    console.log(filelist);
})