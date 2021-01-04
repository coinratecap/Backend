const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const exchangeShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    website: {
        type: String,
        required: [true, 'website is required'],
        unique: true,
    },
    volume: {
        type: Number,
        required: [true, 'Volume is required'],
        unique: true,
    },
    trust: {
        type: Boolean,
        required: [true, 'Trust value is required'],
        unique: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Exchange", exchangeShema);
exchangeShema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});