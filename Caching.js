const Hapi = require('@hapi/hapi'); const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        path: '/{ttl?}',
        method: 'GET',
        handler(request, h) {
            const response = h.response({
                hello: 'world'
            });
            if (request.params.ttl) {
                console.log("yes");
                response.ttl(request.params.ttl);
                return request.params.ttl;
            }
            return response;
        },
        options: {
            cache: {
                expiresIn: 30 * 1000,
                privacy: 'private'
            }
        }
    }); 
    server.route({
        method: 'GET',
        path: '/home',
        handler: function (request, h) {
          return h.response('ok').header('Cache-Control', 'no-cache, no-store, must-revalidate');
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