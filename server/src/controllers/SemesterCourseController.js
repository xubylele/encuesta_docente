const { SemesterCourse, Course } = require('../models')
const semesterCourseCtrl = {}

semesterCourseCtrl.createCourse = async(req, res) => {
    try {
        const courses = await Course.find({'acronym': req.body.acronym}).limit(1)
        const course = courses[0]

        console.log('Curso',course)

        if(course.semesterCourses.length > 0) {
            for (let i = 0; i < course.semesterCourses.length; i++) {
                let semC = await SemesterCourse.find({_id: course.semesterCourses[i] , year: req.body.year, semester: req.body.semester, parallel: req.body.parallel})
                if(semC.length > 0)
                    return res.status(400).json({error:"Curso semestral ya existe en el mismo año, con el mismo paralelo en el mismo semestre"})
            }
        }
        const semesterCourse = new SemesterCourse({
            semester: req.body.semester,
            year: req.body.year,
            parallel: req.body.parallel,
            course: course
        })
        
        await semesterCourse.save()

        
        

        Course.update(
            {"_id": course._id}, 
            {"$push": { "semesterCourses": semesterCourse } },
            function (err, callback) {
                
            }
        )

        
                                                                 // GUARDAMOS EL NUEVO USUARIO EN LA BASE DE DATOS.
        return res.status(200).json({semesterCourse: semesterCourse, message: 'Curso semestral creado con exito'});      // DEVOLVEMOS EL ESTADO DE EXITO.
    } catch (error) {
        console.log(error)
        return res.status(500).json({"error": error.message});                                                // DEVOLVEMOS ERROR.
    }
}

module.exports = semesterCourseCtrl

semesterCourseCtrl.seed = async(req, res) => {
    // LE ASIGNAMOS LOS DATOS QUE INGRESAN EN EL FRONT.
    try {
        const courses = await Course.find({'acronym': req.body.acronym}).limit(1)
        const course = courses[0]

        console.log('Curso',course)

        if(course.semesterCourses.length > 0) {
            for (let i = 0; i < course.semesterCourses.length; i++) {
                let semC = await SemesterCourse.find({_id: course.semesterCourses[i] , year: req.body.year, semester: req.body.semester, parallel: req.body.parallel})
                if(semC.length > 0)
                    return res.status(400).json({error:"Curso semestral ya existe en el mismo año, con el mismo paralelo en el mismo semestre"})
            }
        }
        const semesterCourses = []
        for (let i = 0; i < req.body.n; i++) {
            let semC
            let semesterCourse
            do {
                let semester = Math.floor(Math.random() * (2 - 1 + 1) + 1)
                let year = Math.floor(Math.random() * (2020 - 2018 + 1) + 2018)
                let parallel = Math.floor(Math.random() * (2 - 1 + 1) + 1)

                semC = await SemesterCourse.find({_id: course._id , year: year, semester: semester, parallel: parallel})

                semesterCourse = new SemesterCourse({
                    semester: semester,
                    year: year,
                    parallel: parallel,
                    course: course
                })
            } while (semC.length > 0);
            semesterCourses.push(semesterCourse)
        }

        SemesterCourse.insertMany(semesterCourses, function (err, semesterCourse) {
            if(err)
                console.log(err)
            
            console.log(semesterCourse)
        }) // Con esta wea podi insertar un arreglo de objetos en el modelo


        Course.update(
            {"_id": course._id}, 
            {"$push": { "semesterCourses": {"$each": semesterCourses} } },
            function (err, callback) {
                
            }
        ) // con esto podi agregar un arreglo de objetos dentro de un arreglo de objetos de la base de datos
        
        return res.status(200).json({semesterCourses: semesterCourses, message: 'Curso semestral creado con exito'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({"error": error.message});                                                // DEVOLVEMOS ERROR.
    }
}



module.exports = semesterCourseCtrl