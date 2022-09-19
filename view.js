'use strict';

const Hapi = require('@hapi/hapi');

const start = async () => {

    const server = Hapi.server({ 
        port: 8080,
        host: 'localhost' 
    });

    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        helpersPath: 'helpers'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.view('index');
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

start();