const ensignModel = require('../models/Ensign');
const ensignCtrl = {};


ensignCtrl.createEnsign = async (req, res) =>{

    const ensign =  await new ensignModel(req,res);
    await ensign.save();
    res.json({
        'status':'Ensign Created '
    });
}

ensignCtrl.getEnsign = async (req, res) => {

    const ensign = await ensignModel.findById(req.params.id);
    res.json(ensign);
}

ensignCtrl.removeEnsign = async (req, res) => {

    const ensign = await ensignModel.findByIdAndDelete(req.params.id);
    res.json({
       'status': 'Ensign Deleted' 
    });
}

ensignCtrl.editEnsign = async (req, res) => {
    const { id } = req.params;
//    const ensign{

//    }
}