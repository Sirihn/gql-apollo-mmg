const ObjectId = require('mongoose').Types.ObjectId;
const Movie = require('../models/movie-model');
const User = require('../models/user-model');

const resolvers = {
    Query: {
        //USER RESOLVERS
        users: async () => {
            return await User.find();
        },
        user: async (_, args) => {
            const id = args.id;
            const user = await User.findOne({ id: id });
            return user;
        },

        //MOVIE RESOLVERS
        movies: async () => {
            return await Movie.find();
        },
        movie: async (_, args) => {
            const name = args.name;
            const movie = await Movie.findOne({ name: name });
            return movie;
        }
    }
}

module.exports = { resolvers }; 