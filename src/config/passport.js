require('dotenv').config()
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy
const socialMediaRepository = require('../modules/services/socialmedia')
const userRepository = require('../modules/services/user')
const User = require('../modules/models/User')
const GoogleInfo = require('../modules/models/GoogleInfo')

const port = process.env.PORT || 3000

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/v1/user/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('facebook user data is : ', profile)
    }
));


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: '/v1/user/auth/google/callback'
    },
    async function (accessToken, refreshToken, profile, done) {
        console.log('google profile : ', profile)
        try {
            let verifiedEmail;
            if (profile.emails !== undefined) {
                profile.emails.forEach(e => {
                    if (e.verified) {
                        verifiedEmail = e.value;
                    }
                })
            }
            const user = await userRepository.getUserByEmail(verifiedEmail)
            if (user) {
                done(null, user)
                return
            }
            const existingGoogleInfo = await socialMediaRepository.getGoogleInfoByGoogleId(profile.id)
            if (existingGoogleInfo) {
                done(null, existingGoogleInfo)
                return;
            }
            const googleUserInfo = await socialMediaRepository.createGoogleInfo({
                googleId: profile.id,
                name: profile.displayName,
                email: verifiedEmail,
                gender: profile.gender,
                provider: profile.provider,
            })
            const updatedUser = await userRepository.getUserByEmail(verifiedEmail)
            if (updatedUser) {
                done(null, updatedUser)
            } else {
                done(null, googleUserInfo)
            }
        } catch (e) {
            done(e)
        }
    }
));

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    console.log('serializing user : ', user)
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    if (user) {
        done(null, user)
        return
    }
    const googleInfo = await GoogleInfo.findById(id)
    console.log('google user is : ', googleInfo)
    if (googleInfo) {
        done(null, googleInfo)
        return
    }
    done(null, false);
})