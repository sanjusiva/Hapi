const Hapi = require('@hapi/hapi');
const Qs = require('qs');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    query: {
        parser: (query) => Qs.parse(query)
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
//query parameters
        return request.query;
    }
});

const init = async () => {

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
