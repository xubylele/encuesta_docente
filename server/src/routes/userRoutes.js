const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

    router.get('/getusers', userController.getAllUsers);
    router.get('/:id/get',userController.getUser);
    router.post('/create',userController.createUser);
    router.delete('/delete', userController.remove);
    router.put('/:id/edit',userController.editUser);

    module.exports = router;