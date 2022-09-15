'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const servers = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    servers.route({
        method: 'GET',
        path: '/',
        options: {
            log: {
                collect: true
            }
        },
        handler: function (request, h) {
            request.log('error', 'Event error');
            return 'hello';
        }
    });
    servers.route({
        method: '*',
        path: '/home',
        handler: (request, h) => {
            servers.log(['test', 'error'], 'Test event');
            return 'Hello';
        }
    });


    await servers.start();
    console.log('Server running on %s', servers.info.uri);
    servers.events.on('request', (event, tags) => {
        if (tags) {
            console.log(`Request error: ${event.error ? event.error.message : 'unknown'}`);
        }
    });
    servers.events.on('log', (event, tags) => {
        if (tags) {
            console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
        }
    });
      
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
