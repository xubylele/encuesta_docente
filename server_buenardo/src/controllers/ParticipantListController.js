const participantListModel = require('../models/ParticipantList');
const userModel = require('../models/User');
const participantListCtrl = {};



participantListCtrl.create = async(req ,res) =>{    
    try {
    const participantList = new participantListModel(req.body);
    const user = await userModel.findById(req.body.userID);
    participantList.user = user;
    await participantList.save();
    res.status(200).json({participantList: participantList, message: 'ParticipantList Creado Exitosamente'});
    } catch (error) {
        res.status(500).json({error});
    }
}
module.exports = participantListCtrl;