const questionSetModel = require('../models/QuestionSet');
const questionModel = require('../models/Question');
const questionSetCtrl = {};

questionSetCtrl.createQuestionSet = async (req, res) =>{
    try {
        const questionSet = new questionSetModel(req, res);
        await questionSetModel.save();
        res.status(200).json({questionSet: questionSet, message: 'Encuesta creada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

questionSetCtrl.getAllQuestionSet = async (req, res) =>{
    try {
        const questionsSet = await questionSetModel.find();
        res.status(200).json(questionsSet);
    } catch (error) {
        res.status(500).json({error});
    }
}

questionSetCtrl.getQuestionSet = async (req, res) =>{
    try {
        const questionSet = await questionSetModel.findById(req.params.id);
        res.status(200).json(questionSet);
    } catch (error) {
        res.status(500).json({error});   
    }
}
/* 
questionSetCtrl.addQuestion = async (req, res) =>{
    try {
        const question = await questionModel.findById(req.body.questionID);
        const questionSet = await questionSetModel.findById(req.body.questionSetID);
/* INCOMPLETO , FALTA AGREGAR AL AREGLO 
    } catch (error) {
        
    }
} */
/* 
questionSetCtrl.addPoll = async (req, res) =>{

} */

questionSetCtrl.deleteQuestionSet = async (req, res) =>{
    try {
        const questionSet = await questionSetModel.findByIdAndDelete(req.body.id);
        res.status(200).json({questionSet: questionSet,message:' Question Set eliminado'});
    } catch (error) {
        
    }
}

module.exports = questionSetCtrl;