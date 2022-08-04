const Post = require('../models/Post');

exports.deletePostGet = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId, (err, post) => {
    if(err) return next(err);
    if(!post) res.redirect('/');
    else res.render('deletePost', { post });
  });
};

exports.deletePostPost = (req, res, next) => {
  if(req.user.membershipStatus !== 'Admin') {
    res.redirect('/');
    return;
  }
  const { postId } = req.params;
  Post.findByIdAndDelete(postId, (err) => {
    if(err) return next(err);
    res.redirect('/');
  });
};
