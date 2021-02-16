const UserController = require('../api/controllers/UserController')
var express = require('express');

const jwt = require('jsonwebtoken'); 

var router = express.Router();

//middleware
/* 
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
 */

router.get('/', function(req, res) {
  res.send('home 3');
});

router.post('/signin', UserController.signin);
router.post('/signup', UserController.signup);

module.exports = router;

