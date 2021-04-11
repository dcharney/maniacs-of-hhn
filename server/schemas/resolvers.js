const { AuthenticationError } = require('apollo-server-express');
const { User, Attraction, Comment, Post, Rating } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password');
                return userData
            }
            throw new AuthenticationError('Cannot find a user with this id!');
        },
        attractions: async (parent, args) => {
            return await Attraction.find();
        },
        attraction: async (parent, { _id }) => {
            return await Attraction.findOne({ _id: _id });
        },
        posts: async (parent, args) => {
            return await Post.find();
        },
        post: async (parent, { _id }) => {
            return await Post.findOne({ _id: _id });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});
            if (!user) {
                throw new AuthenticationError('There is no account associated with this email.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.')
            }
            const token = signToken(user);

            return { token, user }
        },
        savePost: async (parent, { postId }, context) => {
            if(context.user){
                const postData = await Post.findById(postId);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { favoritePost: postData } },
                    { new: true, runValidators: true } 
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in.');
        },
        saveAttraction: async (parent, {attractionId }, context) => {
            if(context.user){
                const attractionData = await Attraction.findById(attractionId);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { favoritePost: attractionData } },
                    { new: true, runValidators: true } 
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in.');
        },
        addPostComment: async (parent, args, context) => {},
        addAttractionComment: async (parent, args, context) => {},
        addReply: async (parent, args, context) => {},
        addRating: async (parent, args, context) => {}
    }
};


module.exports = resolvers;
