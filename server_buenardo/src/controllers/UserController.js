const userModel = require('../models/User');
const participantList = require('../models/ParticipantList');
const userCtrl = {};


userCtrl.createUser = async (req, res) =>{
    try {
        const user = new userModel(req.body);                                                   // CREAMOS UN NUEVO OBJETO USUARIO

        const exist = await userModel.find({                                                    // CONSULATAMOS CON LA BASE DE DATOS
            names: req.body.names,                                                              // NOMBRES
            last_names: req.body.last_names,                                                    // APELLIDOS
            email: req.body.email                                                               // EMAIL
        });
        if(exist[0]!=null){                                                                     // SI ES QUE EXISTE
            return res.status(409).json({                                                       // RETORNAMOS UN HTTP STATUS 409 (EXISTS)
                user:{                                                                          // USUARIO SOLO CON DATOS PUBLICOS
                    names: req.body.names,                                                          
                    last_names: req.body.last_names,
                    email: req.body.email},
                message: 'User Exists'});                                                       // MENSAJE USUARIO EXISTE
        }
        await user.save();                                                                      // GUARDAMOS EN LA BASE DE DATOS
        res.status(200).json({user: user, message: 'Usuario creado exitosamente'});             // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    }                                                                                           
}                                                                                               

userCtrl.getUser = async (req, res) =>{                                                         
    try {                                                                                       
        const user = await userModel.findById(req.params.id);                                   // GUARDAMOS EL USUARIO CONSULTADO POR ID
        res.status(200).json(user);                                                             // DEVOLVEMOS STATU OK Y USER
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error});                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

userCtrl.getAllUsers = async (req, res) =>{                                                     
    try {
        const users = await userModel.find();                                                   // GUARDAMOS EL ARREGLO DE USUARIOS ENCONTRADOS
        res.status(200).json(users);                                                            // DEVOLVEMOS STATUS OK Y LA LISTA DE USUARIOS 
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error});                                                          // DEVOLVEMOS STATUS 500 Y EL ERROR
    }
}

userCtrl.deleteUser = async(req ,res) =>{
    try {
        const user = await userModel.findByIdAndDelete(req.body.userID);                          // BUSCAMOS, GUARDAMOS Y ELIMINAMOS EL USUARIO  
        res.status(200).json({user: user, message:'Usuario eliminado con exito'});              // DEVOLVEMOS STATUS OK Y EL USUARIO + MENSAJE
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error});                                                          // DEVOLVEMOS STATUS 500 Y EL ERROR 
    }
}

userCtrl.editPassword = async (req, res) =>{
    try {
        const user = await userModel.findById(req.body.userID);                                 // OBTENEMOS EL USUARIO BY ID
        user.password = req.body.password;                                                      // MODIFICAMOS LA PASSWORD LOCAL
        await user.save();                                                                      // LO GUARDAMOS
    res.status(200).json({message: 'Contraseña modificada correctamnte'});                      // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        res.status(500).json({error});                                                          // DEVOLVEMOS STATUS 500 Y ERROR
    }
}

userCtrl.addParticipants = async (req, res) =>{
    try {
        const user = await userModel.findById(req.body.userID);                                                     // OBTENEMOS USUARIO
        const tentativeParticipantList = await participantList.findById(req.body.participantID);                    // OBTENEMOS PARTICIPANT LIST
        user.participants.push(tentativeParticipantList);                                                           // AÑADIMOS PARTICIPANT LIST A ARREGLO
        user.save();                                                                                                // GUARDAMOS EN BASE DE DATOS 
       res.status(200).json({participant: tentativeParticipantList ,message: 'participante agregado con exito '});  // DEVOLVEMOS STATUS OK Y MENSAJE
    } catch (error) {                                                                                               // ATRAPAMOS EL ERROR
        res.status(500).json({error});                                                                              // DEVOLVEMOS EL ERROR
    }
}


module.exports = userCtrl;