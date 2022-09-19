'use strict';

const Hapi = require('@hapi/hapi');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_App')
    .then(() => console.log('MongoDB connected....'))

let detailSchema = {
        name: String,
        age: Number,
        id: String
    }

const Detail = mongoose.model('Details', detailSchema);

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/get',
        handler: async (request, h) => {
            let params = request.query
            let infos = await Detail.find(params);
            return h.response(infos);
        }
    });

    server.route({
        method: 'POST',
        path: '/post',
        handler: async (request, h) => {
            let info = request.payload;
            let newInfo = new Detail(info);
            await newInfo.save((err, data) => {
                if (err) return console.log(err);
            })
            return h.response("Success");
        }
    });

    server.route({
        method: 'PUT',
        path: '/put/{id}',
        handler: async (request, h) => {
            let params = request.params.id;
            let info = request.payload;
            let infos = await Detail.updateOne({ id: params }, info).lean();
            return h.response(infos);
        }
    });

    server.route({
        method: 'DELETE',
        path: '/delete/{id}',
        handler: async (request, h) => {
            let params = request.params.id;
            let infos = await Detail.remove({ id: params });
            return h.response(infos);
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