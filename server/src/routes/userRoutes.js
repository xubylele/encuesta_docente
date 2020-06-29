const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

    router.get('/getusers', userController.getUsers);
    router.get('/:id/get',userController.getUser);
    router.post('/create',UserController.createUser);
    router.delete('/delete', userController.remove);
    router.put('/:id/edit',userController.editUser);

    module.exports = router;