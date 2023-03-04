// 12강 -> 수업의 정상
// Node.js & MySQL 13강부터
// https://www.youtube.com/watch?v=VToaABEsfbY&list=PLuHgQVnccGMAicFFRh8vFFFtLLlNojWUh&index=11
// 27장 - 수업의 정상(초보자는 여기까지만)
// arr.push : 파이썬의 리스트append와 동일 기능
// require는 파이썬의 import와 비슷한 의미이다 (모듈을 가져옴)
var port = 5000;
// var address = '52.78.68.113';

var http = require('http');
var url = require('url');
var qs = require('querystring');
// 리팩토링은 중요하다
var template = require('./lib/template.js');
var db = require('./lib/db');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){
            db.query('SELECT * FROM topic', function(error,topics){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(topics);
                var html = template.html(title, list,
                            `<h2>${title}</h2>${description}`,
                            `<a href="/create">create</a>`
                            );
                response.writeHead(200);
                response.end(html);

            });

        } else {

            db.query('SELECT * FROM topic', function(error,topics){
                if(error){
                    throw error;
                }
                db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id],function(error2, topic){
                    if(error2){
                        throw error2;
                    }
                    var title = topic[0].title;
                    var description = topic[0].description;
                    var list = template.list(topics);
                    var html = template.html(title, list,
                                `<h2>${title}</h2>
                                ${description}
                                <p>by ${topic[0].name}</p>
                                `,
                                `<a href="/create">create</a> 
                                <a href="/update?id=${queryData.id}">update</a>
                                <form action="/delete_process" method="post">
                                    <input type="hidden" name="id" value="${queryData.id}">
                                    <input type="submit" value="delete">
                                </form>`
                                );
                    response.writeHead(200);
                    response.end(html);
                })
                

            });
        }
        
    } else if(pathname === '/create'){

        db.query(`SELECT * FROM topic`, function(error,topics){
            db.query(`SELECT * FROM author`, function(error2, authors){
                var title = 'Create';
                var list = template.list(topics);
                var html = template.html(title, list,
                            `
                            <form action="/create_process" method="post">
                                <p><input type="text" name="title" placeholder="title"></p>
                                <p>
                                    <textarea name="description" placeholder="description"></textarea>
                                </p>
                                <p>
                                    ${template.authorSelect(authors)}
                                </p>
                                <p>
                                    <input type="submit">
                                </p>
                            </form>`,
                            `<a href="/create">create</a>`
                            );
            response.writeHead(200);
            response.end(html);
            });
            

        });
    } else if(pathname === '/create_process') {
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(`
            INSERT INTO topic (title, description, created, author_id)
             VALUES(?, ?, NOW(), ?);`,
             [post.title, post.description, post.author],
             function(error, result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location: `/?id=${result.insertId}`});
                response.end();  

             }
             )
        });

    } else if(pathname === '/update'){
        db.query(`SELECT * FROM topic`,function(error, topics){
            if(error){
                throw error;
            }
            db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id],function(error2, topic){
                if(error2){
                    throw error2;
                }
                db.query(`SELECT * FROM author`, function(error2, authors){
                    var list = template.list(topics);
                    var html = template.html(topic[0].title, list,
                        `
                        <form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${topic[0].id}">
                        <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                        <p>
                            <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                        </p>

                        <p>
                            ${template.authorSelect(authors, topic[0].author_id)}
                        </p>

                        <p>
                            <input type="submit">
                        </p>
                        </form>
                        `,
                        `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
                        );
                    response.writeHead(200);
                    response.end(html);
                });
                
                
            });  
        }); 

    } else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            
            db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?;`,[post.title, post.description, post.author, post.id],function(error, result){
                response.writeHead(302, {Location: `/?id=${post.id}`});
                response.end();

            })
        });

    } else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(`DELETE FROM topic WHERE id = ?`,[post.id], function(error, result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location: `/`});
                response.end();  

            });
        });

    } else {
        response.writeHead(404);
        response.end('Not found');
    }




     // __dirname : 현재 디렉토리 위치, url : 실행중인 파일의 이름
    
});

app.listen(port);