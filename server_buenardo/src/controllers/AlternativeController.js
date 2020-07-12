const alternativeCtrl = {}
const { Alternative, AlternativeSet } = require('../models')

alternativeCtrl.create = async(req ,res) =>{    
    if(req.body.alternativeSetID == null)
        return res.status(400).json({error: 'Se necesita un set de alternativas'})

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

alternativeCtrl.createMuch = async (req, res) =>{
    if(req.body.alternativeSetID == null)
        return res.status(400).json({error: 'Un set de alternativas'})

    try {
        for (let i = 0; i < req.body.alternatives.length; i++) {
            const alternative = new Alternative()
            alternative.alternative = req.body.alternatives[i].alternative
            const alternativeSet = await AlternativeSet.findById(req.body.alternativeSetID)

            alternative.alternativeSet = alternativeSet
            
            const exist = await Alternative.find({
                alternative: req.body.alternatives[i].alternative,
                alternativeSet: alternativeSet._id                                                        // EMAIL
            });

            if(exist[0]==null){                                                                     // SI ES QUE EXISTE
                await alternative.save()

                AlternativeSet.update(
                    {"_id": req.body.alternativeSetID}, 
                    {"$push": { "alternatives": alternative } },
                    function (err, callback) {
                        
                    }
                )                                                   // MENSAJE USUARIO EXISTE
            }

            
        }

        
                                                                          // GUARDAMOS EN LA BASE DE DATOS
        return res.status(200).json({message: 'Alternativas creada exitosamente'});             // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                    
        console.log(error)                       // OBTENEMOS EL ERROR
        return res.status(500).json({error: error.message});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    } 
}

alternativeCtrl.removeArrays = async(req , res) =>{
    try {
        alternatives = await Alternative.find()
        for (let i = 0; i < alternatives.length; i++) {
            await Alternative.update({_id: alternatives[i]._id}, {'$set': {'answers': []}})
            
        }

    } catch (error) {
        return res.status(400).json({error: error.message})        
    }
    return res.status(200).json({message: 'Alternatives updated successfully'})
}

module.exports = alternativeCtrl