const ensignModel = require('../models/Ensign');
const ensignCtrl = {};


ensignCtrl.createEnsign = async (req, res) =>{
/*REVISAR */
const ensign = new ensignModel(req.body);                                               // CREAMOS UN OBJETO CON LOS ATRIBUTOS 
    try {
        await ensign.save();                                                            // LOS GUARDAMOS
        res.status(200).json({ ensign: ensign,message: 'Insginia Creada con exito'});   // INDICAMOS EXITO
    } catch (error) {
        res.status(500).json({error});                                                  // INDICAMOS ERROR
    }
}

ensignCtrl.getAllEnsigns = async (req, res) => {
    try {
        const ensigns = await ensignModel.find();                                       // BUSCAMOS TODOS LAS INSIGNIAS
        res.status(200).json({ensigns});                                                // DEVOLVEMOS OK Y UN JSON CON TODAS LAS INSIGNIAS
    } catch (error) {
        res.status(500).json({error});                                                  // DEVOLVEMOS ERROR
    }
}

ensignCtrl.getEnsign = async (req, res) => {
    try {
        const ensign = await ensignModel.findById(req.params.id);                       // BUSCAMOS EL OBJETO POR EL ID
        res.status(200).json(ensign);                                                   // RESPONDEMOS CON EL OBJETO

    } catch (error) {
        res.status(500).json({error});                                                  // INDICAMOS ERROR
    }
}

ensignCtrl.removeEnsign = async (req, res) => {
    try {
        const ensign = await ensignModel.findByIdAndDelete(req.params.id);              // BUSCAMOS Y ELIMINAMOS SEGÚN EL ID 
        /* HAY QUE REVISAR YA QUE SE DEBERÍAN ELIMINAR ANTES LOS
        DESDE LA BASE DE DATOS EWE */
        res.status(200).json({ensign: ensign, message: 'Insignia eliminada con exito'});// INDICAMOS EXITO
    } catch (error) {
        res.status(500).json({error});                                                  // INDICAMOS ERROR
    }
}

ensignCtrl.editEnsignName = async (req, res) => {
    const { id } = req.params;                                                           // OBTENEMOS EL ID 
    try {
        const ensign = await ensignModel.findById(req.params.id);                        // BUSCAMOS EL ID DE LA INSIGNIA
        ensign.name = req.body.name;                                                     // CAMBIAMOS EL NOMBRE
        await ensignModel.findByIdAndUpdate(id,{$set: ensign});                          // BUSCAMOS Y GUARDAMOS    
        res.status(200).json({ensign: ensign, message: 'Insignia editada con exito'})    // INDICAMOS EXITO
    } catch (error) {
        res.status(500).json({error});                                                   // INDICAMOS ERROR
    }
}

module.exports = ensignCtrl;
/* FALTAN FUNCIONES COMPLEJAS */