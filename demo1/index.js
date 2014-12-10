var http = require('http');
var url = require('url');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World!\n');
// }).listen(3000, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:3000/');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var query = require('url').parse(req.url,true).query;
  res.end('<h1>Hello '+query.name+'!</h1>');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
