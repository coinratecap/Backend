const passport = require("passport");
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth')
const userRepository = require('../modules/services/user')

const port = process.env.PORT || 3000

passport.use(new FacebookStrategy.Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/user/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
    }
));

passport.use(new GoogleStrategy.OAuth2Strategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: '/user/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile)
    }
));