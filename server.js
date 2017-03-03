require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.listen(3001, () => {
  console.log('App listening on port 3001')
})