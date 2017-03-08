require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const userRoutes = require('./lib/routes/user-routes')

const app = express()

app.use(bodyParser.json({ type: 'application/json' }))

app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
