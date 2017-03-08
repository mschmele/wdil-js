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

  static async edit (request, response) {
    const id = Number(request.params.id)

    try {
      const user = await User.find(id)

      if (user.id !== id) {
        return sendError({ response, status: 404, message: 'User Not found' })
      }

      // Update the user with the provided params. We don't care about undefined
      // values or duplicates - knex deals with that for us.
      await User.update({ id, params: request.body })

      // We have to re-fetch the newly updated user here. Could also fake and
      // just return the provided params, but we want to confirm that the update
      // was fully successful.
      const updatedUser = await User.find(id)

      return response.send(updatedUser)
    } catch (error) {
      console.error(error)

      return sendError({
        response,
        status: 400,
        message: 'Unable to update user'
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
