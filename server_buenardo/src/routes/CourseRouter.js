const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');


    router.post('/create',courseController.create);
    router.get('/getallcourses',courseController.getAllCourses);
    router.get('/:id/get',courseController.getCourse);
    router.put('/edit',courseController.editCourse);
    router.put('/addparticipantlist',courseController.addparticipantList);
    router.delete('/delete',courseController.deleteCourse);

    module.exports = router;
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