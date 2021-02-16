const UserController = require('../api/controllers/UserController')
var express = require('express');
var router = express.Router();

//const jwt = require('jsonwebtoken'); 
var jwt;
const jwtFunction = (jwtParam) => {
    jwt = jwtParam
}
router.use(UserController.middlewareAuth(jwt));

router.get('/', UserController.list);
router.post('/add', UserController.add);
router.delete('/remove', UserController.remove);



module.exports = { router, jwtFunction };
