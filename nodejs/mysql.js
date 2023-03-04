var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rootroot',
    database : 'sqld',
    port: 3307
});

connection.connect();

connection.query('SELECT id,title FROM topic', function (error, results, fields){
    if (error) {
        console.log(error);
    }

    console.log(results);
});

connection.end();

