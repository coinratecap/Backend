require('dotenv').config()
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local').Strategy
const socialMediaRepository = require('../modules/services/socialmedia')
const userRepository = require('../modules/services/user')
const User = require('../modules/models/User')
const GoogleInfo = require('../modules/models/GoogleInfo')
const FacebookInfo = require('../modules/models/FacebookInfo')

const port = process.env.PORT || 3000

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/v1/user/auth/facebook/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
        console.log('facebook user data is : ', profile)
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
            const existingFacebookInfo = await socialMediaRepository.getFacebookInfoByFacebookId(profile.id)
            if (existingFacebookInfo) {
                done(null, existingFacebookInfo)
                return;
            }
            const facebookUserInfo = await socialMediaRepository.createFacebookInfo({
                facebookId: profile.id,
                name: profile.displayName,
                email: verifiedEmail,
                gender: profile.gender,
                provider: profile.provider,
            })
            const updatedUser = await userRepository.getUserByEmail(verifiedEmail)
            if (updatedUser) {
                done(null, updatedUser)
            } else {
                done(null, facebookUserInfo)
            }
        } catch (e) {
            done(e)
        }
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
    const googleInfo = await GoogleInfo.findById(id)
    const facebookInfo = await FacebookInfo.findById(id)
    console.log('google user is : ', googleInfo)
    console.log('facebook user is : ', facebookInfo)
    if (user) {
        done(null, user)
        return
    } else if (googleInfo) {
        done(null, googleInfo)
        return
    } else if (facebookInfo) {
        done(null, facebookInfo)
        return
    }
    done(null, false);
})