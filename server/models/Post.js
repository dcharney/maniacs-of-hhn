/*
-Post
	-category
	-image
	-title
	-content
	-[comments]
	-created at
*/

const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;