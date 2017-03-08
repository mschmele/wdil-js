const emailValidator = require('email-validator')

class UserValidator {
  static validate (user) {
    const errors = []

    if (user.password !== user.passwordConfirmation) {
      errors.push('Passwords must match')
    }

    if (user.password.length < 6) {
      errors.push('Password must be longer than 6 characters')
    }

    if (!emailValidator.validate(user.email)) {
      errors.push('Email must be a valid email address')
    }

    return errors
  }
}

module.exports = UserValidator
