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

sectionCtrl.detailPerSection = async(req , res) => {
    const sections = await Section.find()
    const participant = await ParticipantList.findOne({user: req.user._id, course: req.params.courseID})

    let sectionResults= []
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const questions = await Question.find().where('_id').in(section.questions).exec()
        let sectionsQuestions = []
        for (let j = 0; j < questions.length; j++) {
            const question = questions[j]
            let sum = 0
            const answers = await Answer.find().where('_id').in(question.answers).populate('poll').populate('alternative')
            for (let k = 0; k < answers.length; k++) {
                const answer = answers[k]
                if(answer.teacher == ParticipantList._id)
                    sum += answer.alternative.alternative
            }
            sectionsQuestions.push({'question': question.question, result: sum/answers.length})
        }
        sectionResults.push({'section': section.name, 'results': sectionsQuestions})
        
    }

    return res.status(200).json({sectionResults})
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
        res.status(500).json({error: error.message})     
    }
}

sectionCtrl.averagePerSection = async(req , res) => {
    const user = await User.findById(req.user._id).populate('participants')
    const sections = await Section.find()
    let totalAverage = []
    for (let k = 0; k < sections.length; k++) {
        let cont = 0
        let section = sections[k]
        let sum = 0
        for (let i = 0; i < user.participants.length; i++) {
            let participant = user.participants[i].populate('polls')
            for (let j = 0; j < participant.polls.length; j++) {
                let poll = await Poll.findById(participant.polls[j])
                if(poll != null)
                for (let l = 0; l < poll.answers.length; l++) {
                        let answer = await Answer.findById(poll.answers[l])
                        if(answer.question != null){
                            let question = await Question.findById(answer.question)
    
                            if(question.section.toString() === section._id.toString()){
                                let alternative = await Alternative.findById(answer.alternative)
                                sum = sum + alternative.alternative
                                cont++
                            }

                        }
                    }
            }
            if(i == user.participants.length - 1){
                console.log(sum, cont, sum/cont)
                totalAverage.push({categoria: section.name, puntuacion: sum / cont})
            }
        }
        
    }

    return res.status(200).json({promedio: totalAverage})
}

sectionCtrl.averageOfCoursePerSection = async(req , res) => {
    const sections = await Section.find()
    let totalAverage = []
    for (let k = 0; k < sections.length; k++) {
        let cont = 0
        let section = sections[k]
        let sum = 0
        let participants = await ParticipantList.find({user: req.user._id, course:  req.params.courseID}).populate('polls')
        for (let i = 0; i < participants.length; i++) {
            let participant = participants[i]
            for (let j = 0; j < participant.polls.length; j++) {
                let poll = await Poll.findById(participant.polls[j])
                if(poll != null)
                for (let l = 0; l < poll.answers.length; l++) {
                        let answer = await Answer.findById(poll.answers[l])
                        if(answer.question != null){
                            let question = await Question.findById(answer.question)
    
                            if(question.section.toString() === section._id.toString()){
                                let alternative = await Alternative.findById(answer.alternative)
                                sum = sum + alternative.alternative
                                cont++
                            }

                        }
                    }
            }
            if(i == participants.length - 1){
                console.log(sum, cont, sum/cont)
                totalAverage.push({categoria: section.name, puntuacion: sum / cont})
            }
        }
        
    }

    return res.status(200).json({promedio: totalAverage})
}

module.exports = sectionCtrl