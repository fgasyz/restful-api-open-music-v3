/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
const Joi = require('joi');

const ExportPlaylistPayloadSchema = Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportPlaylistPayloadSchema;
