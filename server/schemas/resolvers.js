const { AuthenticationError } = require('apollo-server-express');
const { User, Attraction, Comment, Reply, Post, Rating, Category, Year, Park } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get all categories
        categories: async () => {
            return await Category.find();
        },
        // get all years
        years: async () => {
            return await Year.find();
        },
        // get all parks
        parks: async () => {
            return await Park.find();
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
                .populate({
                    path: 'savedAttractions',
                    populate: {
                        path:'park',
                        model: 'Park'
                    }
                })
                .populate({
                    path: 'savedAttractions',
                    populate: {
                        path:'year',
                        model: 'Year'
                    }
                })
                .populate({
                    path: 'savedAttractions',
                    populate: {
                        path:'category',
                        model: 'Category'
                    }
                });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password').select('-__v -password')
                    .populate({
                        path: 'savedAttractions',
                        populate: {
                            path:'park',
                            model: 'Park'
                        }
                    })
                    .populate({
                        path: 'savedAttractions',
                        populate: {
                            path:'year',
                            model: 'Year'
                        }
                    })
                    .populate({
                        path: 'savedAttractions',
                        populate: {
                            path:'category',
                            model: 'Category'
                        }
                    });
                return userData
            }
            throw new AuthenticationError('Cannot find a user with this id!');
        },
        attractions: async (parent, { category, name, year, park}) => {
            const params = {};
            if (name) {
                params.name = { $regex: name };
            }
            if (category) { params.category = category }
            if (year) { params.year = year }
            if (park) { params.park = park }

            return await Attraction.find(params)
                .populate('category')
                .populate('year')
                .populate('park')
                .populate('comments');
        },
        attraction: async (parent, { _id }) => {
            return await Attraction.findOne({ _id: _id })
                .populate('category')
                .populate('year')
                .populate('park')
                .populate('comments');
        },
        posts: async (parent, args) => {
            return await Post.find()
                .populate('comments');
        },
        post: async (parent, { _id }) => {
            return await Post.findOne({ _id: _id })
                .populate('comments');
        },
        comment: async (parent, { _id }) => {
            return await Comment.findOne({ _id: _id })
                .populate('replies');
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
            if(context.user) {
                const attractionData = await Attraction.findById(attractionId);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedAttractions: attractionData } },
                    { new: true, runValidators: true } 
                ).populate('savedAttractions');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in.');
        },
        removeAttraction: async (parent, { _id }, context) => {
            if(context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedAttractions: { _id: _id } } },
                    { new: true } 
                ).populate('savedAttractions');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in.');
        },
        addPostComment: async (parent, args, context) => {
            if(context.user) {
                const comment = await Comment.create({ username: context.user.username, commentBody: args.commentBody, createdAt: args.createdAt });

                await Post.findByIdAndUpdate(
                    { _id: args.postId },
                    { $push: { comments: comment._id } },
                    { new: true }
                );

                return comment;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addAttractionComment: async (parent, args, context) => {
            if(context.user) {
                const comment = await Comment.create({ username: context.user.username, commentBody: args.commentBody });

                await Attraction.findByIdAndUpdate(
                    { _id: args.attractionId },
                    { $push: { comments: comment } },
                    { new: true }
                );

                return comment;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addReply: async (parent, args, context) => {
            const reply = await Reply.create({ replyBody: args.replyBody, username: context.user.username });

            if(context.user){
                await Comment.findOneAndUpdate(
                    { _id: args.commentId },
                    { $push: { replies: reply } },
                    { new: true, runValidators: true }
                );

                return reply;
            }

            throw new AuthenticationError('You need to be logged in.');
        },
        addRating: async (parent, args, context) => {
            if(context.user){
                return Rating.create(args);
            }

            throw new AuthenticationError('You need to be logged in.');
        }
    }
};


module.exports = resolvers;
