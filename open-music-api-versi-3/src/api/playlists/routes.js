/* eslint-disable indent */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists',
        handler: handler.postPlaylistHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists',
        handler: handler.getPlaylistHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{playlistId}',
        handler: handler.deletePlaylistHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
];

module.exports = routes;
