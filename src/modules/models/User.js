const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First Name is required'],
  },
  last_name: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  facebookInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FacebookInfo",
    required: false,
  },
  googleInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GoogleInfo",
    required: false,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'others']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    unique: true,
  },
  photo: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})
userSchema.plugin(uniqueValidator, {
  message: `{PATH} already in use`
});
module.exports = mongoose.model("User", userSchema);