const bcrypt = require('bcrypt')
const crypto = require('crypto')
const database = require('../database')

const SALT_ROUNDS = 10
const TABLE_NAME = 'users'

class User {
  static async create ({ firstName, lastName, email, password, passwordConfirmation }) {
    if (password !== passwordConfirmation) {
      throw new Error('Passwords do not match')
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const insertId = await database(TABLE_NAME).insert({
      first_name: firstName,
      last_name: lastName,
      email,
      api_key: generateAPIKey(),
      password_digest: hash
    })

    console.log(`Created new User - id: ${[insertId]}`)
  }
}

function generateAPIKey () {
  const buf = crypto.randomBytes(16)
  return buf.toString('hex')
}

module.exports = User
