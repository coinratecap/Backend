const userRepository = require('../services/user');
const socialMediaRepository = require('../services/socialmedia')

const {
    hash,
    compare
} = require('../../utils/bcrypt')
const {
    sign
} = require("../../utils/jwt");
const passport = require('passport');
const User = require('../models/User');


exports.logoutUser = (req, res) => {
    req.logout();
    res.redirect('/v1/user/login')
}

exports.registerUser = async (req, res) => {
    try {
        let payload = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            photo: req.body.photo,
        }
        const password = req.body.password

        let user = await userRepository.registerUser(payload, password)
        let googleInfo = await socialMediaRepository.getGoogleInfoByEmail(user.email)
        let facebookInfo = await socialMediaRepository.getFacebookInfoByEmail(user.email)
        if (googleInfo) {
            user = userRepository.updateUser(user.id, {
                googleInfo
            })
        }
        if (facebookInfo) {
            user = userRepository.updateUser(user.id, {
                facebookInfo
            })
        }
        res.status(200).json({
            msg: "user created",
            status: true,
            data: user
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: err,
            status: false
        })
    }
}


exports.onSuccessfulLocalLogin = async (req, res, next) => {
    const user = req.user
    if (user) {
        console.log('Logged in user : ', user)
        res.redirect('/v1/user/login')
    } else {
        console.log(err)
        res.status(400).json({
            error: err,
            status: false
        })

    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let users = await userRepository.getAllUsers();
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: err,
            status: false
        })
    }
}

exports.authenticateUserWithGoogle = passport.authenticate('google', {
    scope: ['profile', 'email'],
})

exports.authenticateUserWithFacebook = passport.authenticate('facebook', {
    scope: ['email', 'user_age_range', 'user_gender', 'user_birthday']
})

exports.handleFacebookAuthenticationCallback = async (req, res, next) => {
    const user = req.user
    console.log('logging user : ', user)
    if (!user) {
        res.status(400).json({
            msg: `Invalid Login Details`,
            status: 400
        })
    } else {
        res.status(200).json({
            success: true,
            msg: 'Facebook Login success',
            user
        })
    }
}

exports.handleGoogleAuthenticationCallback = async (req, res, next) => {
    const user = req.user
    console.log('logging user : ', user)
    if (!user) {
        res.status(400).json({
            msg: `Invalid Login Details`,
            status: 400
        })
    } else {
        res.status(200).json({
            success: true,
            msg: 'Google Login success',
            user
        })
    }
}