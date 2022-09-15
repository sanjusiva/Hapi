'use strict';

const Hapi = require('@hapi/hapi');

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


    await servers.start();
    console.log('Server running on %s', servers.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
