
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = 3000
const users = [
  { "id": 0.372598048211062, "username": "Gioconde", "password": "321" },
  { "id": 0.42963005605214954, "username": "killer", "password": "111" },
  {"id": 0.08133849221774536, "username": "Ira","password": "222"},
]
const usersTokens = [
  { "id": 0.372598048211062, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC4zNzI1OTgwNDgyMTEwNjIsInVzZXJuYW1lIjoiR2lvY29uZGUiLCJpYXQiOjE2MTMyNzA1Nzd9.kbPqep0eY3IV-c6lBX7cGJDPvZSkM8RewxKK5r4jpuI" },
  { "id": 0.42963005605214954, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC40Mjk2MzAwNTYwNTIxNDk1NCwidXNlcm5hbWUiOiJraWxsZXIiLCJpYXQiOjE2MTMyNzI0Njh9.6rusgsbvUYme3oQKAWe2gUD9KxBGB_43tZB-JEohHk8" },
  { "id": 0.08133849221774536, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC4wODEzMzg0OTIyMTc3NDUzNiwidXNlcm5hbWUiOiJJcmEiLCJpYXQiOjE2MTMyNzMxNTd9.19lq8gswkEPIxVehNvZOjYxDYUbQUSvVE6SCSpcwTL4" },
]
app.use(express.json())

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
    const existsUserToken = usersTokens.find((userToken) => {
      return userToken.id === userTokenReq.id && userToken.token === token
    })
    console.log(existsUserToken)
    //console.log(usersTokens);
    if (existsUserToken) {
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
  const { username, password } = req.body
  //necessita os 2 parâmetros para continuar
  if (!username || !password) return res.status(403).send("Necessita credenciais!")
  const user = users.find((user) => {
    return user.username === username && user.password === password
   });
   //console.log(user)
  //valida os parâmetros passados
  if (!user) return res.status(401).send("Credenciais inválidas!")

  //gera o token de autenticação
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, {
    //expiresIn: 10 
  });

  usersTokens.push({ id: user.id, token })
  return res.json({ auth: true, token: token });
})

app.post('/new', (req, res) => {
  const { username, password, confPassword } = req.query
  if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")
  
  const userDB = users.find((user) => {
    return user.username === username
  });
  if (userDB) return res.send("user já existe")

  if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")

  const id = Math.random()
  const user = { id, username, password }

  users.push(user)

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET);

  usersTokens.push({ id, token })
  res.json({ status: "success", user: { ...user, token } })
})


app.post('/users/add', middlewareAccess, (req, res) => {
  const { username, password, confPassword } = req.query
  if (!username || !password || !confPassword) return res.send("Necessita 'username', 'password' e 'confPassword'")

  const userDB = users.map((user) => {
    return user.username === username
  }).filter((exists) =>
    exists
  );
  //console.log(userDB)
  if (userDB.length > 0) return res.send("user já existe")

  if (password != confPassword) return res.send("'password' e 'confPassword' diferentes")

  const user = { id: Math.random(), username, password }
  users.push(user)
  res.json(user)
})

app.get('/users', middlewareAccess, (req, res) => {
  res.json(users)
})

app.listen(port, () => {
  console.log(`CondeDev rodando em http://localhost:${port}`)
})