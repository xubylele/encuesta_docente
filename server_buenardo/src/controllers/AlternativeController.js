const alternativeCtrl = {}
const { Alternative, AlternativeSet } = require('../models')

alternativeCtrl.create = async(req ,res) =>{    
    if(req.body.alternativeSetID == null)
        return res.status(400).json({error: 'Un set de alternativas'})

    try {
        const alternative = new Alternative(req.body)
        const alternativeSet = await AlternativeSet.findById(req.body.alternativeSetID)

        alternative.alternativeSet = alternativeSet
        
        const exist = await Alternative.find({
            alternative: req.body.alternative,
            alternativeSet: alternativeSet._id                                                        // EMAIL
        });

        if(exist[0]!=null){                                                                     // SI ES QUE EXISTE
            return res.status(409).json({                                                       // RETORNAMOS UN HTTP STATUS 409 (EXISTS)
                alternative: exist,
                message: 'Alternative already exists'});                                                       // MENSAJE USUARIO EXISTE
        }

        await alternative.save()

        AlternativeSet.update(
            {"_id": req.body.alternativeSetID}, 
            {"$push": { "alternatives": alternative } },
            function (err, callback) {
                
            }
        )
                                                                          // GUARDAMOS EN LA BASE DE DATOS
        return res.status(200).json({alternative: alternative, message: 'Alternativa creada exitosamente'});             // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        return res.status(500).json({error: error.message});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    } 
}

module.exports = alternativeCtrl