const userEnsignsModel = require('../models/UserEnsigns');

const userEnsignsCtrl = {}


userEnsignsCtrl.createUserEnsigns = async (req, res) => {
const createUserEnsigns = await new userEnsignsModel(req, res);
await userEnsignsModel.save();
res.json({
    'status': 'User Ensigns Created'
});
}

userEnsignsCtrl.getUserEnsigns = async(req, res) => {
    const userEnsigns = await userEnsignsModel.findById(req.params.id);
    res.json(userEnsigns)
}

userEnsignsCtrl.remove = async(req, res) => {
    userEnsignsModel.findByIdAndDelete(req.params.id);
}