/* eslint-disable indent */
const routes = require('./routes');
const PlaylistSongsHandler = require('./handler');

module.exports = {
    name: 'playlistSongs',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const playlistsongsHandler = new PlaylistSongsHandler(service, validator);

        server.route(routes(playlistsongsHandler));
    },
};
