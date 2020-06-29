const { SemesterCourse, Course } = require('../models')
const semesterCourseCtrl = {}

semesterCourseCtrl.createCourse = async(req, res) => {
    // LE ASIGNAMOS LOS DATOS QUE INGRESAN EN EL FRONT.
    try {
        const courses = await Course.find({'acronym': req.body.acronym}).limit(1)
        const course = courses[0]

        console.log('Curso',course)

        if(course.semesterCourses.length > 0) {
            for (let i = 0; i < course.semesterCourses.length; i++) {
                let semC = await SemesterCourse.findById(course.semesterCourses[i])
                if(semC.year == req.body.year && semC.semester == req.body.semester && semC.parallel == req.body.parallel)
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

        if(course.semesterCourses.length == 0){
            console.log('if course.semesterCourses.length', course.semesterCourses.length)
            course.semesterCourses = Array()
        }
        console.log('arreglo',course.semesterCourses)
        console.log('semesterCourse', semesterCourse)
        course.semesterCourses.push(semesterCourse)

        await course.save()


        
        /*FALTA FUNCIÓN IF EXISTE
        EN BASE DE DATOS */   
        // await semesterCourse.save(); 
        

        
                                                                 // GUARDAMOS EL NUEVO USUARIO EN LA BASE DE DATOS.
        return res.status(200).json({semesterCourse: semesterCourse, message: 'Curso semestral creado con exito'});      // DEVOLVEMOS EL ESTADO DE EXITO.
    } catch (error) {
        console.log(error)
        return res.status(500).json({"error": error.message});                                                // DEVOLVEMOS ERROR.
    }
}

module.exports = semesterCourseCtrl