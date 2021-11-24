/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const ClientError = require('../../exceptions/ClientError');

class MusicsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postMusicHandler = this.postMusicHandler.bind(this);
        this.getMusicsHandler = this.getMusicsHandler.bind(this);
        this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
        this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this);
        this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);
    }

    async postMusicHandler(request, h) {
        try {
            this._validator.validateMusicPayload(request.payload);
            const { title, year, performer, genre, duration } = request.payload;

            const musicId = await this._service.addMusic({ title, year, performer, genre, duration });

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data: {
                    songId: musicId,
                },
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

    async getMusicsHandler() {
        const musics = await this._service.getMusics();

        if (musics) {
            return {
                status: 'success',
                data: {
                    songs: musics,
                },
            };
        }
        return {
            status: 'success',
            data: {
                songs: [musics],
            },
        };
    }

    async getMusicByIdHandler(request, h) {
        try {
            const { songId } = request.params;
            const music = await this._service.getMusicById(songId);

            return {
                status: 'success',
                data: {
                    song: music,
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

    async putMusicByIdHandler(request, h) {
        try {
            this._validator.validateMusicPayload(request.payload);
            const { songId } = request.params;
            await this._service.editMusicById(songId, request.payload);

            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui',
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

    async deleteMusicByIdHandler(request, h) {
        try {
            const { songId } = request.params;
            await this._service.deleteMusicById(songId);
            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: 'Lagu gagal dihapus. Id tidak ditemukan',
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

module.exports = MusicsHandler;
