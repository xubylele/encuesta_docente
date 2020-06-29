const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

    router.get('/api/user/getusers', userController.getUsers);
    router.get('/api/user/:id/get',userController.getUser);
    router.post('/api/user/create',UserController.createUser);
    router.delete('/api/user/delete', userController.remove);
    router.put('/api/user/:id/edit',userController.editUser);

    module.exports = router;