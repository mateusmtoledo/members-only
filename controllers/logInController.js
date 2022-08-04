const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.logInGet = (req, res, next) => {
  res.render('logInForm');
};

exports.logInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
});
