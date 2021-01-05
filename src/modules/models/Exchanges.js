const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const exchangeSchema = mongoose.Schema({
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
        required: [true, 'Volume is required']
    },
    trust: {
        type: Boolean,
        required: [true, 'Trust value is required']
    },
    coin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coin'
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Exchange", exchangeSchema);
exchangeSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});