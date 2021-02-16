const signin = require('../api/controllers/users/Signin')
const signup = require('../api/controllers/users/Signup')
var express = require('express');
const jwt = require('jsonwebtoken'); 
var router = express.Router();

router.get('/', function(req, res) {
  res.send('CondeDev');
});

router.post('/signin', signin(jwt));
router.post('/signup', signup(jwt));

module.exports = router;

