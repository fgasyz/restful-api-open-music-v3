/* eslint-disable max-len */
/* eslint-disable space-in-parens */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
const ExportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'exports',
    version: '1.0.0',
    // eslint-disable-next-line object-curly-newline
    register: async (server, { service, validator, playlistsService }) => {
        const exportsHandler = new ExportsHandler(service, validator, playlistsService);
        server.route(routes(exportsHandler));
    },
};
