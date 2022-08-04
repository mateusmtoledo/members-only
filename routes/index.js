var express = require('express');
var router = express.Router();

const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
