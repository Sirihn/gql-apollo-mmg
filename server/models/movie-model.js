const { model, Schema, ObjectId } = require('mongoose');

const movieSchema = new Schema (
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        yearOfPublication: {
            type: Number,
            required: true
        },
        isInTheaters: {
            type: Boolean,
            required: true
        }
    }
);

const Movie = model('Movie', movieSchema);
module.exports = Movie