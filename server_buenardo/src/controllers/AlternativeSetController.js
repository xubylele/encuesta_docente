const { AlternativeSet } = require('../models')
const alternativeSetCtrl = {}

alternativeSetCtrl.create = async (req, res) => {
    try {
        const alternativeSet = new AlternativeSet(req.body)                                                                     // CREAMOS UN NUEVO OBJETO CURSO
        const exist = await AlternativeSet.find({                                                                       // CREAMOS UN OBJETO PARA VER SI EXISTE
            version: req.body.version
        })
        if(exist[0]!=null){                                                                                     // SI EXISTE Y NO ES NULL
            return res.status(409).json({                                                                       // RETORNAMOS HTTP 409, EXISTE
                alternativeSet: exist,
                message: 'Alternative Set Already Exists'})
        }
        await alternativeSet.save()                                                                                    // SI NO EXISTE LO GUARDAMOS
        return res.status(200).json({alternativeSet: alternativeSet, message: 'Set de alternativas creado exitosamente'})                           // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                                           // OBTENEMOS ERROR
        return res.status(500).json({error: error.message})                                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

module.exports = alternativeSetCtrl