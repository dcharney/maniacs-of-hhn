const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const yearSchema = new Schema({
    year: {
        type: String,
        required: true,
        trim: true
    }
});

const parkSchema = new Schema({
    park: {
        type: String,
        required: true,
        trim: true
    }
});

const Category = mongoose.model('Category', categorySchema);
const Year = mongoose.model('Year', yearSchema);
const Park = mongoose.model('Park', parkSchema);

module.exports = { Category, Year, Park };