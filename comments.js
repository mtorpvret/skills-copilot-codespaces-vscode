// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var comments = [];

var server = http.createServer(function(request, response) {
  var urlParts = url.parse(request.url);
  if (urlParts.pathname === '/') {
    fs.readFile('./index.html', function(error, data) {
      response.end(data);
    });
  } else if (urlParts.pathname === '/comments' && request.method === 'GET') {
    response.end(JSON.stringify(comments));
  } else if (urlParts.pathname === '/comments' && request.method === 'POST') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      var comment = qs.parse(body);
      comments.push(comment);
      response.end('{"status": "ok"}');
    });
  } else {
    response.statusCode = 404;
    response.end('Not found');
  }
});

server.listen(3000);
console.log('Server is running on http://localhost:3000');