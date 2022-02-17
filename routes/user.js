const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')

const pasport = require('passport');
const User = require('../models/user');

const user = require('../controllers/users')

router.get('/register', user.register)

router.post('/register', catchAsync(user.registerPost))

router.get('/login', user.login)

router.post('/login', pasport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginPost)

router.get('/logout', user.logout)



module.exports = router;