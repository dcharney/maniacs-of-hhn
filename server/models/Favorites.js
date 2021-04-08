const { Schema, model } = require('mongoose');
/*
-Favorites
	-username
	-attraction id?, post id?,
	-type= attraction?, post?
*/
const favoritePostSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    }
);

const favoriteAttractionSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        attraction: {
            type: Schema.Types.ObjectId,
            ref: 'Attraction'
        }
    }
);

module.exports = favoritePostSchema, favoriteAttractionSchema;

