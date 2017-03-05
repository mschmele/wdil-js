require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const userRoutes = require('./lib/routes/user-routes')

const app = express()

app.use(bodyParser.json())

app.use('/users', userRoutes)

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.listen(3001, () => {
  console.log('App listening on port 3001')
})
