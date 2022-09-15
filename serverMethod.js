'use strict';

const Hapi = require('@hapi/hapi');
var add = function (num1, num2, next) {
    next(null, (num1 + num2) + '\n')
  }
const init = async () => {

    const servers = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    servers.route({
        method: '*',
        path: '/home/{id}',
        handler: (request, h) => {
            const id = request.params.id;
            return id+' Hello';
        }
    });
    servers.method('add', add, {
        cache: {
          expiresIn: 10 * 1000,   // 10 seconds 
          staleIn : 2 * 1000,
          staleTimeout : 100,
          generateTimeout: 100
        },
        generateKey: function(num1, num2) {
          return num1 +'+'+ num2;
        }
      })
      
      servers.route([{
          method: 'GET',
          path: '/add',//http://localhost:3000/add?number1=8&number2=8
          handler: function (request, reply) {
            var number1 = parseInt(request.query['number1'])
            var number2 = parseInt(request.query['number2'])
            servers.methods.add(number1, number2, function(error, result) {
                console.log(result||error);
            });
            return number1+number2+" is the answer";
          }
      }]);


    await servers.start();
    console.log('Server running on %s', servers.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
