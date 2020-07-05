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
        let courseReq = req.body[i]
        let course = await Course.findById(courseReq.idCurso)
        for (let j = 0; j < courseReq.profes.length; j++) {
            let teacherReq = courseReq.profes[j];
            let teacher = await ParticipantList.findOne({user: teacherReq.id, course: course._id})
            let poll = new Poll()
            let answers = []
            poll.teacher = teacher
            poll.questionSet = await QuestionSet.findOne({version: '1.0.0'})
            await poll.save()
            for (let k = 0; k < teacherReq.data.length; k++) {
                const answerReq = teacherReq.data[k];
                let answer = new Answer()
                answer.alternative = await Alternative.findOne({alternative: answerReq.idResp})
                answer.question = await Question.findById(answerReq.idPreg)
                answer.poll = poll
                answers.push(answer)
            }

            await Answer.insertMany(answers)
            Poll.update(
                {"_id": poll._id}, 
                {"$push": { "answers": {"$each": answers} } },
                function (err, callback) {
                    
                }
            )
        }
        
    }
    return res.status(200).json('Encuesta guardada con exito!!!')
}
module.exports = pollCtrl;