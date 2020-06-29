const userModel = require('../models/User');
const ctrl = require('./AuthController');
const userCtrl = {};


// ***** BASICAS ****
userCtrl.createUser= async (req, res) => {

    const user = await new userModel(req,res);                 //LE ASIGNAMOS LOS DATOS QUE INGRESAN EN EL FRONT
    /*FALTA FUNCIÓN IF EXISTE
     EN BASE DE DATOS */   
    await user.save();                                         //GUARDAMOS
    res.json({
        'status': 'User Created'                               //DEVOLVEMNOS EL ESTADO DE CREADO
    });
}

userCtrl.getUsers = async (req, res) =>{
    const users = await userModel.find();
    res.status(200).json(users);
}

userCtrl.getUser= async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.json(user);
}

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;                                  // DEJAMOS EL ID , TONMANDOLOS DESDE LO ANTERIOR
    const user = {                                              // PARAMETROS A EDITAR
    //   name: req.body.name,
    //    last_name: req.body.last_nameM,
        email: req.body.email,                  
        password: req.body.password,
        timestap: req.body.timestap
        /* PARA AGREGAR ENCUESTAS Y 
        PARTICIPANTES HARÉMOS OTRA FUNCIÓN */
    }
    await userModel.findByIdAndUpdate(id,{$set: user});         // BUSCAMOS Y GUARDAMOS
}

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