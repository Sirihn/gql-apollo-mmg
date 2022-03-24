const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user-model');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        user: async (_, args) => {
            const id = args.id;
            const user = await User.findOne({ id: id });
            return user;
        }
    }
}

module.exports = { resolvers }; 