const User = require('../models/user')

class UsersController {
  static async show (request, response) {
    try {
      const user = await User.find(request.params.id)

      if (!user) {
        return response
          .status(404)
          .send({
            error: {
              status: 404,
              message: 'User not found'
            }
          })
      }

      response.send(user)
    } catch (error) {
      // TODO: Standardize error logging
      console.error(error)

      response
        .status(500)
        .send({
          error: {
            status: 500,
            message: 'Internal server error'
          }
        })
    }
  }

  static async create (request, response) {
    try {
      // TODO: Validations
      const params = mapUserParams(request.body)
      const newUserId = await User.create(params)

      if (!newUserId) {
        return response
          .status(400)
          .send({
            error: {
              status: 400,
              message: 'Unable to create user'
            }
          })
      }

      response.status(201).end()
    } catch (error) {
      // TODO: Standardize error logging
      console.error(error)

      if (error.code === 'ER_DUP_ENTRY') {
        return response
          .status(400)
          .send({
            error: {
              status: 400,
              message: 'Error creating users - email already exists'
            }
          })
      }

      response
        .status(500)
        .send({
          error: {
            status: 500,
            message: 'Internal server error'
          }
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
