'use strict'

const Hapi = require('hapi');
var fs     = require('fs');
const server = new Hapi.Server();

server.connection({ 
  port: 8080,
  host: 'localhost' 
});

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
      reply('mHelp API');
  }
});

server.route({
  method: 'POST',  
  path: '/upload',  
  config: {  
  payload: {
      maxBytes: 209715200,
      output: 'stream',
      parse: false
  }
  },
    handler: function(request, reply) {
      var multiparty = require('multiparty');
      var form = new multiparty.Form();
      form.parse(request.payload, function(err, fields, files) {
        fs.readFile(files.file.path, function (err, data){
            var newPath = "uploads/" + files.file.originalFilename;
            
            fs.writeFile(newPath, data, function (err) {
              if(err)
                return reply({'response':"Error"});
            });         
        });  
        return reply({'response':"Saved"});
      });
    }
    
});

