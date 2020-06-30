const questionModel = require('../models/Question');

const questionCtrl = {};

questionCtrl.create = async (req, res) =>{
    try {
        const question = await new questionModel(req,res);
        res.status(200).json({question: question, message: 'Pregunta creada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = questionCtrl;