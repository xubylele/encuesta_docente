const express = require('express');
const router = express.router();
const { PollController } = require('../controllers');
    
    router.post('/create', PollController.create);
    router.get('/getallcontroller',PollController.getAllpolls);
    router.get('/:id/get',PollController.getpoll);
    router.delete('/delete',PollController.deletepoll);
    router.put('/addanswer',PollController.addAnswer);

    module.exports = router;