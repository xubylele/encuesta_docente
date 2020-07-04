const express = require('express');
const router = express.Router();
const { TeacherBadgeController } = require('../controllers');


    router.post('/create',TeacherBadgeController.createTeacherBadge);
    router.get('/getallteachersbadge',TeacherBadgeController.getAllTeacherBadges);
    router.get('/:id/get',TeacherBadgeController.getTeacherBadge);
    router.delete('/delete',TeacherBadgeController.remove);

    module.exports = router;

/* COMO RECIBE LOS DATOS:

    CREATE:
    {
        teacherID: "id_profesor",
        badgeID: "id_insignia",
    }

    GET ALL:
    {
        NO RECIBE NADA
    }

    GET: 
    {
        RECIBE ID POR PARAMETROS EJEMPLO:
        /api/teachersbadge/badgeID/get
    }
    REMOVE:
    {
        teacherBadgeID: "id insignia profesor"
    }



*/
