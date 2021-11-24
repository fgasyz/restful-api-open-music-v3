/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable padded-blocks */
/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MusicsService {
    constructor() {
        this._musics = [];

    }

    addMusic({ title, year, performer, genre, duration }) {
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const newMusic = {
            title, year, performer, genre, duration, id, insertedAt, updatedAt,
        };
        newMusic.year = Number(newMusic.year);
        newMusic.duration = Number(newMusic.duration);

        this._musics.push(newMusic);

        const isSuccess = this._musics.filter((music) => music.id === id).length > 0;

        if (!isSuccess) { throw new InvariantError('Lagu gagal ditambahkan'); }
        return id;
    }

    getMusics() {
        const resultMusics = this._musics.map((music) => ({
            id: music.id,
            title: (music.title !== undefined) ? music.title : null,
            performer: music.performer,
        }));

        if (this._musics.length !== 0) {
            return resultMusics;
        }
    }

    getMusicById(id) {
        const music = this._musics.filter((m) => m.id === id)[0];
        if (!music) { throw new NotFoundError('Lagu tidak ditemukan'); }
        return music;
    }

    editMusicById(id, { title, year, performer, genre, duration }) {

        const index = this._musics.findIndex((music) => music.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();
        this._musics[index] = {
            ...this._musics[index],
            title,
            year,
            performer,
            genre,
            duration,
            updatedAt,
        };
        this._musics[index].year = Number(this._musics[index].year);
        this._musics[index].duration = Number(this._musics[index].duration);

    }

    deleteMusicById(id) {
        const index = this._musics.findIndex((music) => music.id === id);
        if (index === -1) {
            throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
        }
        this._musics.splice(index, 1);
    }
}

module.exports = MusicsService;