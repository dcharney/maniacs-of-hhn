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

const attractionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		logo: {
			type: String,
			required: true,
			trim: true
		},
		location: {},
		category: {
			type: String,
			trim: true
		},
		year: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
	}
);

const Attraction = model('Attraction', attractionSchema);

module.exports = Attraction;