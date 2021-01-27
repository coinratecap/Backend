require('dotenv').config()
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy
const socialMediaRepository = require('../modules/services/socialmedia')
const User = require('../modules/models/User')

const port = process.env.PORT || 3000

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/v1/user/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('user profile is : ', profile)
        const {
            emails,
            gender,
            displayName,
            username,
            name,
            id: facebookId,
            birthday,
            photos
        } = profile;

    }
));


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: '/v1/user/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        const {
            emails,
            gender,
            displayName,
            username,
            name,
            id: googleId,
            birthday,
            photos
        } = profile;
    }
));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());