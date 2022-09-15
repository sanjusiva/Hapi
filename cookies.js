const Hapi = require('@hapi/hapi');
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.state("firstVisit", {
        ttl: null,
        isSecure:  false,
        isHttpOnly: true,
        clearInvalid: false,
        strictHeader: true
  });
    server.route({
        path: '/',
        method: 'GET',
        async handler(request, h) {
            //setting cookie
            return h.response(`Cookie!`).state('data', 'cookie-value');
        },
    });
    server.route({
        path: '/home',
        method: 'GET',
        async handler(request, h) {
            //setting cookie
            return h.response(`Cookie!`).state('secondVisit', 'cookie-value1');
        },
    });
    server.route({
        path: '/overridding',
        method: 'GET',
        async handler (request, h) {
            //overridding
          return h.response('Hello').state('data', 'test', { encoding: 'none' });
        },
      });
      server.route({
        path: '/getCookie',
        method: 'GET',
        async handler (request, h) {
            //getting cookie value
            const value = request.state.data;
          return value;
        },
      });
      server.route({
        path: '/clear',
        method: 'GET',
        async handler (request, h) {
            //clearing one cookie
            return h.response('Bye').unstate('data');
        },
      });

      server.route({
        path: '/clearAll',
        method: 'GET',
        async handler (request, h) {
            //clearing all cookies
            return h.response('Bye').unstate('data').unstate('secondVisit');
        },
      });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();