const express = require('express');
const router = express.Router();
const ensignController = require('../controllers/EnsignController');

    router.get('/getallensigns',ensignController.getAllEnsigns );
    router.get('/:id/get',ensignController.getEnsign);
    router.post('/create',ensignController.createEnsign);
    router.put('/:id/editname',ensignController.editEnsignName);
    router.delete('/delete',ensignController.removeEnsign);

    module.exports = router;