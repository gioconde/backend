
const signup = (req, res) => {
    const { username, password, confPassword } = req.body
    if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")
    const userDB = UserService.findByUsername(username)
    if (userDB) return res.send("user já existe")
    if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")
    const id = Math.random()
    const user = { id, username, password }
    UserService.add(user)
    
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET);
    UserService.storeToken(user, token)
    res.json({ status: "success", user })
}
module.exports = signup