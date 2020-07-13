const { Poll, Course, ParticipantList, User, QuestionSet, Answer, Alternative, Question, Badge, TeachersBadge } = require('../models')
const pollCtrl = {}


pollCtrl.create =  async (req, res) =>{
    try {
        const poll = new Poll(req.body)
        await poll.save()
        res.status(200).json({ poll: poll, mensagge:' Poll guardada con exito'})
    } catch (error) {
        res.status(500).json({error, message:'No se pudo guardar la poll' })
    }
}

pollCtrl.getAllpolls = async (req, res) =>{
    try {
        const polls =  await Poll.find()
        res.status(200).json(polls)
    } catch (error) {
        res.status(500).json({error})
    }
}

pollCtrl.getpoll = async (req, res) =>{
    try {
        const poll = await Poll.findById(req.params.id)
        res.status(200).json(poll)
    } catch (error) {
        res.status(500).json({error})
    }
}

pollCtrl.deletepoll = async(req, res) =>{
    try {    
        const poll =  await Poll.findByIdAndDelete(req.body.pollID)
        res.status(200).json({poll: poll,message:'Poll eliminada con exito'})
    } catch (error) {
        res.status(500).json({error})
    }
}

pollCtrl.addAnswer = async (req, res) =>{
    try {
        const poll = await Poll.findById(req.body.pollID)
        poll.answers.push(req.body.answerID)
        poll.save()
        res.status(200).json({answer: poll.answer, message: 'Respuesta guardada'})
    } catch (error) {
        res.status(500).json({error})
    }
}

pollCtrl.savePoll = async (req, res) => {
    if((await Poll.find({user: req.user})).length > 0) return res.status(400).json({error: 'Usuario ya contesto la encuesta!!'})


    let  answers = []

    for (let i = 0; i < req.body.length; i++) {
        let courseReq = req.body[i]                                                                 // OBTIENE EL CURSO REQ
        let course = await Course.findById(courseReq.idCurso)                                       // OBTIENE EL CURSO BD
        for (let j = 0; j < courseReq.profes.length; j++) {
            let teacherReq = courseReq.profes[j]                                                   // OBTIENE EL PROFESOR REQ
            let teacher = await ParticipantList.findOne({user: teacherReq.id, course: course._id})  // OBTIENE EL PROFESOR DE BD
            let poll = new Poll()                                                                   // CREAR POLL
            // let answers = []                                                                        // CREAR ARREGLO DE RESPUESTAS
            let teachersBadge= []
            let questionSet = await QuestionSet.findOne({version: '1.0.0'})
            poll.teacher = teacher                                                                  // CREAR PROFESOR
            poll.questionSet = questionSet                                                          // ASIGNAR SET DE PREGUNTAS
            poll.user = await User.findById(req.user)
            await poll.save()
            QuestionSet.update(
                {"_id": questionSet._id}, 
                {"$push": { "polls": poll } },
                function (err, callback) {
                    
                }
            )
            ParticipantList.update(
                {"_id": teacher._id}, 
                {"$push": { "polls":  poll} },
                function (err, callback) {
                    
                }
            )
            for (let k = 0; k < teacherReq.data.length; k++) {
                const answerReq = teacherReq.data[k]                                               // OBTENER RESPUESTA REQ
                let answer = new Answer()                                                           // CREAR RESPUESTA
                let alternative = await Alternative.findOne({alternative: answerReq.idResp})
                let question = await Question.findById(answerReq.idPreg)
                answer.alternative = alternative                                                    // ASIGNAR ALTERNATIVA
                answer.question = question                                                          // ASIGNAR PREGUNTA
                answer.poll = poll                                                                  // GUARDAR EN ARREGLO
                answers.push(answer)

                Alternative.update(
                    {"_id": alternative._id}, 
                    {"$push": { "answers": answer } },
                    function (err, callback) {
                        
                    }
                )

                Question.update(
                    {"_id": question._id}, 
                    {"$push": { "answers": answer } },
                    function (err, callback) {
                        
                    }
                )

                Poll.update(
                    {"_id": poll._id}, 
                    {"$push": { "answers": answer } },
                    function (err, callback) {
                        
                    }
                )   
            }


            for (let l = 0; l < teacherReq.insignias.length; l++) {
                const badgeReq = teacherReq.insignias[l]

                if(badgeReq.id != '' && badgeReq.id != null){

                    let badge = await Badge.findById(badgeReq.id)

                    const teacherBadge = new TeachersBadge()

                    teacherBadge.teacher = teacher
                    teacherBadge.badge = badge

                   

                    if(teachersBadge != null){          
                        await teacherBadge.save()

                        Badge.update(
                            {"_id": badge._id},
                            {"$push": {"teachersBadge": teacherBadge}},
                            function (err, callback) {
                                
                            }
                        )

                        ParticipantList.update(
                            {"_id": teacher._id},
                            {"$push": {"teachersBadge": teacherBadge}},
                            function (err, callback) {
                                
                            }
                        )
                    }
                }
            }

            if(j == courseReq.profes.length - 1){
                if(teacherReq.comment != null)
                {
                    let answer = new Answer()
                    answer.commentary = teacherReq.comment
                    answer.poll = poll 
                    await answer.save()

                    Poll.update(
                        {"_id": poll._id}, 
                        {"$push": { "answers": answer } },
                        function (err, callback) {
                            
                        }
                    )
                }
            }
                                                                                                
            
            

            
        }
        
    }
    let savedAnswers = await Answer.insertMany(answers)
    return res.status(200).json({message: 'Encuesta guardada con exito!!!', answers: savedAnswers})
}
module.exports = pollCtrl