'use strict'

const Hapi = require('hapi');
var fs     = require('fs');
const server = new Hapi.Server();
const Inert = require('inert');

server.connection({ 
  port: 8000 
});

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

server.register(Inert, () => {});

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

server.route({  
  method: 'GET',
  path: '/delete/{filename?}',
  handler: function(request, reply) {
    var path = "uploads/" + request.params.filename;
    fs.unlink(path, function(err,data){
        if (err)
          return reply({'response':"Error"});
        
        return reply({'response':"Deleted"});
    });  
  }
  
});

server.route({  
  method: 'GET',
  path: '/download/{param*}',
  handler:{
    directory:{
      path: 'uploads'
    }
  }
});
