const userModel = require('../models/User');
const ctrl = require('./AuthController');
const userCtrl = {};


// ***** BASICAS ****
userCtrl.createUser = async (req, res) => {
const user = new userModel(req.body);                                             // LE ASIGNAMOS LOS DATOS QUE INGRESAN EN EL FRONT.
try {
    /*FALTA FUNCIÓN IF EXISTE
     EN BASE DE DATOS */   
    await user.save();                                                            // GUARDAMOS EL NUEVO USUARIO EN LA BASE DE DATOS.
    res.status(200).json({user: user, message: 'Usuario creado con exito'});      // DEVOLVEMOS EL ESTADO DE EXITO.
} catch (error) {
    res.status(500).json({error});                                                // DEVOLVEMOS ERROR.
}
}

userCtrl.getAllUsers = async (req, res) =>{
try {
    const users = await userModel.find();                                         // BUSCAMOS TODOS LOS USUARIOS.
    res.status(200).json(users);                                                  // DEVOLVEMOS STATUS OK Y JSON CON LOS USUARIOS.
} catch (error) {
    res.status(500).json({error});                                                // DEVOLVEMOS ERROR
}
}

userCtrl.getUser= async (req, res) => {
try {
    const user = await userModel.findById(req.params.id);                         // BUSCAMOS EL USUARIO POR EL ID
    res.status(200).json(user);                                                   // DEVOLVEMOS STATUS OK
} catch (error) {
    res.status(500).json({error});                                                // DEVOLVEMOS ERROR
}}

userCtrl.editUser = async (req, res) => {
    try {
        const { id } = req.params;                                                // DEJAMOS EL ID , TONMANDOLOS DESDE LO ANTERIOR
        const user = {                                                            // PARAMETROS A EDITAR
            email: req.body.email,                  
            password: req.body.password
            /* PARA AGREGAR ENCUESTAS Y 
            PARTICIPANTES HARÉMOS OTRA FUNCIÓN */
        }
        await userModel.findByIdAndUpdate(id,{$set: user});                       // BUSCAMOS Y GUARDAMOS
        res.status(200).json({user: user, message: 'Usuario editado con exito'})  // DEVOLVEMOS STATUS OK
    } catch (error) {
        res.status(500).json({error})                                             // DEVOLVEMOS ERROR
    }
}/* OJO QUE LA FUNCIÓN AL CAMBIAR LA PASSWORD NO LA ENCRIPTA. -->AVERIGUAR<---- */

userCtrl.remove = async(req, res) => {
    try {
        const user = await userModel.findByIdAndRemove(req.body.id);               // BUSCAMOS Y ELIMINAMOS
        res.status(200).json({user: user, message: 'Ususario eliminado con exito'})// DEVOLVEMOS STATUS OK
    } catch (error) {
        res.status(500).json({error})                                              // DEVOLVEMOS STATUS ERROR
    }
}

/* FUNCIONES COMPLEJAS */
// userCtrl.

module.exports = userCtrl