/* eslint-disable indent */
const routes = require('./routes');
const PlaylistsHandler = require('./handler');

module.exports = {
    name: 'playlists',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const playlistsHandler = new PlaylistsHandler(service, validator);

        server.route(routes(playlistsHandler));
    },
};
