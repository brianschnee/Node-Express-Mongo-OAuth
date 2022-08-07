const express = require('express')
const router = express.Router()

// @desc    Login/Landing page
// @route   GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login'
    }) // looks for templates/views with login -> views/login.hbs
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard') // looks for templates/views with dashboard -> views/dashboard.hbs
})

module.exports = router