const User = require('../models/user')
const sendError = require('../utils/send-error')

class UsersController {
  static async show (request, response) {
    try {
      if (Number(request.params.id) !== request.currentUser.id) {
        return sendError({ response, status: 404, message: 'User not found' })
      }

      const user = await User.find(request.params.id)

      if (!user) {
        return sendError({ response, status: 404, message: 'User not found' })
      }

      response.send(user)
    } catch (error) {
      console.error(error)
      return sendError({ response, status: 500, message: 'Internal server error' })
    }
  }

  static async create (request, response) {
    try {
      // TODO: Validations
      const params = mapUserParams(request.body)
      const newUser = await User.create(params)

      if (!newUser) {
        return sendError({
          error: {
            status: 400,
            message: 'Unable to create user'
          }
        })
      }

      response.status(201).send(newUser)
    } catch (error) {
      console.error(error)

      if (error.code === 'ER_DUP_ENTRY') {
        return sendError({
          response,
          status: 400,
          message: 'Error creating user - email already exists'
        })
      }

      return sendError({
        response,
        status: 500,
        message: 'Interal server error'
      })
    }
  }
}

function mapUserParams (params) {
  return {
    firstName: params['first_name'],
    lastName: params['last_name'],
    email: params['email'],
    password: params['password'],
    passwordConfirmation: params['password_confirmation']
  }
}

module.exports = UsersController
