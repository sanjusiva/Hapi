'use strict';

const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');

const users = {
    username: 'Sanjitha',
    password: 'sanju@123',
    name: 'Sanjitha Sivakumar',
    id: '1238'
};

const validate = (request, username, password) => {
    const user = users['username'];
    if (!user) {
        return { credentials: null, isValid: false };
    }
    let isValid;
    if (password == users['password']) {
        isValid = true;
    }
    else isValid = false
    const credentials = { id: users['id'], name: users['name'] };
    return { isValid, credentials };
};

const start = async () => {

    const server = Hapi.server({ port: 4000 });
    await server.register(require('@hapi/basic'));
    server.auth.strategy('simple', 'basic', { validate });
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: 'simple'
        },
        handler: function (request, h) {
            const name = validate().credentials.name
            return 'welcome ' + name;
        }
    });
    await server.start();
    console.log('server running at: ' + server.info.uri);
};

start();