const FacebookInfo = require("../models/FacebookInfo");
const GoogleInfo = require("../models/GoogleInfo");

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