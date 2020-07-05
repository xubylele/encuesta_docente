const {TeachersBadge, Badge, ParticipantList} = require('../models');
const teacherBadgeCtrl = {};

teacherBadgeCtrl.createTeacherBadge = async (req, res) => {
    try {
        const teacher = await ParticipantList.findById(req.body.teacherID);
        const badge = await Badge.findById(req.body.badgeID);
        const found = await TeachersBadge.find({teacher: teacher,badge: badge});

        if(found[0]!=null){
            return res.status(409).json({menssage:'Already exists'});
        }else{
            const teacherBadge = new TeachersBadge({
                teacher: teacher,
                badge: badge,
            })
            await teacherBadge.save();

            Badge.update(
                {"_id": req.body.badgeID}, 
                {"$push": { "teachersBadge": teacherBadge } },
                function (err, callback) {
                    
                }
            )   

            ParticipantList.update(
                {"_id": req.body.teacherID},
                {"$push": { teachersBadge: teacherBadge} },
                function (err, callback) {
                    
                }
            )
                
            res.status(200).json({teacherBadge: teacherBadge, message:'Badge asignada con exito'});
        }
    } catch (error) {
        res.status(500).json({error,message:'No se pudo asignar insigncia'});
    }
}

teacherBadgeCtrl.getAllTeacherBadges = async (req, res) =>{
    try {
        const teacherBadges = await TeachersBadge.find();
        res.status(200).json(teacherBadges);
    } catch (error) {
        res.status(500).json({error});
    }
}

teacherBadgeCtrl.getTeacherBadge = async (req, res) =>{
    try {
        const teacherBadge = await TeachersBadge.findById(req.params.id);
        res.status(200).json(teacherBadge);
    } catch (error) {
        res.status(500).json({error});
    }
}

teacherBadgeCtrl.remove = async (req, res) => {
    try {
        const teacherBadge = await TeachersBadge.findByIdAndDelete(req.body.teacherBadgeID);
        Badge.update(
            {"_id": req.body.badgeID}, 
            {"$pull": { "teachersBadge": teacherBadge } },
            function (err, callback) {
                
            }
        )   
        res.status(200).json({teacherBadge: teacherBadge, message:'Teacher badge eliminada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = teacherBadgeCtrl;