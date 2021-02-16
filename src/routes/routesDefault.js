const UserController = require('../api/controllers/UserController')
var express = require('express');
const jwt = require('jsonwebtoken'); 
var router = express.Router();

router.get('/', function(req, res) {
  res.send('CondeDev');
});

router.post('/signin', UserController.signin(jwt));
router.post('/signup', UserController.signup(jwt));

module.exports = router;

