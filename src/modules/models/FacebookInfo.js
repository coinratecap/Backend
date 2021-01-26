const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const FacebookInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    facebookId: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
    birthday: {
        type: String,
        required: false,
    },
    profileUrl: {
        type: String,
        required: false,
    },
    provider: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("FacebookInfo", FacebookInfoSchema);
FacebookInfoSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});