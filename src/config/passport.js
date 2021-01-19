const passport = require("passport");
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth')
const userRepository = require('../modules/services/user')

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
        userRepository.getUserByFacebookId(facebookId).then((user) => {
            if (user) {
                // already have this user
                console.log('user is: ', user);
                done(null, user)
            } else {
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

//TODO : get google client id and secret from Fransisca

// passport.use(new GoogleStrategy.OAuth2Strategy({
//         clientID: process.env.GOOGLE_APP_ID,
//         clientSecret: process.env.GOOGLE_APP_SECRET,
//         callbackURL: '/user/auth/google/callback'
//     },
//     function (accessToken, refreshToken, profile, done) {
//         const {
//             emails,
//             gender,
//             displayName,
//             username,
//             name,
//             id: googleId,
//             birthday,
//             photos
//         } = profile;

//         userRepository.getUserByGoogleId(googleId).then((user) => {
//             if (user) {
//                 // already have this user
//                 console.log('user is: ', user);
//                 done(null, user)
//             } else {
//                 userRepository.createUser({
//                     first_name: name.givenName.split(' ')[0],
//                     last_name: `${name.middleName} ${name.familyName}`,
//                     email: email,
//                     gender: gender,
//                     photo: photos[0],
//                     facebookId: facebookId,
//                 }).then(newUser => {
//                     done(null, newUser)
//                 })
//             }
//         })
//     }
// ));