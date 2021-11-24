/* eslint-disable indent */
const InvariantError = require('../../exceptions/InvariantError');
const { AddSongPayloadSchema } = require('./schema');

const PlaylistSongsValidator = {
    validateSongPayload: (payload) => {
        const validationResult = AddSongPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },

};

module.exports = PlaylistSongsValidator;
