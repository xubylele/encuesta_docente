const express = require('express')
const router = express.Router()
const {CourseController } = require('../controllers')


    router.post('/create',CourseController.create)
    router.post('/createMuch', CourseController.createMuch)
    router.get('/getallcourses',CourseController.getAllCourses)
    router.get('/:id/get',CourseController.getCourse)
    router.get('/:courseID/getCourseData', CourseController.getCourseData)
    router.put('/edit',CourseController.editCourse)
    router.put('/addparticipantlist',CourseController.addparticipantList)
    router.delete('/delete',CourseController.deleteCourse)

    module.exports = router
    /* COMO RECIBE LOS DATOS:

    CREATE:
    {
        acronym: "acronym",
        name: "name"
    }

    GET ALL COURSES:
    {
        NO RECIBE NADA
    }

    GET:{
        RECIBE POR ID DE PARAMETROS EJEMPLO:
        /api/courses/courseID/get
    }
    EDIT:
    {
        acronym: "acronym",
        name: "name"
    }
    ADD PARTICIPANT LIST:
    {
        courseID: "id",
        participantListID: "id"
    }

    DELETE:
    {
        courseID: "id"
    }
    */