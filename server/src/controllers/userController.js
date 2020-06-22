const userModel = require('../models/User');
const userCtrl = {};


// ***** BASICAS ****
userCtrl.createUser= async (req, res) => {

    const user = await new userModel(req,res);      //LE ASIGNAMOS LOS DATOS QUE INGRESAN EN EL FRONT
    /*FALTA FUNCIÓN IF EXISTE EN BASE DE DATOS */   
    await user.save();                              //GUARDAMOS
    res.json({
        'status': 'User Created'                    //DEVOLVEMNOS EL ESTADO DE CREADO
    });
}

userCtrl.getUser= async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.json(user);
}

userCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
    //   name: req.body.name,
    //    last_name: req.body.last_nameM,
        email: req.body.email,
        password: req.body.password,
        timestap: req.body.timestap
        /* PARA AGREGAR ENCUESTAS Y PARTICIPANTES HARÉMOS OTRA FUNCIÓN */
    }
    await userModel.findByIdAndUpdate(id,{$set: user});
}

userCtrl.remove = async(req, res) => {
    const user = userModel.findByIdAndRemove(req.params.id);
    res.json({
        'status': 'User Deleted'
    });
}

/* FUNCIONES COMPLEJAS */
// userCtrl.

