const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
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
  facebookId: {
    type: String,
  },
  googleId: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'others']
  },
  phone: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
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

module.exports = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator, {
  message: `{PATH} already in use`
});