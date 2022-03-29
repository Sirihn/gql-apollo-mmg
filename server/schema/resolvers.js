const ObjectId = require('mongoose').Types.ObjectId;
const Movie = require('../models/movie-model');
const User = require('../models/user-model');

const resolvers = {
    Query: {
        //USER RESOLVERS
        users: async () => {
            const users = await User.find();
            if(users) return {users: users};
            return { message: "Error getting users" };
        },
        user: async (parent, args, context, info) => {
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
    },
    User: {
        favoriteMovies: async (parent) => {
            console.log(parent);
            return await User.find({}, 'friends');
        }
    },
    Mutation: {
        createUser: async (_, args) => {
            const { name, username, age, nationality } = args.input;


            const newestUser = await User.find().sort("-id").limit(1).findOne();
            const id = newestUser.id + 1;

            const newUser = new User({
                id: id,
                name: name,
                username: username,
                age: age,
                nationality: nationality
            });

            await newUser.save();
            return newUser;
        },
        updateUsername: async (_,args) => {
            const id = args.input.id;
            const newUsername = args.input.username;

            const updatedUser = await User.findOneAndUpdate({id: id}, {username: newUsername});
            return updatedUser;
        },
        deleteUser: async(_,args) => {
            const id = args.id;
            const deletedUser = await User.findOneAndDelete({id: id});
            return deletedUser;
        }
    },
    UsersResult: {
        __resolveType(obj) {
            if(obj.users){
                return "UsersSuccessfulResult";
            }
            if(obj.message)
                return "UsersErrorResults";
            return null;
        }
    }
};

module.exports = { resolvers }; 