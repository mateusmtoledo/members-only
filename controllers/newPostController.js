const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');

exports.newPostGet = (req, res, next) => {
  res.render('newPostForm');
};

exports.newPostPost = [
  body('title', 'Title is required').trim().isLength({ min: 1 }).escape(),
  body('text', 'Text is required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('newPostForm', { errors });
      return;
    }
    new Post({
      title: req.body.title,
      text: req.body.text,
      author: req.user._id,
      timestamp: new Date(),
    }).save((err) => {
      if(err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
];
