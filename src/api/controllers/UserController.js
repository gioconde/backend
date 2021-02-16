const UserService = require('../services/UserService')
const signin = require('./users/Signin')
const signup = require('./users/Signup')
const add = require('./users/Add')
const remove = require('./users/Remove')
const list = require('./users/List')
const middlewareAuth = require('./MiddlewareAuth')



module.exports = {
    signin,
    signup,
    list,
    middlewareAuth,
    add,
    remove
}
