const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
    router.get('/getallcourses',courseController.getAllCourses);
    router.get('/:id/get',courseController.getCourse);
    router.post('/create',courseController.createCourse);
    router.post('/create_much', courseController.createCourses)
    router.put('/:id/edit',courseController.editCourse);
    router.delete('/delete',courseController.deleteCourse);

module.exports = router;
