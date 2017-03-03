
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('first_name')
    table.string('last_name')
    table.string('email').unique()
    table.string('password_digest')
    table.string('api_key')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
