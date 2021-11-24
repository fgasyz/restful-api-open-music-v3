/* eslint-disable indent */
/* eslint-disable quotes */
const Joi = require("joi");

const AddSongPayloadSchema = Joi.object({
    songId: Joi.string().required(),
});

module.exports = {
    AddSongPayloadSchema,
};
