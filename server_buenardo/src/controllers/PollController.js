const { Poll } = require('../models');
const pollCtrl = {};


pollCtrl.create =  async (req, res) =>{
    try {
        const poll = new Poll(req.body);
        await poll.save();
        res.status(200).json({ poll: poll, mensagge:' Poll guardada con exito'});
    } catch (error) {
        res.status(500).json({error, message:'No se pudo guardar la poll' });
    }
}

pollCtrl.getAllpolls = async (req, res) =>{
    try {
        const polls =  await Poll.find();
        res.status(200).json(polls);
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.getpoll = async (req, res) =>{
    try {
        const poll = await Poll.findById(req.params.id);
        res.status(200).json(poll);
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.deletepoll = async(req, res) =>{
    try {    
        const poll =  await Poll.findByIdAndDelete(req.body.pollID);
        res.status(200).json({poll: poll,message:'Poll eliminada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

pollCtrl.addAnswer = async (req, res) =>{
    try {
        const poll = await Poll.findById(req.body.pollID);
        poll.answers.push(req.body.answerID);
        poll.save();
        res.status(200).json({answer: poll.answer, message: 'Respuesta guardada'})
    } catch (error) {
        res.status(500).json({error});
    }
}