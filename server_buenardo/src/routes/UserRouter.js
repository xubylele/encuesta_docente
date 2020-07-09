const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');
const auth = require('../middlewares/auth');

    router.post('/create',UserController.createUser);
    router.get('/getallusers', UserController.getAllUsers);
    router.get('/:id/get',UserController.getUser);
    router.delete('/delete', UserController.deleteUser);
    router.put('/editpassword', auth, UserController.editPassword);
    router.put('/addparticipant',UserController.addParticipants);
    router.get('/getallusercourses',UserController.getAllUserCourses);   
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