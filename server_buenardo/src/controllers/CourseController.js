const courseModel = require('../models/Course');
const participantListModel = require('../models/ParticipantList');
const courseCtrl = {};


courseCtrl.create = async (req, res) => {
    try {
        const course = new courseModel(req.body);
        const exist = await courseModel.find({
            acronym: req.body.acronym,
            name: req.body.name
        })
        if(exist[0]!=null){
            return res.status(409).json({
                course: course,
                message: 'Course Already Exists'});
        }
        await course.save();
        res.status(200).json({course: course, message: 'Curso creado exitosamente'});
    } catch (error) {
        res.status(500).json({error});
    }
}

courseCtrl.getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({error});
    }
}

courseCtrl.getCourse = async (req, res) =>{
    try {
        const course =  await courseModel.findById(req.params.courseID);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({error});
    }
}

courseCtrl.editCourse = async (req, res) =>{
    try {
        const course = {
            acronym: req.body.acronym,
            name: req.body.name
        }
        await courseModel.findByIdAndUpdate(req.body.courseID,{$set: course});
        res.status(200),json({message: 'Curso editado con exito'});
    } catch (error) {
        res.status(500).json({error, message:'No se pudo editar el curso'});
    }
}

courseCtrl.deleteCourse = async (req, res)=>{
    try {
        const course = await courseModel.findByIdAndDelete(req.body.courseID);
        res.status(200).json({course: course,message:'Curso eliminado con exito'});
        } catch (error) {
        res.status(500).json({error, message:'No se pudo eliminar el curso'});
    }
}

courseCtrl.addparticipantList = async (req, res)=>{
    try {
        course = await courseModel.findById(req.body.courseID);
        const participantList = await participantListModel.findById(req.body.participantListID);
        course.participantsList.push(participantList);
        course.save();
        res.status(200).json({participantList: participantList, message:'Participant List agregada con exito'});
    } catch (error) {
        res.status(500).json({error});
    }
}

module.exports = courseCtrl;