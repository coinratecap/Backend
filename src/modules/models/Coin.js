const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    website: {
        type: String,
        required: [true, 'website is required'],
    },
    explorers: {
        type: Array,
    },
    community: {
        type: Array,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Coin", coinShema);
coinShema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});