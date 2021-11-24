/* eslint-disable indent */
const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists/{playlistId}/songs',
        handler: handler.postSongToPlaylistByIdHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists/{playlistId}/songs',
        handler: handler.getSongFromPlaylistByIdHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{playlistId}/songs',
        handler: handler.deleteSongFromPlaylistByIdHandler,
        options: {
            auth: 'musicapp1_jwt',
        },
    },
];

module.exports = routes;
