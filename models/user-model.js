const { model, Schema, ObjectId } = require('mongoose');

const userSchema = new Schema (
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        nationality: {
            type: String,
            enum: ['CANADA','BRAZIL','INDIA','GERMANY','CHILE'],
            required: true
        },
        friends: [this]
    }
);

const User = model('User', userSchema);
module.exports = User