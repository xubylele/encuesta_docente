const userModel = require('../models/User');
const ctrl = require('./AuthController');
const userCtrl = {};


// ***** BASICAS ****
userCtrl.createUser = async (req, res) => {
const user = new userModel(req.body);                 //LE ASIGNAMOS LOS DATOS QUE INGRESAN EN EL FRONT
try {
    console.log(user);

    /*FALTA FUNCIÓN IF EXISTE
     EN BASE DE DATOS */   
    await user.save();                                         //GUARDAMOS
    res.status(200).json({user: user, message: 'Usuario creado con exito'});
} catch (error) {
    res.status(500).json({error});
}
}

userCtrl.getUsers = async (req, res) =>{
try {
    const users = await userModel.find();
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({error});
}
}

userCtrl.getUser= async (req, res) => {
try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
} catch (error) {
    res.status(500).json({error});
}}

userCtrl.editUser = async (req, res) => {
    try {
        const { id } = req.params;                                  // DEJAMOS EL ID , TONMANDOLOS DESDE LO ANTERIOR
        const user = {                                              // PARAMETROS A EDITAR
            email: req.body.email,                  
            password: req.body.password
            /* PARA AGREGAR ENCUESTAS Y 
            PARTICIPANTES HARÉMOS OTRA FUNCIÓN */
        }
        await userModel.findByIdAndUpdate(id,{$set: user});         // BUSCAMOS Y GUARDAMOS
        res.status(200).json({user: user, message: 'Usuario editado con exito'})
    } catch (error) {
        res.status(500).json({error})
    }
}/* OJO QUE LA FUNCIÓN AL CAMBIAR LA PASSWORD NO LA ENCRIPTA. AVERIGUAR */

userCtrl.remove = async(req, res) => {
    console.log('gola')
    try {
        const user = await userModel.findByIdAndRemove(req.body.id);    // BUSCAMOS Y ELIMINAMOS
        res.status(200).json({user: user, message: 'Ususario eliminado con exito'})
        
    } catch (error) {
        res.status(500).json({error})
    }
}

/* FUNCIONES COMPLEJAS */
// userCtrl.

module.exports = userCtrl