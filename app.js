
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = 3000
const users = []
const usersTokens = [
  { id: 0.42013506922686195, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC40MjAxMzUwNjkyMjY4NjE5NSwidXNlcm5hbWUiOiJraWxsZXIiLCJpYXQiOjE2MTMyNjYwODd9.GcImF0K2x0-3L_w2erVnga5ZuzlZg5aasIJSjxTLJ4c' },
  { id: 0.15816472906488266, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC4xNTgxNjQ3MjkwNjQ4ODI2NiwidXNlcm5hbWUiOiJHaW9jb25kZSIsImlhdCI6MTYxMzI2NjI1M30.OCqcfW3ectg-9bezXmS1VYXxrQk3ecR4uv_3gzSoaxQ' },
]

//verifica se usuário tem acesso para então seguir para a rota.
let middlewareAccess = (req, res, next) => {
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
    const existsUserToken = usersTokens.map((userToken) => {
      return userToken.id === userTokenReq.id && userToken.token === userTokenReq.token?true:false
    })
    
    console.log(existsUserToken)
    if (existsUserToken.length > 0 && existsUserToken.id) {
      req.user = userTokenReq
      return next()
    }
    return res.status(498).send("User e token incompatíveis!")
  });
}

app.get('/', (req, res) => {
  res.send(`Bem vindo(a)`)
})

app.post('/login', (req, res) => {
  console.log(req.query)
  const { username, password } = req.query
  //necessita os 2 parâmetros para continuar
  if (!username || !password) return res.status(403).send("Necessita credenciais!")

  //buscar no banco com os 2 parâmetros
  const user = users.map((user) =>
    user.username === username && user.passowrd === passowrd
  );

  //valida os parâmetros passados
  if (user.length > 0) return res.status(401).send("Credenciais inválidas!")

  //gera o token de autenticação
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
    //expiresIn: 10 //5 min
  });

  usersTokens.push({ id: user.id, token })
  return res.json({ auth: true, token: token });
})

app.post('/new', (req, res) => {
  const { username, password, confPassword } = req.query
  if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")
  //buscar user no DB

  const userDB = users.map((user) => {
    return user.username === username ? true : false
  });
  if (userDB.length > 0) return res.send("user já existe")

  if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")

  const id = Math.random()
  const user = { id, username, password }

  users.push(user)

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET);

  usersTokens.push({ id, token })
  res.send("User criado com sucesso!")
  console.log({ ...user, token })
})


app.post('/users/add', middlewareAccess, (req, res) => {
  const { username, password, confPassword } = req.query
  if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")
  //buscar user no DB

  const userDB = users.map((user) => {
    return user.username === username ? true : false
  });
  if (userDB.length > 0) return res.send("user já existe")

  if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")


  users.push({ id: Date.getTime(), username, password })

  console.log(users)
  res.send("User adicionado com sucesso!")
})

app.get('/users', middlewareAccess, (req, res) => {
  res.json([
    { id: 1, username: "gioconde", password: "123" },
    { id: 2, username: "killer", password: "coder_" },
    req.user
  ])
})

app.listen(port, () => {
  console.log(`CondeDev rodando em http://localhost:${port}`)
})