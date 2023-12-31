const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                return user;
            };
        },
        users: async () => {
            const users = await User.find();
            return users;
        },
    },
    Mutation: {
        addUser: async (parent, args) =>{
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user){
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
    }

};

module.exports = resolvers;