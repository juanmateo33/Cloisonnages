var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user');
var authenticate = require('../authenticate');

var router = express.Router();

router.use(bodyParser.json());

// GET users listing. 
router.get('/', authenticate.verifyUser, function(req, res, next) {
  User.find()
  .then((users) => {res.send(users);})
  .catch((err) => next(err));
});

// Add a user 
router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      next(err);
      return ;
    }
    
    if (req.body.firstname){
      user.firstname = req.body.firstname ;
    }
    if (req.body.lastname){
      user.lastname = req.body.lastname;
    }
    user.save((err, user) => {
      if (err) {
        next(err);
        return ;
      }
      passport.authenticate('local')(req, res, () => {
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  );
});

// login
router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.json({success: true, user: user, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
});

/*router.get('/checkjwttoken', (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      return res.json({status: 'JWT valid!', success: true, user: user});
    }
  }) (req, res);
}); */

//sert uniquement en cas de stockage dans un cookie ?

module.exports = router;
