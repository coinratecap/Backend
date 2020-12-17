const User = require("../models/User");


exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
};


exports.getUserByEmail = async (email) => {
    const user = await User.findOne({
        email: email
    });
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
    });
    return user
}

exports.createUser = async payload => {
    const user = await User.create(payload);
    return user
}

exports.updateUser = async (id, payload) => {
    const user = await User.findByIdAndUpdate(id, payload, { new: true })
    return user
}