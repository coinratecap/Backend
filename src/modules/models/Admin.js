const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required'],
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Admin", adminSchema);
adminSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});