const { body, validationResult } = require('express-validator');
const User = require('../models/User');

exports.becomeAMemberGet = (req, res, next) => {
  res.render('becomeAMemberForm');
};

exports.becomeAMemberPost = [
  body('secret').trim().custom((value) => value === 'a super secret password').withMessage('Wrong password').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('becomeAMemberForm', { errors: errors.array() });
      return;
    }
    User.findByIdAndUpdate(req.user._id, { membershipStatus: 'Member' }, (err) => {
      if(err) return next(err);
      res.redirect('/');
    });
  }
];
