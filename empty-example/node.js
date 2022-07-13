let handleRequest = function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
};

const http = require('http');
let server = http.createServer(handleRequest);
server.listen(8080);
