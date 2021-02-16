const add = require('../api/controllers/users/Add')
const remove = require('../api/controllers/users/Remove')
const list = require('../api/controllers/users/List')
const middlewareAuth = require('../api/controllers/MiddlewareAuth')
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken'); 

router.use(middlewareAuth(jwt));

router.get('/', list);
router.post('/add', add);
router.delete('/remove', remove);

module.exports = router;
