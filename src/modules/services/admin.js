const Admin = require("../models/Admin");

exports.getAllAdmins = async () => {
    const admins = await Admin.find();
    return admins;
};

exports.getAdminByEmail = async email => {
    const admin = await Admin.findOne({
        email: email
    });
    return admin
}

// this is for admins trying to reset password
// this is to check if the generated token exists and the token expiration time is greater than the current date(Date.now())
exports.getAdminByResetToken = async (token, date) => {
    const admin = await Admin.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });
    return admin
}


exports.createAdmin = async payload => {
    const admin = await Admin.create(payload);
    return admin
}

exports.updateAdminInfo = async (id, payload) => {
    const admin = await Admin.findByIdAndUpdate(id, payload, { new: true })
    return admin
}