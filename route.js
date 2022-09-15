'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const servers = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    servers.route({
        method: 'GET',
        path: '/hello/{user*2}/{joen}',
        handler: function (request, h) {
            const userParts = request.params.user.split('/');
            return `Hello ${userParts[0]} ${userParts[1]} ${request.params.joen}!`;
        }
    });
    servers.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
    
            return request.query;
        }
    });
    servers.route({
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {

            return '404 Error! Page Not Found!';
        }
    });
    

    await servers.start();
    console.log('Server running on %s', servers.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
