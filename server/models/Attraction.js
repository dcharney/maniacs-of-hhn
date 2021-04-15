/*
-Attraction
	-name
	-logo
	-location
	-category
	-year
	-description
	-[comments]
*/

const { Schema, model } = require('mongoose');

const imapSchema = new Schema(
	{
		top: {
			type: Number,
			required: true,
			trim: true
		},
		left: {
			type: Number,
			required: true,
			trim: true
		}
	}
)

const attractionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		logo: {
			type: String,
			trim: true
		},
		park: {
			type: Schema.Types.ObjectId,
			ref: 'Park',
			required: true
		},
		year: {
			type: Schema.Types.ObjectId,
			ref: 'Year',
			required: true
		},
		description: {
			type: String,
			trim: true
		},
		imap: imapSchema,
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		],
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		}
	}
);

const Attraction = model('Attraction', attractionSchema);

module.exports = Attraction;