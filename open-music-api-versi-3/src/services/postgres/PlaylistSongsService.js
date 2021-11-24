/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsService {
    constructor(cacheService) {
        this._pool = new Pool();
        this._cacheService = cacheService;
    }

    async addSongToPlaylist(playlistId, songId) {
        const id = `songplaylist-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Lagu gagal ditambahkan ke playlist');
        }
        await this._cacheService.delete(`playlistSongs:${playlistId}`);
    }

    async getSongsFromPlaylist(playlistId) {
        try {
            // mendapatkan catatan dari cache
            const result = await this._cacheService.get(`playlistSongs:${playlistId}`);
            return JSON.parse(result);
        } catch (error) {
            const query = {
                text: `SELECT songs.id, songs.title, songs.performer FROM songs
                LEFT JOIN playlistsongs ON songs.id = playlistsongs.song_id
                WHERE playlistsongs.playlist_id = $1`,
                values: [playlistId],
            };

            const result = await this._pool.query(query);
            const mappedResult = result.rows;

            await this._cacheService.set(`playlistSongs:${playlistId}`, JSON.stringify(mappedResult));

            return mappedResult;
        }
    }

    async deleteSongFromPlaylist(playlistId, songId) {
        const query = {
            text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
            values: [playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Lagu gagal dihapus');
        }
        await this._cacheService.delete(`playlistSongs:${playlistId}`);
    }

    async verifyPlaylistOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM playlists WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Playlist tidak ditemukan');
        }

        const playlist = result.rows[0];

        if (playlist.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try {
            await this.verifyPlaylistOwner(playlistId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
        }
    }
}

module.exports = PlaylistSongsService;
