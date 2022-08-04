var express = require('express');
var router = express.Router();

const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');
const newPostController = require('../controllers/newPostController');
const becomeAMemberController = require('../controllers/becomeAMemberController');
const Post = require('../models/Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}).populate('author').exec((err, posts) => {
    res.render('index', { posts });
  });
});

router.get('/sign-up', signUpController.signUpGet);

router.post('/sign-up', signUpController.signUpPost);

router.get('/log-in', logInController.logInGet);

router.post('/log-in', logInController.logInPost);

router.get("/log-out", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/new-post", newPostController.newPostGet);

router.post("/new-post", newPostController.newPostPost);

router.get("/become-a-member", becomeAMemberController.becomeAMemberGet);

router.post("/become-a-member", becomeAMemberController.becomeAMemberPost);

module.exports = router;
