
let Hapi = require('@hapi/hapi');
 
let pluginRoot = {
    name: 'pluginRoot',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, h) {
                return 'Hello  ' + options.name;
            }
        });
    }
};
let pluginOne = {
    name: 'pluginOne',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/home',
            handler: function (request, h) {
                return 'Hi  ' + options.surname;
            }
        });
    }
};
 
let init = async() => {
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
    await server.register({
        plugin: pluginRoot,
        options: {
            name: 'Sanjitha'
        }
    });
    await server.register({
        plugin: pluginOne,
        options: {
            surname: 'Sivakumar'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();

