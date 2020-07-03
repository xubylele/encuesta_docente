const pollModel = require('../models/Poll');
const pollCtrl = {} ;

pollCtrl.createPoll = async (req, res) => {
    try {
        const poll = new pollModel(req.body);
        await poll.save();
        res.status(200).json({poll: poll, message: 'Encuesta creada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.getAllPolls = async (req, res) => {
    try {
        const polls = await pollModel.find();
        res.status(200).json(polls)
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.getPoll = async (req, res) =>{
    try {
        const poll = await pollModel.findById(req.params.id);
        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.setState = async (req, res) =>{
    console.log("iwi");
    const { id } = await req.params;

    try {
        console.log("enter");
        const poll = {
            state: req.body.state
        }
        await pollModel.findByIdAndUpdate(id,{$set: poll});
        res.status(200).json({poll: poll, menssage: 'Encuesta editada'});
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.deletePoll = async (req, res ) =>{
    try {
        const poll = await pollModel.findByIdAndRemove(req.body.id);
        res.status(200).json({poll: poll , menssage: 'Encuesta eliminada'});
    } catch (error) {
        res.status(500).json({error});
    }
}
module.exports = pollCtrl;