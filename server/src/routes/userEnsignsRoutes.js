const express = require('express');
const router = express.Router();
const userEnsignsController = require('../controllers/UserEnsignController');


    router.post('/create',userEnsignsController.createUserEnsigns);
    router.get('/getallensigns',userEnsignsController.getAllUserEnsigns);
    router.get('/:id/getuserensign',userEnsignsController.getUserEnsign);
    router.delete('/delete',userEnsignsController.remove);


    /* FORMA DE REALIZAR PETICIÓN

    CREATE: {
    "semesterCourseID": "",
    "ensignID":"",
    "participantID":""
    }

    GET ALL{
        DEVUELVE UN ARREGLO DE OBJETOS USERENSIGNS
    }

    GET ONE{
        se le pasa el id por parametros de la forma
        /ID/getuserensign
        DEVUELVE UN OBJETO USERENSIGNS
    }

    DELETE{
        "id": ""
    }
    */
    module.exports = router;