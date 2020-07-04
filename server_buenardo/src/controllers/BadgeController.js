const { Badge } = require('../models');
const badgeCtrl = {};

badgeCtrl.create = async (req, res) =>{
    try {
        const badge = new Badge(req.body);
        const exist = Badge.find({
           name: req.body.name
        })

        if(exist[0]!=null){
            return res.status(409).json({badge: badge, message: 'Badge already exists'});
        }

        await badge.save();
        res.status(200).json({badge:badge,message:'Creada con exito'});
    } catch (error) {
        res.status(500).json({error,message: 'No se pudo crear el badge'});
    }
}

badgeCtrl.getAllBadges = async (req, res) =>{
    try {
        const badges = await Badge.find();
        res.status(200).json(badges);
    } catch (error) {
        res.status(500).json({error});
    }
}

badgeCtrl.getBadge = async (req, res) =>{
    try {
        const badge = await Badge.findById(req.params.id);
        res.status(200).json(badge);
    } catch (error) {
        res.status(500).json({error});
    }
}

badgeCtrl.editBadgename = async (req, res) =>{
    try {
        const tempbadge={
            name: req.body.badgeName
        }
        const badge = await Badge.findByIdAndUpdate(req.body.badgeID,{$set: tempbadge});
        res.status(200).json({badge:badge,menssage:'Badge Actualizada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

badgeCtrl.removeBadge = async (req ,res) =>{
 try {
     const badge = await Badge.findByIdAndDelete(req.body.badgeID);
     res.status(200).json({badge:badge,message:'Badge eliminada con exito'});
 } catch (error) {
     res.status(500).json({error});
 }   
}

module.exports = badgeCtrl;