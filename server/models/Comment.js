/*
-Comments
	-username
	-comment body
	-created at
	-[replies]
*/

/*
-Replies
	-username
	-reply body
	-created at
*/
const { Schema, model } = require('mongoose');

const replySchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true
		},
		replyBody: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	}
);

const commentSchema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		commentBody: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		replies: [replySchema]
	}
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;