const { Badge } = require('../models')
const badgeCtrl = {}

badgeCtrl.createMuch = async (req, res) =>{
    for (let i = 0; i < req.body.badges.length; i++) {
        try {
            const badge = new Badge()
            badge.name = req.body.badges[i].name
            const exist = await Badge.find({
               name: badge.name
            })
            if(exist[0]!=null){
                return res.status(409).json({badge: exist[0], message: 'Badge already exists'})
            }
    
            await badge.save()
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message ,message: 'No se pudo crear el badge'})
        }
        
    }
    return res.status(200).json({message:'Creadas con exito'})
}

badgeCtrl.create = async (req, res) =>{
    try {
        const badge = new Badge(req.body)
        const exist = await Badge.find({
           name: req.body.name
        })
        if(exist[0]!=null){
            return res.status(409).json({badge: badge, message: 'Badge already exists'})
        }

        await badge.save()
        res.status(200).json({badge:badge,message:'Creada con exito'})
    } catch (error) {
        res.status(500).json({error,message: 'No se pudo crear el badge'})
    }
}

badgeCtrl.getAllBadges = async (req, res) =>{
    try {
        const badges = await Badge.find()
        res.status(200).json(badges)
    } catch (error) {
        res.status(500).json({error})
    }
}

badgeCtrl.getBadge = async (req, res) =>{
    try {
        const badge = await Badge.findById(req.params.id)
        res.status(200).json(badge)
    } catch (error) {
        res.status(500).json({error})
    }
}

badgeCtrl.editBadgename = async (req, res) =>{
    try {
        const tempbadge={
            name: req.body.badgeName
        }
        const badge = await Badge.findByIdAndUpdate(req.body.badgeID,{$set: tempbadge})
        res.status(200).json({badge:badge,menssage:'Badge Actualizada con exito'})
    } catch (error) {
        res.status(500).json({error})
    }
}

badgeCtrl.removeBadge = async (req ,res) =>{
 try {
     const badge = await Badge.findByIdAndDelete(req.body.badgeID)
     res.status(200).json({badge:badge,message:'Badge eliminada con exito'})
 } catch (error) {
     res.status(500).json({error})
 }   
}

badgeCtrl.removeArrays = async(req , res) =>{
    try {
        badges = await Badge.find()
        for (let i = 0; i < badges.length; i++) {
            await Badge.update({_id: badges[i]._id}, {'$set': {'teachersBadge': []}})
            
        }

    } catch (error) {
        return res.status(400).json({error: error.message})        
    }
    return res.status(200).json({message: 'Badges updated successfully'})
}

module.exports = badgeCtrl