const { Schema, model } = require('mongoose');
/*
-Favorites
	-username
	-attraction id?, post id?,
	-type= attraction?, post?
*/
const favoriteSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        posts: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        attractions: {
            type: Schema.Types.ObjectId,
            ref: 'Attraction'
        }
    }
);

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;

