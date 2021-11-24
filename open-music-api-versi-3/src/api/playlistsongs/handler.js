/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
const ClientError = require('../../exceptions/ClientError');

class PlaylistSongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongToPlaylistByIdHandler = this.postSongToPlaylistByIdHandler.bind(this);
        this.getSongFromPlaylistByIdHandler = this.getSongFromPlaylistByIdHandler.bind(this);
        this.deleteSongFromPlaylistByIdHandler = this.deleteSongFromPlaylistByIdHandler.bind(this);
    }


    async postSongToPlaylistByIdHandler(request, h) {
        try {
            this._validator.validateSongPayload(request.payload);
            const { songId } = request.payload;
            const { playlistId } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyPlaylistOwner(playlistId, credentialId);
            await this._service.verifyPlaylistAccess(playlistId, credentialId);
            await this._service.addSongToPlaylist(playlistId, songId);

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan ke playlist',
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getSongFromPlaylistByIdHandler(request, h) {
        try {
            const { playlistId } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyPlaylistOwner(playlistId, credentialId);
            await this._service.verifyPlaylistAccess(playlistId, credentialId);

            const songs = await this._service.getSongsFromPlaylist(playlistId);

            return {
                status: 'success',
                data: {
                    songs,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteSongFromPlaylistByIdHandler(request, h) {
        try {
            const { playlistId } = request.params;
            const { songId } = request.payload;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyPlaylistOwner(playlistId, credentialId);
            await this._service.verifyPlaylistAccess(playlistId, credentialId);
            await this._service.deleteSongFromPlaylist(playlistId, songId);

            return {
                status: 'success',
                message: 'Lagu berhasil dihapus dari playlist',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = PlaylistSongsHandler;
