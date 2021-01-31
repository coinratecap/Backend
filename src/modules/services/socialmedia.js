const FacebookInfo = require("../models/FacebookInfo");
const GoogleInfo = require("../models/GoogleInfo");
const userRepository = require('../services/user')

exports.getFacebookInfoByFacebookId = async (id) => {
    const facebookInfo = await FacebookInfo.findOne({
        facebookId: id
    }).exec();
    return facebookInfo
}

exports.getGoogleInfoByGoogleId = async (id) => {
    const googleInfo = await GoogleInfo.findOne({
        googleId: id
    }).exec();
    return googleInfo
}

exports.getGoogleInfoByEmail = async (email) => {
    const googleInfo = await GoogleInfo.findOne({
        email
    }).exec();
    return googleInfo
}

exports.getFacebookInfoByEmail = async (email) => {
    const facebookInfo = await FacebookInfo.findOne({
        email
    }).exec();
    return facebookInfo
}

exports.createFacebookInfo = async (payload) => {
    return await FacebookInfo.create(payload)
}

exports.createGoogleInfo = async (payload) => {
    const googleUser = await GoogleInfo.create(payload)

    const user = await userRepository.getUserByEmail(googleUser.email)
    if (user) {
        console.log('old user exists with same email : ', user)
        const updatedUser = await userRepository.updateUser(user.id, {
            googleInfo: googleUser.id
        })
        console.log('old user updated to : ', updatedUser)
    }

    return googleUser
}