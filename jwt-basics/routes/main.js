const express = require('express')
const router = express.Router()

const {login, dashboard } = require('../controllers/main')

const authenticationMid = require('../middleware/auth')

router.route('/dashboard').get([authenticationMid],dashboard)
router.route('/login').post(login)

module.exports = router
