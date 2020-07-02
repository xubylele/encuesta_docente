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
        res.status(500).json({error})
    }
}
module.exports = participantListCtrl