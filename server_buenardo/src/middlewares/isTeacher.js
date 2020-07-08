const { User } = require("../models")

module.exports = function (req, res, next){
    try{
        const user = User.findById(req.user)
    
        if(!user)
            return res.status(400).json({error: 'User not found'})
        
        if(user.type == 'Profesor') next()
        else res.status(419).json({error: 'El usuario no es profesor'})

        
    }catch(err){
        res.status(500).json({error: 'Hubo un problema inesperado'})
    }
} 