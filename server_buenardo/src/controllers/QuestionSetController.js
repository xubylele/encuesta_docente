const { QuestionSet } = require('../models')
const questionSetCtrl = {}

questionSetCtrl.create = async (req, res) => {
    try {
        const questionSet = new QuestionSet(req.body)                                                                     // CREAMOS UN NUEVO OBJETO CURSO
        const exist = await QuestionSet.find({                                                                       // CREAMOS UN OBJETO PARA VER SI EXISTE
            version: req.body.version
        })
        if(exist[0]!=null){                                                                                     // SI EXISTE Y NO ES NULL
            return res.status(409).json({                                                                       // RETORNAMOS HTTP 409, EXISTE
                questionSet: exist,
                message: 'Question Set Already Exists'})
        }
        await questionSet.save()                                                                                    // SI NO EXISTE LO GUARDAMOS
        return res.status(200).json({questionSet: questionSet, message: 'Set de preguntas creado exitosamente'})                           // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        return res.status(500).json({error: error.message})                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

questionSetCtrl.removeArrays = async(req , res) =>{
    try {
        questionSets = await QuestionSet.find()
        for (let i = 0; i < questionSets.length; i++) {
            await QuestionSet.update({_id: questionSets[i]._id}, {'$set': {'polls': []}})
            
        }

    } catch (error) {
        return res.status(400).json({error: error.message})        
    }
    return res.status(200).json({message: 'Question Sets updated successfully'})
}

module.exports = questionSetCtrl