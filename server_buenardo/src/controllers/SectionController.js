const {  } = require('../models')
const sectionCtrl = {}
const { Section } = require('../models')

sectionCtrl.create = async(req ,res) =>{    
    try {
        const section = new Section(req.body);                                                   // CREAMOS UN NUEVO OBJETO USUARIO

        
        await section.save();                                                                      // GUARDAMOS EN LA BASE DE DATOS
        res.status(200).json({section: section, message: 'Seccion creada exitosamente'});             // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    } 
}

sectionCtrl.getSectionList = async(req, res) => {
    try {
        const sectionList = await Section.find().populate('questions', 'question')

        if(!sectionList) return res.status(400).json({error: 'No hay secciones aun'})

        return res.status(200).json({sectionList: sectionList})
    } catch (error) {
        res.status(500).json({error: error.message});     
    }
}

module.exports = sectionCtrl