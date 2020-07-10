const questionController = {}
const { Question, Section, QuestionSet, AlternativeSet, Alternative } = require('../models')

questionController.createMuch = async(req , res) =>{
    for (let i = 0; i < req.body.questions.length; i++) {
        try {
            const question = new Question()
            const section = await Section.findOne({name: req.body.questions[i].section})
            const alternativeSet = await AlternativeSet.findOne({version: req.body.questions[i].alternativeSet})
            const questionSet = await QuestionSet.findOne({version: req.body.questions[i].questionSet})
    
            console.log(section)

            question.question = req.body.questions[i].question
            question.section = section
            question.alternativeSet = alternativeSet
            question.questionSet = questionSet
            
            const exist = await Question.find({                                                    // CONSULATAMOS CON LA BASE DE DATOS
                section: section._id,
                question: req.body.question,
                questionSet: questionSet._id,
                alternativeSet: alternativeSet._id                                                   // EMAIL
            });
    
            if(exist[0]!=null){                                                                     // SI ES QUE EXISTE
                return res.status(409).json({                                                       // RETORNAMOS UN HTTP STATUS 409 (EXISTS)
                    question: exist,
                    message: 'Question Exists'});                                                       // MENSAJE USUARIO EXISTE
            }
    
            await question.save()
            
            Section.update(
                {"_id": section._id}, 
                {"$push": { "questions": question } },
                function (err, callback) {
                    
                }
            )
    
            QuestionSet.update(
                {"_id": questionSet._id}, 
                {"$push": { "questions": question } },
                function (err, callback) {
                    
                }
            )
    
            AlternativeSet.update(
                {"_id": alternativeSet._id}, 
                {"$push": { "questions": question } },
                function (err, callback) {
                    
                }
            )
                                                                              // GUARDAMOS EN LA BASE DE DATOS
                         // RESPONDEMOS CON HTTP 200, OK
        } catch (error) {                                                                           // OBTENEMOS EL ERROR
            console.log(error)
            return res.status(500).json({error: error.message});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
        } 
        
    }
    return res.status(200).json({message: 'Preguntas creada exitosamente'});
    
}

questionController.create = async(req ,res) =>{  
    console.log(req.body.questionSetID)  
    if(req.body.sectionID == null || req.body.questionSetID == null || req.body.alternativeSetID == null)
        return res.status(400).json({error: 'Debes proporcionar una seccion, un set de alternativas y un set de preguntas'})

    try {
        const question = new Question(req.body)
        const section = await Section.findById(req.body.sectionID)
        const alternativeSet = await AlternativeSet.findById(req.body.alternativeSetID)
        const questionSet = await QuestionSet.findById(req.body.questionSetID)

        question.section = section
        question.alternativeSet = alternativeSet
        question.questionSet = questionSet
        
        const exist = await Question.find({                                                    // CONSULATAMOS CON LA BASE DE DATOS
            section: section._id,
            question: req.body.question,
            questionSet: questionSet._id,
            alternativeSet: alternativeSet._id                                                   // EMAIL
        });

        if(exist[0]!=null){                                                                     // SI ES QUE EXISTE
            return res.status(409).json({                                                       // RETORNAMOS UN HTTP STATUS 409 (EXISTS)
                question: exist,
                message: 'Question Exists'});                                                       // MENSAJE USUARIO EXISTE
        }

        await question.save()
        
        Section.update(
            {"_id": req.body.sectionID}, 
            {"$push": { "questions": question } },
            function (err, callback) {
                
            }
        )

        QuestionSet.update(
            {"_id": req.body.questionSetID}, 
            {"$push": { "questions": question } },
            function (err, callback) {
                
            }
        )

        AlternativeSet.update(
            {"_id": req.body.alternativeSetID}, 
            {"$push": { "questions": question } },
            function (err, callback) {
                
            }
        )
                                                                          // GUARDAMOS EN LA BASE DE DATOS
        return res.status(200).json({question: question, message: 'Pregunta creada exitosamente'});             // RESPONDEMOS CON HTTP 200, OK
    } catch (error) {                                                                           // OBTENEMOS EL ERROR
        return res.status(500).json({error: error.message});                                                          // DEVOLVEMOS ESTADO 500 CON EL ERROR
    } 
}

questionController.getAlternatives = async(req, res) =>{
    try {
        const question = await Question.findById(req.params.id)
        const alternatives = await Alternative.find({}, {"alternativeSet": question.alternativeSet, _id: 0, alternative: 1})
        return res.status(200).json({alternatives: alternatives})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = questionController