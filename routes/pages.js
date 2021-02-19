//JavaScript file to render every web page

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("log-in", {
        user: 1,
    });
})

router.get('/log-in', (req, res) => {
    res.render("log-in", {
        user: 1,
    });
})

router.get('/log-in_admin', (req, res) => {
    res.render("log-in", {
        admin: 1,
    });
})

router.get('/register', (req, res) => {
    res.render("register");
})

module.exports = router;