const { Poll, Course, ParticipantList, User, QuestionSet, Answer, Alternative, Question } = require('../models');
const pollCtrl = {};


pollCtrl.create =  async (req, res) =>{
    try {
        const poll = new Poll(req.body);
        await poll.save();
        res.status(200).json({ poll: poll, mensagge:' Poll guardada con exito'});
    } catch (error) {
        res.status(500).json({error, message:'No se pudo guardar la poll' });
    }
}

pollCtrl.getAllpolls = async (req, res) =>{
    try {
        const polls =  await Poll.find();
        res.status(200).json(polls);
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.getpoll = async (req, res) =>{
    try {
        const poll = await Poll.findById(req.params.id);
        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.deletepoll = async(req, res) =>{
    try {    
        const poll =  await Poll.findByIdAndDelete(req.body.pollID);
        res.status(200).json({poll: poll,message:'Poll eliminada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.addAnswer = async (req, res) =>{
    try {
        const poll = await Poll.findById(req.body.pollID);
        poll.answers.push(req.body.answerID);
        poll.save();
        res.status(200).json({answer: poll.answer, message: 'Respuesta guardada'})
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.savePoll = async (req, res) => {
    for (let i = 0; i < req.body.length; i++) {
        let courseReq = req.body[i] // OBTIENE EL CURSO REQ
        let course = await Course.findById(courseReq.idCurso) // OBTIENE EL CURSO BD
        for (let j = 0; j < courseReq.profes.length; j++) {
            let teacherReq = courseReq.profes[j]; // OBTIENE EL PROFESOR REQ
            let teacher = await ParticipantList.findOne({user: teacherReq.id, course: course._id}) // OBTIENE EL PROFESOR DE BD
            let poll = new Poll() //CREAR POLL
            let answers = [] // CREAR ARREGLO DE RESPUESTAS
            poll.teacher = teacher // CREAR PROFESOR
            poll.questionSet = await QuestionSet.findOne({version: '1.0.0'}) // ASIGNAR SET DE PREGUNTAS
            await poll.save() //GUARDAR POLL
            for (let k = 0; k < teacherReq.data.length; k++) {
                const answerReq = teacherReq.data[k]; //OBTENER RESPUESTA REQ
                let answer = new Answer() // CREAR RESPUESTA
                answer.alternative = await Alternative.findOne({alternative: answerReq.idResp}) // ASIGNAR ALTERNATIVA
                answer.question = await Question.findById(answerReq.idPreg) // ASIGNAR PREGUNTA
                answer.poll = poll // ASIGNAR ENCUESTA
                answers.push(answer) // GUARDAR EN ARREGLO
            }

            await Answer.insertMany(answers) // GUARDAR ARREGLO DE PREGUNTAS
            Poll.update(
                {"_id": poll._id}, 
                {"$push": { "answers": {"$each": answers} } },
                function (err, callback) {
                    
                }
            ) // GUARDAR ARREGLO DE PREUNTAS DENTRO DE LA ENCUESTA
        }
        
    }
    return res.status(200).json('Encuesta guardada con exito!!!')
}
module.exports = pollCtrl;