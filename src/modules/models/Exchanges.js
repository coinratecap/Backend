const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const exchangeSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    volume: {
        type: Number,
        required: [true, 'Volume is required']
    },
    trust: {
        type: Number,
        required: [true, 'Trust value is required']
    },
    trustRank: {
        type: Number,
        required: [true, 'Trust Rank is required']
    },
    centralized: {
        type: Boolean,
        required: [true, 'Centralized field is required'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    website: {
        type: String,
        required: [true, 'website is required'],
    },
    facebook: {
        type: String,
        required: [true, 'Technical Doc URL is required'],
    },
    twitter: {
        type: String,
        required: [true, 'Twitter URL is required'],
    },
    reddit: {
        type: String,
        required: [true, 'Reddit URL is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Exchange", exchangeSchema);
exchangeSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});