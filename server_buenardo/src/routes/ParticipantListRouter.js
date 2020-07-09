const express = require('express');
const router = express.Router();
const { ParticipantListController } = require('../controllers');
const auth = require('../middlewares/auth');
const isTeacher = require('../middlewares/isTeacher')

    router.post('/create', ParticipantListController.create);

    /**
    * tienes que setear un header llamado auth-token y pones el token del login
    */
    router.get('/getCourses', auth, ParticipantListController.getCourses)
    router.get('/courseRecord', auth, isTeacher, ParticipantListController.courseRecord)

module.exports = router;