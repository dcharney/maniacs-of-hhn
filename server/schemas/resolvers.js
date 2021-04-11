const { AuthenticationError } = require('apollo-server-express');
const { User, Attraction, Comment, Post, Rating, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get all categories
        categories: async () => {
            return await Category.find();
        },
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
        attractions: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                  $regex: name
                };
            }

            return await Attraction.find(params).populate('category');
        },
        attraction: async (parent, { id }) => {
            const attractionData = await Attraction.findOne({ _id: id });
            return attractionData;
        },
        posts: async (parent, args) => {
            const postData = await Post.find();
            return postData;
        },
        post: async (parent, { id }) => {
            const postData = await Post.findOne({ _id: id });
            return postData;
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
    }
};


module.exports = resolvers;
