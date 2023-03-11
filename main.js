// 12강 -> 수업의 정상
// https://www.youtube.com/watch?v=VToaABEsfbY&list=PLuHgQVnccGMAicFFRh8vFFFtLLlNojWUh&index=11
// 27강 - 수업의 정상(초보자는 여기까지만)
// Node.js & MySQL 17강부터
// arr.push : 파이썬의 리스트append와 동일 기능
// require는 파이썬의 import와 비슷한 의미이다 (모듈을 가져옴)
var port = 5000;
// var address = '52.78.68.113';

var http = require('http');
var url = require('url');
// 리팩토링은 중요하다
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        if(queryData.id === undefined){
            topic.home(request, response);
        } else {
            topic.page(request, response);
        }
    } else if(pathname === '/create'){
        topic.create(request, response);
    } else if(pathname === '/create_process') {
        topic.create_process(request, response);
    } else if(pathname === '/update'){
         topic.update(request, response);
    } else if(pathname === '/update_process'){
        topic.update_process(request, response);
    } else if(pathname === '/delete_process'){
        topic.delete_process(request, response);
    } else if(pathname === '/author'){
        author.home(request, response);
    }else {
        response.writeHead(404);
        response.end('Not found');
    }
     // __dirname : 현재 디렉토리 위치, url : 실행중인 파일의 이름
    
});

app.listen(port);