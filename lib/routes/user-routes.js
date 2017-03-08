const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/users-controller')

router.get('/:id', auth, UsersController.show)
router.post('/', UsersController.create)
router.patch('/:id', auth, UsersController.edit)

module.exports = router
