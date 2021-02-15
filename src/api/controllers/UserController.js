const UserService = require('../services/UserService')
const jwt = require('jsonwebtoken');

const middlewareAuth = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send("Necessita token de acesso!")
    const token = req.headers.authorization.replace('Bearer ', '');

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    return res.status(440).send("Token expirou!")
                default:
                    return res.status(498).send("Token inválido!")
            }
        }
        const userTokenReq = { ...decoded }
        const existsUserToken = UserService.findToken(userTokenReq.id,token)
        if (existsUserToken) {
            req.user = userTokenReq
            return next()
        }
        return res.status(498).send("User e token incompatíveis!")
    });
}
const signin = (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(403).send("Necessita credenciais!")

    const user = UserService.find(username)
    if (!user || user.password !== password) return res.status(401).send("Credenciais inválidas!")
   // if (user.password !== password) return res.status(401).send("Senha inválida!")

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
        //expiresIn: 10
    });
    UserService.storeToken(user, token)
    return res.json({ auth: true, token: token });
}
const signup = (req, res) => {
    const { username, password, confPassword } = req.body
    if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")

    const userDB = UserService.find(username)

    if (userDB) return res.send("user já existe")

    if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")

    const id = Math.random()
    const user = { id, username, password }

    UserService.add(user)

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET);

    UserService.storeToken(user, token)
    res.json({ status: "success", user })
}
const list = (req, res) => {

    res.json(UserService.list())
}
const add = (req, res) => {
    const { username, password, confPassword } = req.body
    if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")

    const userDB = UserService.find(username)

    if (userDB) return res.send("user já existe")

    if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")

    const id = Math.random()
    const user = { id, username, password }

    UserService.add(user)
    res.json({ status: "success", user })
}
const remove = (req, res) => {
    const { id } = req.body
    if (!id) return res.send("Necessita 'id'")

    UserService.remove(id)

    res.json({ status: "success"})
}

module.exports = {
    signin,
    signup,
    list,
    middlewareAuth,
    add,
    remove
}