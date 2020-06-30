const express = require('express');
const router = express.Router();
const { SemesterCourseController } = require('../controllers')

router.post('/create', SemesterCourseController.createCourse)
router.post('/create_much', SemesterCourseController.seed)

module.exports = router;