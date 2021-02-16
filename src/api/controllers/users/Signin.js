const UserService = require('../../services/UserService')
const signin =(jwt)=> (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(403).send("Necessita credenciais!")

    const user = UserService.findByUsername(username)
    if (!user || user.password !== password) return res.status(401).send("Credenciais inválidas!")
   // if (user.password !== password) return res.status(401).send("Senha inválida!")

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
        //expiresIn: 300
    });
    UserService.storeToken(user, token)
    return res.json({ auth: true, token: token });
}
module.exports=signin
