const jwt = require('jsonwebtoken');
const appError = require('./appError');
const handleErrorAsync = require('./handleErrorAsync');
const express = require('express');
const User = require('../models/usersModel');

const isAuth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token;
  if (
    req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(appError(401, '你尚未登入！', next));
  }

  // 驗證 token 正確性，會回傳decoded的payload
  const decoded = await new Promise((resolve, reject) => {
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
  const currentUser = await User.findById(decoded.id);

  // 有經過isAuth認證後，會在req.user塞入資料
  req.user = currentUser;
  return next();
});
const generateSendJWT = (user, statusCode, res) => {
  // 產生 JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });

  // 只是要產生JWT token，並不需要把加密後的密碼傳給前台
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user: {
      token,
      name: user.name,
    },
  });
};

module.exports = {
  isAuth,
  generateSendJWT,
};
