const questionModel = require('../models/Question');
const questionCtrl = {};

questionCtrl.create = async (req, res) =>{
    try {
        const question = new questionModel(req.body);
        await question.save();
        res.status(200).json({question: question, message: 'Pregunta creada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

questionCtrl.getAllQuestions = async (req, res) => {
    try {
        const questions = questionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = questionCtrl;  