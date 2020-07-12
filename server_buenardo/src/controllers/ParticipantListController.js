const { ParticipantList, User, Course } = require('../models')
const participantListCtrl = {};



participantListCtrl.create = async(req ,res) =>{     
    if(req.body.courseID == null || req.body.userID == null) return res.status(400).json({error: 'No han asignado un curso o un usuario a este participante'})
    try {

        const participantList = new ParticipantList(req.body)   // creamos instancia de listaParticipantes
        const user = await User.findById(req.body.userID)       // obtenemos user
        const course = await Course.findById(req.body.courseID) // obtenemos curso

        const exist = await ParticipantList.find({                                                    // CONSULATAMOS CON LA BASE DE DATOS
            user: user._id,
            course: course._id                                                        // EMAIL
        });

        if(exist[0]!=null){                                                                     // SI ES QUE EXISTE
            return res.status(409).json({                                                       // RETORNAMOS UN HTTP STATUS 409 (EXISTS)
                participant: exist,
                message: 'Participant Exists'});                                                       // MENSAJE USUARIO EXISTE
        }

        participantList.user = user                             // asignamos el user al participante
        participantList.course = course                         // asignamos el curso al participante
        await participantList.save()                            // guardamos el participante

        

        User.update(
            {"_id": req.body.userID}, 
            {"$push": { "participants": participantList } },
            function (err, callback) {
                
            }
        )
        
        Course.update(
            {"_id": req.body.courseID}, 
            {"$push": { "participantsList": participantList } },
            function (err, callback) {
                
            }
        )       // pusheamos en el arreglo de participantes del usuario el participante creado

        res.status(200).json({participantList: participantList, message: 'ParticipantList Creado Exitosamente'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

participantListCtrl.courseRecord = async(req, res) => {
    
}

participantListCtrl.getCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const participants = await ParticipantList.find({user: user._id})
        let courses = []
        let specialCourse = {}
        console.log(user)
        for (let i = 0; i < participants.length; i++) {
            let teachers = []
            let teacher
            let course = await Course.findOne({_id: participants[i].course})
            for (let j = 0; j < course.participantsList.length; j++) {
                let participantTeacher = await ParticipantList.findById(course.participantsList[j])
                let user = await User.findById(participantTeacher.user)
                if(user.type == 'Profesor')
                    teachers.push(user)
            }
            specialCourse = {course: course, teachers: teachers}
            courses.push(specialCourse)
        }

        return res.status(200).json({courses})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

participantListCtrl.removeArrays = async(req , res) =>{
    try {
        participants = await ParticipantList.find()
        for (let i = 0; i < participants.length; i++) {
            await ParticipantList.update({_id: participants[i]._id}, {'$set': {'polls': [], 'teachersBadge': []}})
            
        }

    } catch (error) {
        return res.status(400).json({error: error.message})        
    }
    return res.status(200).json({message: 'Participants updated successfully'})
}

module.exports = participantListCtrl