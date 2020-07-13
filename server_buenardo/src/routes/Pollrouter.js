const express = require('express')
const router = express.Router()
const { PollController } = require('../controllers')
const auth = require('../middlewares/auth')
    
    router.post('/create', PollController.create)
    router.get('/getallcontroller',PollController.getAllpolls)
    router.get('/:id/get',PollController.getpoll)
    router.delete('/delete',PollController.deletepoll)
    router.put('/addanswer',PollController.addAnswer)
    router.post('/savePoll', auth, PollController.savePoll)
    module.exports = router