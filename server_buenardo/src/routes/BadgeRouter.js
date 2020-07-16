const express = require('express')
const router = express.Router()
const { BadgeController } = require('../controllers')
const auth = require('../middlewares/auth')
const isTeacher = require('../middlewares/isTeacher')

    router.post('/create',BadgeController.create)
    router.post('/createMuch', BadgeController.createMuch)
    router.get('/getallbadges',BadgeController.getAllBadges)
    router.get('/:id/get',BadgeController.getBadge)
    router.put('/editname',BadgeController.editBadgename)
    router.delete('/delete',BadgeController.removeBadge)
    router.get('/removeAllArrays', BadgeController.removeArrays)
    router.get('/:courseID/top5', auth, isTeacher,BadgeController.top5)

    module.exports = router

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