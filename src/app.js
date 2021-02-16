require("dotenv-safe").config();
const {routesAuth,jwtFun} = require('./routes/routesAuth')
const routesDefault = require('./routes/routesDefault')
const express = require('express')
const app = express()
const port = 3000

const jwt = require('jsonwebtoken'); 
jwtFun(jwt)

app.use(express.json())

app.use('/', routesDefault)
app.use('/users', routesAuth)

app.listen(port, () => {
  console.log(`CondeDev rodando em http://localhost:${port}`)
})
