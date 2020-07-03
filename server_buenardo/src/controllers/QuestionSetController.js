const { QuestionSet } = require('../models')
const questionSetCtrl = {}

questionSetCtrl.create = async (req, res) => {
    try {
        const questionSet = new QuestionSet(req.body);                                                                     // CREAMOS UN NUEVO OBJETO CURSO
        const exist = await QuestionSet.find({                                                                       // CREAMOS UN OBJETO PARA VER SI EXISTE
            version: req.body.version
        })
        if(exist[0]!=null){                                                                                     // SI EXISTE Y NO ES NULL
            return res.status(409).json({                                                                       // RETORNAMOS HTTP 409, EXISTE
                questionSet: exist,
                message: 'Question Set Already Exists'});
        }
        await questionSet.save();                                                                                    // SI NO EXISTE LO GUARDAMOS
        return res.status(200).json({questionSet: questionSet, message: 'Set de preguntas creado exitosamente'});                           // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        return res.status(500).json({error: error.message});                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

module.exports = questionSetCtrl