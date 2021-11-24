/* eslint-disable indent */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/exports/playlists/{playlistId}',
        handler: handler.postExportPlaylistByIdHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
];

module.exports = routes;
