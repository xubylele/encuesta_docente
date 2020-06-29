const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { route } = require('./userRoutes');
const courseCtrl = require('../controllers/courseController');

    router.get('/getallcourses',courseController.getAllCourses);
    router.get('/:id/get',courseCtrl.getCourse);
    router.post('/create',courseCtrl.createCourse);
    router.post('/create_much', courseController.createCourses)
    router.put('/:id/edit',courseCtrl.editCourse);
    router.delete('/delete',courseCtrl.deleteCourse);

module.exports = router;
