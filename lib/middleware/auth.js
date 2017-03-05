const basicAuth = require('basic-auth')
const User = require('../models/user')

module.exports = async (request, response, next) => {
  const user = basicAuth(request)

  if (!user || !user.name || !user.pass) {
    return unauthorized(response)
  }

  const authenticatedUser = await User.authenticate({ email: user.name, password: user.pass })

  if (!authenticatedUser) {
    return unauthorized(response)
  }

  request.currentUser = authenticatedUser
  next()
}

function unauthorized (response) {
  return response
    .status(401)
    .send({
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    })
}
