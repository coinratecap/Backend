const User = require("../models/User");
const FacebookInfo = require('../models/FacebookInfo')
const GoogleInfo = require('../models/GoogleInfo')


exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};


exports.getUserByEmail = async (email) => {
    const user = await User.findOne({
        email: email
    }).exec();
    return user
}

exports.getUserById = async (id) => {
    const user = await User.findById(id).exec();
    return user
}

exports.getUserByFacebookId = async (id) => {
    const facebookInfo = await User.findOne({
        "facebookInfo.facebookId": id
    }).exec();
    return user
}

exports.getUserByGoogleId = async (id) => {
    const user = await User.findOne({
        "googleInfo.googleId": id
    }).exec();
    return user
}

// this is for users trying to reset password
// this is to check if the generated token exists and the token expiration time is greater than the current date(Date.now())
exports.getUserByResetToken = async (token, date) => {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }).exec();
    return user
}

exports.createUser = async payload => {
    const user = await User.create(payload);
    return user
}

exports.updateUser = async (id, payload) => {
    const user = await User.findByIdAndUpdate(id, payload, {
        new: true
    }).exec()
    return user
}