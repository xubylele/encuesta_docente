const express = require('express');
const router = express.Router();
const { BadgeController } = require('../controllers');

    router.post('/create',BadgeController.create);
    router.get('/getallbadges',BadgeController.getAllBadges);
    router.get('/:id/get',BadgeController.getBadge);
    router.put('/editname',BadgeController.editBadgename);
    router.delete('/delete',BadgeController.removeBadge);

    module.exports = router;

/* COMO RECIBE LOS DATOS

    CREATE:

    {
        name: "name"
    }

    GET ALL :
    {
        NO RECIBE NADA
    }

    GET:
    {
        RECIBE POR ID DE PARAMETROS EJEMPLO:
        /api/badges/badgeID/get
    }

    EDIT NAME:
    {
        badgeID: "id",
        badgeName: "name"
    }

    DELETE:
    {
        badgeID: "id"
    }


*/