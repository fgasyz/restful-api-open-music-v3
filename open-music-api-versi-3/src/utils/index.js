/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
const mapDBToModelone = ({
    id,
    title,
    performer,

}) => ({
    id: id,
    title: title,
    performer: performer,
});

const mapDBToModeltwo = ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    inserted_at,
    updated_at,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    insertedAt: inserted_at,
    updatedAt: updated_at,
});

module.exports = { mapDBToModelone, mapDBToModeltwo };
