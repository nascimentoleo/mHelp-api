# mHelp-api

Api desenvolvida em Node.js com o objetivo de fornecer upload e download de arquivos à um servidor estático. Ela compõe o projeto mHelp, uma aplicação mobile desenvolvida como Monografia para o curso de Sistemas de Informação do Instituto Federal do Maranhão- IFMA.

A API possui 3 rotas:

- /upload: Possibilita o envio de um arquivo utilizando requisição multipart
- /download{filename*}: baixa um arquivo do servidor
- /delete{filename*}: exclui um arquivo do servidor

# Instalação

Basta executar o seguinte comando no diretório raiz do servidor

```sh
npm start
```
