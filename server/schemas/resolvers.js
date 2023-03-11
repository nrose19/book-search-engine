const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('./typeDefs');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user){
                const userData = await User
                .findOne({_id: context.user._id})
                .select("-_v -password")
                .populate('books');

                return userData;
            }

            throw new AuthenticationError ('You need to be logged in!')
        }
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User
            .findOne({email});

            if(!user){
                throw new AuthenticationError ('Incorrect credentials.')
            }

            const pass = await user
            .isCorrectPassword(password);

            if(!pass){
                throw new AuthenticationError ('Incorrect credentials.')
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveBooks: async (parent, { input }, context) => {
            if (context.user){
                const updateUser = await User
                .findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: input}},
                    {new: true},
                )
            return updateUser;
            }
            throw new AuthenticationError ('You need to be logged in!')
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user){
                const updateUser = await User
                .findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true},
                )
            return updateUser;
            }
            throw new AuthenticationError ('You need to be logged in!')
        }
    }
};

module.exports = resolvers;