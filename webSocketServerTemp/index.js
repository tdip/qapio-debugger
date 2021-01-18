const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000');


const wsServer = new webSocketServer({
  httpServer: server
});

const msgserver = JSON.stringify({
  type: "message",
  msg: "sent from server"
});

var clients = [];

wsServer.on('request', function (request) {

  const connection = request.accept(null, request.origin);
  clients.push(connection);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      
      clients.forEach(function(client) {
        message = msgserver
        client.send(msgserver);
      })
}
})
});