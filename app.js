'use strict'

const Hapi   = require('hapi');
const server = new Hapi.Server();
var fs       = require('fs');
const Inert  = require('inert');

server.connection({ 
  port: 8000 
});

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log(`Servidor rodando em: ${server.info.uri}`);
});

//Habilita o fornecimento de pastas e diretórios estáticos
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
  //Configurações adicionais da carga útil que será recebida  
  payload: {
      maxBytes: 209715200, //Tamanho máximo do arquivo
      output: 'stream', 
      parse: false
  }
  },
    handler: function(request, reply) {
      var multiparty = require('multiparty');
      var form = new multiparty.Form();
      //Extrai o arquivo da requisição 
      form.parse(request.payload, function(error, fields, files) {
        fs.readFile(files.file.path, function (error, data){
            var endereco = "uploads/" + files.file.originalFilename;
            //Salva o arquivo no endereço especificado
            fs.writeFile(endereco, data, function (error) {
              if(error)
                return reply({'response':"Erro"});
            });         
        });  
        return reply({'response':"Salvo"});
      });
    }
    
});

server.route({  
  method: 'GET',
  path: '/delete/{filename*}',
  handler: function(request, reply) {
    var path = "uploads/" + request.params.filename;
    //Deleta o arquivo
    fs.unlink(path, function(err,data){
        if (err)
          return reply({'response':"Erro"});

        return reply({'response':"Deletado"});
    });  
  }
  
});

server.route({  
  method: 'GET',
  path: '/download/{filename*}',
  handler:{
    directory:{
      path: 'uploads'
    }
  }
});
