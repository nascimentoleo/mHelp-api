'use strict'

var xmpp = require('node-xmpp-server')
var server = null

var startServer = function (done) {
  // Sets up the server.
  server = new xmpp.C2S.TCPServer({
    port: 5222,
    domain: 'localhost'
  })

  // On connection event. When a client connects.
  server.on('connection', function (client) {
   console.log("Cliente " + client.fid + " conectado !"); 
  }) 

  server.on('listening', done)
}


startServer(function () {
  console.log("Servidor rodando!"); 
    
}) 