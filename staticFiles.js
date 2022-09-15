'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
        port: 3000,
        host:'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/img',
        handler: function (request, h) {
            //rendering specific img
            return h.file('aspireLogo.jpg');
        }
    });
    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: {
            //rendering images based on the route parameters
            file: function (request) {
                return request.params.filename;
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();