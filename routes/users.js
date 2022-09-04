const express = require('express');
const bcrypt = require('bcryptjs');
const appError = require('../service/appError');
const jwt = require('jsonwebtoken');
const handleErrorAsync = require('../service/handleErrorAsync');
const validator = require('validator');
const User = require('../models/usersModel');
const { isAuth, generateSendJWT } = require('../service/auth');
const UsersControllers = require('../controllers/users');

const router = express.Router();

router.post('/sign_up', handleErrorAsync(UsersControllers.signUp));

router.post('/sign_in', handleErrorAsync(UsersControllers.signIn));

router.get('/profile/', isAuth, handleErrorAsync(UsersControllers.getProfile));

router.post('/updatePassword', isAuth, handleErrorAsync(UsersControllers.updatePassword));

router.patch('/profile', isAuth, handleErrorAsync(UsersControllers.updateProfile));

module.exports = router;
