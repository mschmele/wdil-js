const basicAuth = require('basic-auth')
const User = require('../models/user')
const sendError = require('../utils/send-error')

module.exports = async (request, response, next) => {
  const user = basicAuth(request)
  let authenticatedUser

  if (!user || !user.name || !user.pass) {
    return unauthorized(response)
  }

  try {
    authenticatedUser = await User.authenticate({ email: user.name, password: user.pass })
  } catch (error) {
    console.error(error)
    return sendError({ response, status: 500, errors: ['Internal Server Error'] })
  }

  if (!authenticatedUser) {
    return unauthorized(response)
  }

  request.currentUser = authenticatedUser
  next()
}

function unauthorized (response) {
  return sendError({ response, status: 401, errors: ['Unauthorized'] })
}
