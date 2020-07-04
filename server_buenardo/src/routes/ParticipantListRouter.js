const express = require('express');
const router = express.Router();
const { ParticipantListController } = require('../controllers');
const auth = require('../middlewares/auth');

    router.post('/create', ParticipantListController.create);

    /**
    * tienes que setear un header llamado auth-token y pones el token del login
    */
    router.get('/getCourses', auth, ParticipantListController.getCourses)

module.exports = router;