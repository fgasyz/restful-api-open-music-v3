/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
    constructor(service, validator, playlistsService, playlistOwner) {
        this._service = service;
        this._validator = validator;
        this._playlistsService = playlistsService;
        this._playlistOwner = playlistOwner;

        this.postExportPlaylistByIdHandler = this.postExportPlaylistByIdHandler.bind(this);
    }

    async postExportPlaylistByIdHandler(request, h) {
        try {
            this._validator.validateExportPlaylistPayload(request.payload);

            const { playlistId } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
            await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

            const message = {
                playlistId,
                targetEmail: request.payload.targetEmail,
            };

            await this._service.sendMessage('export:playlistSongs', JSON.stringify(message));

            const response = h.response({
                status: 'success',
                message: 'Permintaan Anda dalam antrean',
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

            // Server ERROR!
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

module.exports = ExportsHandler;
