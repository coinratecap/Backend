const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    shortDescription: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Blog", blogSchema);
blogSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});