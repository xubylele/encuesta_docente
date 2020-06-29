const courseModel = require('../models/Course');
const courseCtrl = {};

courseCtrl.createCourse = async (req, res) =>{
    try {
        const course = new courseModel(req.body);                                               // CREAMOS UN NUEVO CURSO
        await course.save();                                                               // LO GUARDAMOS
        res.status(200).json({course: course, menssage: ' Curso creado exitosamente'});         // DEVOLVEMOS STATUS OK
    } catch (error) {
        res.status(500).json({error});                                                          // DEVOLVEMOS STATUS ERROR
    }
}

courseCtrl.getAllCourses = async (req, res) =>{
    try {
        const courses = await courseModel.find();                                                     // BUSCAMOS TODOS LOS CURSOS Y LOS GUARDAMOS EN VARIBALE
        res.status(200).json(courses);                                                          // DEVOLVEMOS STATUS OK Y JSON CON TODOS LOS CURSOS
    } catch (error) {
        res.status(500).json(error);                                                            // DEVOLVEMOS ERROR
    }
}

courseCtrl.getCourse = async (req, res) =>{
    try {
        const course = await courseModel.findById(req.params.id);                               // BUSCAMOS UN CURSO POR SU ID
        res.status(200).json(course);                                                           // DEVOLVEMOS STATUS OK JUNTO CON EL JSON DE EL CURSO
    } catch (error) {
        res.status(500).json(error);                                                            // DEVOLVEMOS ERROR
    }
}

courseCtrl.editCourse = async (req, res) =>{
    const { id } = req.params;                                                                  // OBTENEMOS EL ID
    try {
        const course ={                                                                         // CREAMOS UN NUEVO OBJETO CON LOS PARAMETRO A EDITAR
            acronym: req.body.acronym,
            name: req.body.name
        }
        await courseModel.findByIdAndUpdate(id,{$set: course});                                 // LO BUSCAMOS POR EL ID Y LO ACTUALIZAMOS CON EL OBJETO CREADO
        res.status(200).json({course: course, menssage: ' Curso editado con exito'});           // DEVOLVEMOS ESTATUS OK
    } catch (error) {
        res.status(500).json(error);                                                            // DEVOLVEMOS ERROR
    }
}

courseCtrl.deleteCourse = async (req,res) =>{
    try {
        const course = await courseModel.findByIdAndDelete(req.body.id);                        // BUSCAMOS POR ID Y BORRAMOS
        res.status(200).json({course: course,menssage: ' Curso eliminado con exito'});          // DEVOLVEMOS STATUS OK
    } catch (error) {
        res.status(500).json(error);                                                            // DEVOLVEMOS ERROR
    }
}

module.exports = courseCtrl;