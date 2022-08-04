const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.signUpGet = (req, res, next) => {
  res.render('signUpForm');
};

exports.signUpPost = [
  body('firstName').trim().isLength({ min: 1, max: 50 }).withMessage('First name should have 1 to 50 characters').escape(),
  body('lastName').trim().isLength({ min: 1, max: 50 }).withMessage('Last name should have 1 to 50 characters').escape(),
  body('username').trim().isLength({ min: 4, max: 20 }).withMessage('Username should have 4 to 20 characters').escape(),
  body('password').trim().isLength({ min: 6, max: 20 }).withMessage('Password should have 6 to 20 characters').escape(),
  body('confirmPassword').trim().custom((value, { req }) => value === req.body.password).withMessage('Confirm password field should match Password').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('signUpForm', { user: req.body, errors: errors.array() });
      return;
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) return next(err);
      const { firstName, lastName, username } = req.body;
      new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
      }).save((err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  },
];
