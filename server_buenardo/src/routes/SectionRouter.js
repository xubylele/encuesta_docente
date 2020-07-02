const express = require('express');
const router = express.Router();
const { SectionController } = require('../controllers');

    router.post('/create', SectionController.create)
    
    /** 
    * Lo pides con un get simple, te retorno la lista, con el listado de preguntas dentro de cada seccion
    */
    router.get('/list', SectionController.getSectionList)

module.exports = router;