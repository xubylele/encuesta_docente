const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

    router.post('/create',userController.createUser);
    router.get('/getallusers', userController.getAllUsers);
    router.get('/:id/get',userController.getUser);
    router.delete('/delete', userController.deleteUser);
    router.put('/editpassword',userController.editPassword);
    router.put('/addparticipant',userController.addParticipants);   
    //router.post('/create_much', userController.createUsers)

    module.exports = router;

    /* FORMA DE LLAMAR A LOS DATOS 

    CREATE:
        {
        "names": " ",
        "last_names":" ",
        "email": " ",
        "password":" ",
        "type": " " (Alumno o Profesor)
        }

    GETALLUSERS:
    {
        NO SE LE MANDA NADA, SOLO SE LLAMA 
    }

    GETUSER:
    {
        SE LE PASA EL IDDE USUARIO POR PARAMETRO DEL MODO:
        /api/users/IDUSUARIO/get
    }

    EDIT PASSWORD:
    {
        "userID": " ",
        "password": " "
    }

    DELETE:
    {
        "userID": " "
    }
    */