/* eslint-disable indent */
const MusicsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'music',
    version: '1.2.0',
    register: async (server, { service, validator }) => {
        const musicsHandler = new MusicsHandler(service, validator);
        server.route(routes(musicsHandler));
    },
};
