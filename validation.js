'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/hello/{name}',
        handler: function (request, h) {
            return `Hello ${request.params.name}!`;
        },
        options: {
            validate: {
                params: Joi.object({
                    //path parameter
                    name: Joi.string().min(3).max(10)
                })
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/posts',
        handler: function (request, h) {
            return request.query.limit;
        },
        options: {
            validate: {
                query: Joi.object({
                    //query parameter
                    limit: Joi.number().integer().min(1).max(50).default(10)
                })
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
