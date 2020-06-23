const ensignModel = require('../models/Ensign');
const ensignCtrl = {};


ensignCtrl.createEnsign = async (req, res) =>{
/*REVISAR */
    const ensign =  await new ensignModel(req,res);                     //  CREAMOS UN OBJETO CON LOS ATRIBUTOS 
    await ensign.save();                                                //  LOS GUARDAMOS
    res.json({      
        'status':'Ensign Created '                                      //  DAMOS STATUS OK
    });
}

ensignCtrl.getEnsign = async (req, res) => {

    const ensign = await ensignModel.findById(req.params.id);           //  BUSCAMOS EL OBJETO POR EL ID
    res.json(ensign);                                                   //  RESPONDEMOS CON EL OBJETO
}

ensignCtrl.removeEnsign = async (req, res) => {

    const ensign = await ensignModel.findByIdAndDelete(req.params.id);  //  BUSCAMOS Y ELIMINAMOS SEGÚN EL ID 
    /* HAY QUE REVISAR YA QUE SE DEBERÍAN ELIMINAR ANTES LOS
    DESDE LA BASE DE DATOS EWE */
    res.json({
       'status': 'Ensign Deleted'                                       //  DAMOS STATUS OK
    });
}

ensignCtrl.editEnsignName = async (req, res) => {
    const { id } = req.params;                                          // OBTENEMOS EL ID 
    const ensign = ensignModel.findById(req.params.id);                 // BUSCAMOS EL ID DE LA INSIGNIA
    ensign.name = req.body.name;                                        // CAMBIAMOS EL NOMBRE
    await ensignModel.findByIdAndUpdate(id,{$set: ensign});             // BUSCAMOS Y GUARDAMOS 
}


/* FALTAN FUNCIONES COMPLEJAS */