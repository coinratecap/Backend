const userRepository = require('../services/user');
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


exports.loginUser = async (req, res, next) => {
    console.log('request after login : ', req)
    try {
        let {
            email,
            password
        } = req.body;
        let loginResult = await userRepository.loginUser(email, password);
        if (loginResult.error) {
            throw loginResult.error
        }
        if (loginResult.user) {
            res.status(200).json({
                success: true,
                data: loginResult.user
            })
        }
    } catch (err) {
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

exports.authenticateUserWithFacebook = passport.authenticate('facebook', {})

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
            msg: 'Google Login success',
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
        let token = await sign(user);
        res.status(200).json({
            success: true,
            msg: 'Google Login success',
            user
        })
    }
}