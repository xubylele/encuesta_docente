const express = require('express');
const router = express.Router();
const { SectionController } = require('../controllers');
const auth = require('../middlewares/auth');
const isTeacher = require('../middlewares/isTeacher')

    router.post('/create', SectionController.create)
    
    /** 
    * Lo pides con un get simple, te retorno la lista, con el listado de preguntas dentro de cada seccion
    */
    router.get('/list', SectionController.getSectionList)
    router.get('/averagePerSection', auth, isTeacher, SectionController.averagePerSection)

module.exports = router;