const userEnsignsModel = require('../models/UserEnsigns');
const semesterCourseModel = require('../models/SemesterCourse');
const ensignsModel = require('../models/Ensign');
const userModel = require('../models/User');
const userEnsignsCtrl = {}


userEnsignsCtrl.createUserEnsigns = async (req, res) => {
    try {
        const semesterCourse = await semesterCourseModel.findById(req.body.semesterCourseID);                                   // BUSCAMOS EL CURSO SEMESTRAL
        const ensign = await ensignsModel.findById(req.body.ensignID);                                                          // BUSCAMOS LA INSIGNIA
        const participant = await userModel.findById(req.body.participantID);                                                   // BUSCAMOS AL PARTICIPANTE
        const found = await userEnsignsModel.find({semesterCourse: semesterCourse,ensign: ensign,participant: participant});    // BUSCAMOS COINCIDENCIAS EN BD
        if(found[0]!=null){                                                                                                     // SI HAY CONCIDENCIAS !NULL
            return res.status(400).json({message:'ALREADY EXISTS',found});                                                      // RETORNAMOS QUE YA EXISTE Y TERMINAMOS
        }else{                                                                                                                  // SI NO
            const userEnsigns = await new userEnsignsModel({                                                                    // CREAMOS UN NUEVO OBJETO 
                semesterCourse: semesterCourse,                                                                                 // LE ASIGNAMOS EL CURSO SEMESTRAL
                ensign: ensign,                                                                                                 // LE ASIGNAMOS LA INSIGNIA
                participant:participant                                                                                         // LE ASIGNAMOS EL PARTICIPANTE
            });                                                                                                                 
            await userEnsigns.save();                                                                                           // LO GUARDAMOS
            res.status(200).json({userEnsigns: userEnsigns, mesagge :' INSIGNIA DE USUARIO CREADA EXITOSAMENTE '});             // DEVOLVEMOS STATUS OK
        }                                                                                                                       
    } catch (error) {                                                                                                           // OBETENEMOS EL ERROR
        res.status(500).json({error,message: 'NO SE PUDO CREAR INSIGNIA'});                                                     // DEVOLVEMOS ESTUS 500, NO SE PUDO AGREGAR
    }
}

userEnsignsCtrl.getAllUserEnsigns = async(req, res) => {
    try {
        const userEnsigns = await userEnsignsModel.find();                                                                      // BUSCAMOS TODAS LAS COINICDENCIAS
        res.status(200).json(userEnsigns);                                                                                      // RESPONDEMOS CON LAS ENCONTRADAS
    } catch (error) {                                                                                                           // PILLAMOS ERROR
        res.status(500).json({error});                                                                                          // RESPONDEMOS CON EL ERROR
    }
}
userEnsignsCtrl.getUserEnsign = async (req, res)=>{
    try {
        const userEnsign = await userEnsignsModel.findById(req.params.id);                                                      // BUSCAMOS COINCIDENCIA CON EL ID PASADO POR PARAMETROS
        res.status(200).json(userEnsign);                                                                                       // DEVOLVEMOS USUARIO ENCONTRADO
    } catch (error) {                                                                                                           // PILLAMOS EL ERROR
        res.status(500).json({error});                                                                                          // DEVOLVEMOS EL ERROR
    }
}

userEnsignsCtrl.remove = async(req, res) => {
    try {
       userEnsign = await userEnsignsModel.findByIdAndDelete(req.body.id);                                                    // BUSCAMOS EL USUARIO Y LO ELIMINAMOS
       res.status(200).json({userEnsign: userEnsign, message: 'INSIGNIA DE USUARIO ELIMINADA'});                                // DEVOLVEMOS STATUS OK Y MENSAJE ELIMINADO                                                                                       // DEVOLVEMOS STATUS OK
    } catch (error) {                                                                                                           // PILLAMOS ERROR
        res.status(500).json({message: 'NO SE PUDO ELIMINAR'});                                                                 // DEVOLVEMOS ERROR Y MENSAJE NO SE PUDO ELIMINAR
    }
}

module.exports = userEnsignsCtrl;