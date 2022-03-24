require('dotenv').config();
const {ApolloServer} = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/**import stuff
const userSchema = require("./models/user-model").schema;
const User = mongoose.model('User', userSchema);
const { UserList } = require("./FakeData");

UserList.forEach(element => {
    let testUser = new User({
        id: element.id,
        name: element.name,
        username: element.username,
        age: element.age,
        nationality: element.nationality,
        friends: element.friends,
        favoriteMovies: element.favoriteMovies
    });
    testUser.save(function(err){
        if(err)console.log(err);
    });
});
*/

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});

