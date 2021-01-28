const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const passport = require('passport')

router.get('/login', (req, res) => res.render('login', {
    loginStatus: req.isAuthenticated() ? 'Authenticated' : 'Not Authenticated',
    userData : req.user,
}))

router.post("/login", passport.authenticate('local'), userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/logout", userController.logoutUser);
router.post("/register", userController.registerUser);
router.get('/getAllUsers', userController.getAllUsers)

router.get('/auth/google', userController.authenticateUserWithGoogle)
router.get('/auth/google/callback', passport.authenticate('google'), userController.handleGoogleAuthenticationCallback)

router.get('/auth/facebook', userController.authenticateUserWithFacebook)
router.get('/auth/facebook/callback', passport.authenticate('facebook'), userController.handleFacebookAuthenticationCallback)

module.exports = router;