const User = require("../models/User");
const FacebookInfo = require('../models/FacebookInfo')
const GoogleInfo = require('../models/GoogleInfo')


exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};


exports.getUserByEmail = async (email) => {
    const user = await User.findByUsername(email,false).exec();
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

exports.registerUser = async (payload, password) => {
    const user = await User.register(payload, password);
    return user
}

exports.loginUser = async (email, password) => {
    const result = await User.authenticate()(email,password)
    return result;
}

exports.updateUser = async (id, payload) => {
    const user = await User.findByIdAndUpdate(id, payload, {
        new: true
    }).exec()
    return user
}