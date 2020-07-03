const { Course, ParticipantList } = require('../models')
const courseCtrl = {};


courseCtrl.create = async (req, res) => {
    try {
        const course= new Course(req.body);                                                                     // CREAMOS UN NUEVO OBJETO CURSO
        const exist = await Course.find({                                                                       // CREAMOS UN OBJETO PARA VER SI EXISTE
            acronym: req.body.acronym,                                                                          //BUSCAMOS CON EL ACRONIMO Y EL NOBRE
            name: req.body.name
        })
        if(exist[0]!=null){                                                                                     // SI EXISTE Y NO ES NULL
            return res.status(409).json({                                                                       // RETORNAMOS HTTP 409, EXISTE
                course: course,
                message: 'Course Already Exists'});
        }
        await course.save();                                                                                    // SI NO EXISTE LO GUARDAMOS
        res.status(200).json({course: course, message: 'Curso creado exitosamente'});                           // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error});                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

courseCtrl.getAllCourses = async (req, res) => {                                                                
    try {
        const courses = await Course.find();                                                                    // CONSULTAMOS TODOS LOS CURSOS
        res.status(200).json(courses);                                                                          // DEVOLVEMOS ESTADO OK Y EL CURSO
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error});                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

courseCtrl.getCourse = async (req, res) =>{                                                                 
    try {
        const course =  await Course.findById(req.params.courseID);                                             // BUSCAMOS POR EL ID PASADO POR PARAMETROS Y LO GUARDAMOS
        res.status(200).json(course);                                                                           // DEVOLVEMOS STATUS OK Y CURSO
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error});                                                                          // DEVOLVEMOS EL ERROR
    }
}

courseCtrl.editCourse = async (req, res) =>{
    try {
        const course = {                                                                                        // CREAMOS UN NUEVO OBJETO CURSO 
            acronym: req.body.acronym,                                                                          // LE DAMOS LOS PARAMETROS EDITABLES
            name: req.body.name
        }
        await Course.findByIdAndUpdate(req.body.courseID,{$set: course});                                       // BUSCAMOS Y EDITAMOS
        res.status(200),json({message: 'Curso editado con exito'});                                             // DEVOLVEMOS ESTADO OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error, message:'No se pudo editar el curso'});                                    // DEVOLVEMOS ESTADO 500 Y MENSAJE
    }
}

courseCtrl.deleteCourse = async (req, res)=>{
    try {
        const course = await Course.findByIdAndDelete(req.body.courseID);                                       // BUSCAMOS POR ID GUARDAMOS Y ELIMINAMOS
        res.status(200).json({course: course,message:'Curso eliminado con exito'});                             // DEVOLVEMOS STATUS OK, VARIABLE GUARDADA Y MENSAJE
        } catch (error) {                                                                                       // OBTENEMOS EL ERROR
        res.status(500).json({error, message:'No se pudo eliminar el curso'});                                  // DEVOLVEMOS STATUS 500 , ERROR Y MENSAJE
    }
}

courseCtrl.addparticipantList = async (req, res)=>{
    try {
        course = await Course.findById(req.body.courseID);                                                      // BUSCAMOS Y GUARDAMOS CURSO
        const participantList = await ParticipantList.findById(req.body.participantListID);                     // BUSCAMOS Y GUARDAMOS PARTICIPANT LIST
        course.participantsList.push(participantList);                                                          // AGREGAMOS AL ARREGLO
        course.save();                                                                                          // GUARDAMOS
        res.status(200).json({participantList: participantList, message:'Participant List agregada con exito'});// DEVOLVEMOS STATUS OK, EL PARTICIPANTE AGREGADO Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error});                                                                          // RESPONDEMOS CON STATUS 500 Y ERROR
    }
}

module.exports = courseCtrl;