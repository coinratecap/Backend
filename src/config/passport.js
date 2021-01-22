const passport = require("passport");
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth')
const userRepository = require('../modules/services/user')
const fetch = require('node-fetch')

const port = process.env.PORT || 3000

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    const user = userRepository.getUserById(id)
    done(null, user)
})

passport.use(new FacebookStrategy.Strategy({
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
        userRepository.getUserByFacebookId(facebookId).then(async (user) => {
            if (user) {
                // already have this user
                console.log('user is: ', user);
                done(null, user)
            } else {
                userRepository.createUser({
                    first_name: displayName.split(' ')[0],
                    last_name: displayName.split(' ')[1],
                    gender: gender,
                    facebookId: facebookId,
                }).then(newUser => {
                    done(null, newUser)
                })
            }
        })
    }
));


passport.use(new GoogleStrategy.OAuth2Strategy({
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

        userRepository.getUserByGoogleId(googleId).then((user) => {
            if (user) {
                // already have this user
                console.log('user is: ', user);
                done(null, user)
            } else {
                console.log('google profile info : ', profile)
                userRepository.createUser({
                    first_name: name.givenName.split(' ')[0],
                    last_name: `${name.middleName} ${name.familyName}`,
                    email: email,
                    gender: gender,
                    photo: photos[0],
                    facebookId: facebookId,
                }).then(newUser => {
                    done(null, newUser)
                })
            }
        })
    }
));