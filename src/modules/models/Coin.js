const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    symbol: {
        type: String,
        required: [true, 'Symbol is required'],
    },

    is_active: {
        type: Boolean,
        required: [true, 'Status is required'],
    },
    logo: {
        type: String,
        required: [true, 'Logo is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Coin", coinSchema);
coinSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});