const sectionCtrl = {}
const { Section, User, ParticipantList, Poll, Answer, Question, Alternative } = require('../models')

sectionCtrl.create = async(req ,res) =>{    
    try {
        const section = new Section(req.body)                                                  // CREAMOS UN NUEVO OBJETO USUARIO

        
        await section.save()                                                                      // GUARDAMOS EN LA BASE DE DATOS
        res.status(200).json({section: section, message: 'Seccion creada exitosamente'})           // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error})                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    } 
}

sectionCtrl.createMuch = async(req , res) => {
    for (let i = 0; i < req.body.sections.length; i++) {
        const section = new Section()
        section.name = req.body.sections[i].section

        await section.save()
    }
    return res.status(200).json({message: 'Secciones creada exitosamente'})
}

sectionCtrl.getSectionList = async(req, res) => {
    try {
        const sectionList = await Section.find().populate('questions', 'question')

        if(!sectionList) return res.status(400).json({error: 'No hay secciones aun'})

        return res.status(200).json({sectionList: sectionList})
    } catch (error) {
        res.status(500).json({error: error.message});     
    }
}

sectionCtrl.averagePerSection = async(req , res) => {
    const user = await User.findById(req.user._id)
    const sections = await Section.find()
    let totalAverage = []
    let pollCount = 0
    for (let k = 0; k < sections.length; k++) {
        let section = sections[k]
        let sum = 0
        for (let i = 0; i < user.participants.length; i++) {
            let cont = 0
            let participant = await ParticipantList.findById(user.participants[i])
            for (let j = 0; j < participant.polls.length; j++) {
                let poll = await Poll.findById(participant.polls[j])
                if(poll != null)
                    for (let l = 0; l < poll.answers.length; l++) {
                        let answer = await Answer.findById(poll.answers[l])
                        if(answer.question != null){
                            let question = await Question.findById(answer.question)
                            pollCount++
    
                            if(question.section.toString() === section._id.toString()){
                                let alternative = await Alternative.findById(answer.alternative) 
                                sum = sum + alternative.alternative
                                cont++
                            }

                        }
                    }
            }
            if(i == user.participants.length - 1){
                totalAverage.push({categoria: section.name, puntuacion: sum / cont})
            }
        }
        
    }

    return res.status(200).json({promedio: totalAverage})
}

module.exports = sectionCtrl