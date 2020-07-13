const express = require('express')
const router = express.Router()
const { AlternativeSetController } = require('../controllers')

    router.post('/create', AlternativeSetController.create)

module.exports = router