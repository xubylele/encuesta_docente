const questionController = {}
const { Question, Section } = require('../models')

questionController.create = async(req ,res) =>{    
    if(req.body.sectionID == null)
        return res.status(400).json({error: 'Necesitas una seccion para agregar'})

    try {
        const question = new Question(req.body)
        const section = await Section.findById(req.body.sectionID)

        question.section = section
        question.alternativeSet = null
        question.questionSet = null
        
        await question.save()
        
        Section.update(
            {"_id": req.body.sectionID}, 
            {"$push": { "questions": question } },
            function (err, callback) {
                
            }
        )
                                                                          // GUARDAMOS EN LA BASE DE DATOS
        return res.status(200).json({question: question, message: 'Pregunta creada exitosamente'});             // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        return res.status(500).json({error: error.message});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    } 
}

module.exports = questionController