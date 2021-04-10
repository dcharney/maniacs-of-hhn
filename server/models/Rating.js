/* 
-Ratings
	-username
	-attraction id?
	-scare factor
	-crowd index
	-overall rating(not part of database. Pulled from stats of other database info.)
*/

const { Schema, model } = require('mongoose');

const ratingSchema = new Schema(
	{
		username: {
			type: String,
			trim: true
		},
		attractionId: {
			type: String,
			required: true
		},
		scareFactor: {
			type: Number
		},
		crowdIndex: {
			type: Number
		}
	},
	{
		toJSON: {
			virtuals: true
		}
	}
);

const Rating = model('Rating', ratingSchema);

module.exports = Rating;