const { Course, ParticipantList,Question } = require('../models')
const Poll = require('../models/Poll')
const Answer = require('../models/Answer')
const courseCtrl = {}


courseCtrl.createMuch = async (req, res) =>{
    let courses = []
    for (let i = 0; i < req.body.courses.length; i++) {
        try {
            const course = new Course()

            course.name = req.body.courses[i].name
            course.acronym = req.body.courses[i].acronym

            const exist = await Course.find({
               name: course.name,
               acronym: course.acronym
            })
            if(exist[0]!=null){
                return res.status(409).json({course: exist[0], message: 'Course already exists'})
            }
            
            courses.push(await course.save())
        } catch (error) {
            return res.status(500).json({error: error.message ,message: 'No se pudo crear el curso'})
        }
        
    }
    return res.status(200).json({message:'Creadas con exito', courses: courses})
}

courseCtrl.create = async (req, res) => {
    try {
        const course= new Course(req.body)                                                                     // CREAMOS UN NUEVO OBJETO CURSO
        const exist = await Course.find({                                                                       // CREAMOS UN OBJETO PARA VER SI EXISTE
            acronym: req.body.acronym,                                                                          //BUSCAMOS CON EL ACRONIMO Y EL NOBRE
            name: req.body.name
        })
        if(exist[0]!=null){                                                                                     // SI EXISTE Y NO ES NULL
            return res.status(409).json({                                                                       // RETORNAMOS HTTP 409, EXISTE
                course: course,
                message: 'Course Already Exists'})
        }
        await course.save()                                                                                    // SI NO EXISTE LO GUARDAMOS
        res.status(200).json({course: course, message: 'Curso creado exitosamente'})                           // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error})                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

courseCtrl.getAllCourses = async (req, res) => {                                                                
    try {
        const courses = await Course.find()                                                                    // CONSULTAMOS TODOS LOS CURSOS
        res.status(200).json(courses)                                                                          // DEVOLVEMOS ESTADO OK Y EL CURSO
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error})                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

courseCtrl.getCourse = async (req, res) =>{                                                                 
    try {
        const course =  await Course.findById(req.params.courseID)                                             // BUSCAMOS POR EL ID PASADO POR PARAMETROS Y LO GUARDAMOS
        res.status(200).json(course)                                                                           // DEVOLVEMOS STATUS OK Y CURSO
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error})                                                                          // DEVOLVEMOS EL ERROR
    }
}

courseCtrl.editCourse = async (req, res) =>{
    try {
        const course = {                                                                                        // CREAMOS UN NUEVO OBJETO CURSO 
            acronym: req.body.acronym,                                                                          // LE DAMOS LOS PARAMETROS EDITABLES
            name: req.body.name
        }
        await Course.findByIdAndUpdate(req.body.courseID,{$set: course})                                       // BUSCAMOS Y EDITAMOS
        res.status(200),json({message: 'Curso editado con exito'})                                             // DEVOLVEMOS ESTADO OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error, message:'No se pudo editar el curso'})                                    // DEVOLVEMOS ESTADO 500 Y MENSAJE
    }
}

courseCtrl.deleteCourse = async (req, res)=>{
    try {
        const course = await Course.findByIdAndDelete(req.body.courseID)                                       // BUSCAMOS POR ID GUARDAMOS Y ELIMINAMOS
        res.status(200).json({course: course,message:'Curso eliminado con exito'})                             // DEVOLVEMOS STATUS OK, VARIABLE GUARDADA Y MENSAJE
        } catch (error) {                                                                                       // OBTENEMOS EL ERROR
        res.status(500).json({error, message:'No se pudo eliminar el curso'})                                  // DEVOLVEMOS STATUS 500 , ERROR Y MENSAJE
    }
}

courseCtrl.addparticipantList = async (req, res)=>{
    try {
        course = await Course.findById(req.body.courseID)                                                      // BUSCAMOS Y GUARDAMOS CURSO
        const participantList = await ParticipantList.findById(req.body.participantListID)                     // BUSCAMOS Y GUARDAMOS PARTICIPANT LIST
        course.participantsList.push(participantList)                                                          // AGREGAMOS AL ARREGLO
        course.save()                                                                                          // GUARDAMOS
        res.status(200).json({participantList: participantList, message:'Participant List agregada con exito'})// DEVOLVEMOS STATUS OK, EL PARTICIPANTE AGREGADO Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        res.status(500).json({error})                                                                          // RESPONDEMOS CON STATUS 500 Y ERROR
    }
}

courseCtrl.getCourseData = async (req, res) =>{
    try {
        course = await Course.findById(req.params.courseID)
        
        return res.status(200).json({course: course})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

courseCtrl.resumeCourse = async (req,res) =>{
    const teacher = req.user._id
    const course = await Course.findById(req.body.courseID)
    let tempParticipantList
    let tempPoll
    let tempAnswer

    for(let i = 0; i<course.participantsList.length;i++){
        tempParticipantList = course.participantList[i]
        for(let u = 0 ; u < tempParticipantList;u++){
            tempPoll = await Poll.findById(tempParticipantList.polls[u])
            if(tempPoll.teacher == teacher){
                for(let k = 0 ; k< tempPoll.answers.length;k++){
                    tempAnswer = await Answer.findById(tempPoll.answers[k])


                }
            }
        }
    }
}

module.exports = courseCtrl