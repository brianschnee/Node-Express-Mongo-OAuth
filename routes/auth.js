const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/dashboard')
    }
)

// @desc    Logout User
// @route   GET /auth/logout
router.get('/logout', function (req, res, next) {
    req.logout(err => {
        if (err) return next(err)

        res.redirect('/')
    })
})

module.exports = router