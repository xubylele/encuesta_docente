const express = require('express');
const router = express.Router();
const { SemesterCourseController } = require('../controllers')

router.post('/create', SemesterCourseController.createCourse);

module.exports = router;